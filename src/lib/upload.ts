import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import sharp from 'sharp';

export interface UploadResult {
  success: boolean;
  url?: string;
  filename?: string;
  error?: string;
}

export interface ImageProcessingOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  format?: 'jpeg' | 'png' | 'webp';
}

export class FileUploadService {
  private static readonly UPLOAD_DIR = 'public/uploads';
  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  private static readonly ALLOWED_TYPES = [
    'image/jpeg',
    'image/jpg', 
    'image/png',
    'image/webp',
    'image/gif'
  ];

  static async ensureUploadDir(): Promise<void> {
    const uploadPath = path.join(process.cwd(), this.UPLOAD_DIR);
    if (!existsSync(uploadPath)) {
      await mkdir(uploadPath, { recursive: true });
    }

    // Create subdirectories
    const subdirs = ['images', 'thumbnails', 'temp'];
    for (const subdir of subdirs) {
      const subdirPath = path.join(uploadPath, subdir);
      if (!existsSync(subdirPath)) {
        await mkdir(subdirPath, { recursive: true });
      }
    }
  }

  static async uploadFile(
    file: File,
    options: ImageProcessingOptions = {}
  ): Promise<UploadResult> {
    try {
      // Validate file
      const validation = this.validateFile(file);
      if (!validation.valid) {
        return { success: false, error: validation.error };
      }

      await this.ensureUploadDir();

      // Generate unique filename
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(2, 15);
      const extension = path.extname(file.name).toLowerCase();
      const filename = `${timestamp}-${randomString}${extension}`;

      // Convert File to Buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Process image if it's an image file
      if (this.isImageFile(file.type)) {
        return await this.processAndSaveImage(buffer, filename, options);
      } else {
        // Save non-image files directly
        const filePath = path.join(process.cwd(), this.UPLOAD_DIR, filename);
        await writeFile(filePath, buffer);
        
        return {
          success: true,
          url: `/uploads/${filename}`,
          filename
        };
      }
    } catch (error) {
      console.error('File upload error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Upload failed' 
      };
    }
  }

  private static async processAndSaveImage(
    buffer: Buffer,
    filename: string,
    options: ImageProcessingOptions
  ): Promise<UploadResult> {
    try {
      const {
        maxWidth = 1920,
        maxHeight = 1080,
        quality = 85,
        format = 'webp'
      } = options;

      // Process main image
      let processedImage = sharp(buffer);

      // Resize if needed
      const metadata = await processedImage.metadata();
      if (metadata.width && metadata.height) {
        if (metadata.width > maxWidth || metadata.height > maxHeight) {
          processedImage = processedImage.resize(maxWidth, maxHeight, {
            fit: 'inside',
            withoutEnlargement: true
          });
        }
      }

      // Convert format and optimize
      const finalFilename = filename.replace(/\.[^/.]+$/, `.${format}`);
      const imagePath = path.join(process.cwd(), this.UPLOAD_DIR, 'images', finalFilename);

      if (format === 'jpeg') {
        await processedImage.jpeg({ quality }).toFile(imagePath);
      } else if (format === 'png') {
        await processedImage.png({ quality }).toFile(imagePath);
      } else {
        await processedImage.webp({ quality }).toFile(imagePath);
      }

      // Create thumbnail
      const thumbnailFilename = `thumb_${finalFilename}`;
      const thumbnailPath = path.join(process.cwd(), this.UPLOAD_DIR, 'thumbnails', thumbnailFilename);
      
      await sharp(buffer)
        .resize(300, 200, { fit: 'cover' })
        .webp({ quality: 80 })
        .toFile(thumbnailPath);

      return {
        success: true,
        url: `/uploads/images/${finalFilename}`,
        filename: finalFilename
      };
    } catch (error) {
      console.error('Image processing error:', error);
      return { 
        success: false, 
        error: 'Image processing failed' 
      };
    }
  }

  private static validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size
    if (file.size > this.MAX_FILE_SIZE) {
      return { 
        valid: false, 
        error: `File size exceeds ${this.MAX_FILE_SIZE / 1024 / 1024}MB limit` 
      };
    }

    // Check file type
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return { 
        valid: false, 
        error: 'File type not allowed. Please upload images only.' 
      };
    }

    return { valid: true };
  }

  private static isImageFile(mimeType: string): boolean {
    return mimeType.startsWith('image/');
  }

  static async deleteFile(filename: string): Promise<boolean> {
    try {
      const fs = await import('fs/promises');
      
      // Delete main file
      const mainPath = path.join(process.cwd(), this.UPLOAD_DIR, 'images', filename);
      if (existsSync(mainPath)) {
        await fs.unlink(mainPath);
      }

      // Delete thumbnail
      const thumbnailPath = path.join(process.cwd(), this.UPLOAD_DIR, 'thumbnails', `thumb_${filename}`);
      if (existsSync(thumbnailPath)) {
        await fs.unlink(thumbnailPath);
      }

      return true;
    } catch (error) {
      console.error('File deletion error:', error);
      return false;
    }
  }

  static async listFiles(): Promise<string[]> {
    try {
      const fs = await import('fs/promises');
      const imagesPath = path.join(process.cwd(), this.UPLOAD_DIR, 'images');
      
      if (!existsSync(imagesPath)) {
        return [];
      }

      const files = await fs.readdir(imagesPath);
      return files.filter(file => !file.startsWith('.'));
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }
}
