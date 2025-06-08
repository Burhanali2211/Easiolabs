'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Bold, 
  Italic, 
  Underline, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Link, 
  Image as ImageIcon,
  Eye,
  EyeOff,
  Type,
  Palette
} from 'lucide-react';

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface EnhancedEditorProps {
  value: string;
  onChange: (value: string) => void;
  onImageInsert?: () => void;
  placeholder?: string;
  height?: string;
}

// Define a type for the Quill toolbar handler context
interface QuillHandlerContext {
  quill: any;
}

export default function EnhancedEditor({
  value,
  onChange,
  onImageInsert,
  placeholder = "Start writing your tutorial content...",
  height = "400px"
}: EnhancedEditorProps) {
  const [showPreview, setShowPreview] = useState(false);
  const quillRef = useRef<any>(null);
  const editorRef = useRef<HTMLDivElement>(null);

  // Custom toolbar configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: onImageInsert || function(this: QuillHandlerContext) {
          const range = this.quill.getSelection();
          const value = prompt('Please enter the image URL');
          if (value) {
            this.quill.insertEmbed(range.index, 'image', value, 'user');
          }
        }
      }
    },
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'script',
    'code-block', 'direction'
  ];

  // Use effect to get the editor instance after the component mounts
  useEffect(() => {
    if (editorRef.current) {
      // Find the ReactQuill instance in the DOM
      const editor = editorRef.current.querySelector('.quill');
      if (editor) {
        // Store the Quill instance
        const quillInstance = (editor as any).__quill;
        if (quillInstance) {
          quillRef.current = quillInstance;
        }
      }
    }
  }, [showPreview]);

  const insertCodeBlock = useCallback(() => {
    const quill = quillRef.current;
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        quill.insertText(range.index, '\n');
        quill.formatText(range.index + 1, 1, 'code-block', true);
        quill.setSelection(range.index + 1);
      }
    }
  }, []);

  const insertTable = useCallback(() => {
    const quill = quillRef.current;
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        // Insert a basic 3x3 table HTML
        const tableHTML = `
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px;">Header 1</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Header 2</th>
                <th style="border: 1px solid #ddd; padding: 8px;">Header 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 3</td>
              </tr>
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 4</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 5</td>
                <td style="border: 1px solid #ddd; padding: 8px;">Cell 6</td>
              </tr>
            </tbody>
          </table>
        `;
        quill.clipboard.dangerouslyPasteHTML(range.index, tableHTML);
      }
    }
  }, []);

  const insertImage = useCallback(() => {
    const quill = quillRef.current;
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        const url = prompt('Enter image URL:');
        if (url) {
          quill.insertEmbed(range.index, 'image', url);
        }
      }
    }
  }, []);

  const insertLink = useCallback(() => {
    const quill = quillRef.current;
    if (quill) {
      const range = quill.getSelection();
      if (range) {
        const url = prompt('Enter link URL:');
        if (url) {
          const text = prompt('Enter link text:', url);
          quill.deleteText(range.index, range.length);
          quill.insertText(range.index, text || url, 'link', url);
        }
      }
    }
  }, []);

  const togglePreview = useCallback(() => {
    setShowPreview(!showPreview);
  }, [showPreview]);

  // Render HTML preview
  const renderPreview = () => {
    return (
      <div 
        className="prose max-w-none p-4 bg-white rounded-md border border-gray-300 overflow-auto"
        style={{ height, minHeight: height }}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
        <div className="flex space-x-2">
          <button 
            type="button"
            onClick={insertCodeBlock}
            className="p-1 hover:bg-gray-200 rounded"
            title="Insert Code Block"
          >
            <Code size={18} />
          </button>
          <button 
            type="button"
            onClick={insertTable}
            className="p-1 hover:bg-gray-200 rounded"
            title="Insert Table"
          >
            <Type size={18} />
          </button>
          <button 
            type="button"
            onClick={insertImage}
            className="p-1 hover:bg-gray-200 rounded"
            title="Insert Image"
          >
            <ImageIcon size={18} />
          </button>
          <button 
            type="button"
            onClick={insertLink}
            className="p-1 hover:bg-gray-200 rounded"
            title="Insert Link"
          >
            <Link size={18} />
          </button>
        </div>
        <button 
          type="button"
          onClick={togglePreview}
          className="flex items-center space-x-1 p-1 hover:bg-gray-200 rounded"
          title={showPreview ? "Edit Mode" : "Preview Mode"}
        >
          {showPreview ? (
            <>
              <EyeOff size={18} />
              <span className="text-sm">Edit</span>
            </>
          ) : (
            <>
              <Eye size={18} />
              <span className="text-sm">Preview</span>
            </>
          )}
        </button>
      </div>

      <div 
        className="editor-container" 
        style={{ height, minHeight: height }}
      >
        {showPreview ? (
          renderPreview()
        ) : (
          <div className="h-full" ref={editorRef}>
            <ReactQuill
              value={value}
              onChange={onChange}
              modules={modules}
              formats={formats}
              placeholder={placeholder}
              className="h-full"
              theme="snow"
            />
          </div>
        )}
      </div>
    </div>
  );
}
