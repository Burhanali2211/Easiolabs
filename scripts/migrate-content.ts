/**
 * Content Migration Script
 * 
 * This script helps migrate existing static content to the Supabase CMS.
 * Run this after setting up your Supabase database.
 * 
 * Usage: npx tsx scripts/migrate-content.ts
 */

import { ContentService } from '../src/lib/content';

interface MigrationData {
  categories: Array<{
    name: string;
    slug: string;
    description: string;
    color: string;
    icon: string;
  }>;
  tutorials: Array<{
    title: string;
    slug: string;
    description: string;
    content: string;
    category_slug: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    duration?: string;
    tags: string[];
    published: boolean;
  }>;
}

// Define your existing content structure
const migrationData: MigrationData = {
  categories: [
    {
      name: 'Electronics 101',
      slug: 'electronics-101',
      description: 'Complete beginner? Start here! Step-by-step lessons from absolute basics to building your first circuits.',
      color: 'bg-green-500',
      icon: 'BookOpen'
    },
    {
      name: 'Arduino',
      slug: 'arduino',
      description: 'If this is your first experience tinkering with electronics, Arduino is the best platform you can start playing with.',
      color: 'bg-blue-500',
      icon: 'Cpu'
    },
    {
      name: 'ESP32',
      slug: 'esp32',
      description: 'Building a sensor network? Want to create a BLE device? ESP32 is your one-stop-solution for many IoT apps.',
      color: 'bg-indigo-500',
      icon: 'Wifi'
    },
    {
      name: 'ESP8266',
      slug: 'esp8266',
      description: 'The ESP8266 is the easiest point of entry to basic IoT. It is great for beginners and advanced users alike.',
      color: 'bg-purple-500',
      icon: 'Zap'
    },
    {
      name: 'Basic Electronics',
      slug: 'basic-electronics',
      description: 'Fundamental electronic concepts, components, and circuit theory.',
      color: 'bg-orange-500',
      icon: 'CircuitBoard'
    }
  ],
  tutorials: [
    {
      title: 'HC-SR04 Ultrasonic Sensor with Arduino',
      slug: 'arduino-sr04-ultrasonic-sensor-tutorial',
      description: 'Learn how to use the HC-SR04 ultrasonic sensor with Arduino for distance measurement and obstacle detection.',
      content: `# HC-SR04 Ultrasonic Sensor with Arduino

Learn how to interface the HC-SR04 ultrasonic sensor with Arduino for accurate distance measurement and obstacle detection projects.

## What You'll Learn

- How ultrasonic sensors work
- Wiring the HC-SR04 to Arduino
- Programming distance measurement
- Building practical applications

## Components Needed

- Arduino Uno
- HC-SR04 Ultrasonic Sensor
- Jumper wires
- Breadboard

## Circuit Wiring

Connect the HC-SR04 sensor to your Arduino:

| HC-SR04 Pin | Arduino Pin |
|-------------|-------------|
| VCC | 5V |
| GND | GND |
| Trig | Pin 9 |
| Echo | Pin 10 |

## Arduino Code

\`\`\`cpp
const int trigPin = 9;
const int echoPin = 10;

void setup() {
  Serial.begin(9600);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  long duration, distance;
  
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  
  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;
  
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");
  
  delay(1000);
}
\`\`\`

## How It Works

The HC-SR04 sensor uses ultrasonic waves to measure distance. It sends out a sound wave and measures the time it takes to return after bouncing off an object.

## Applications

- Obstacle avoidance robots
- Parking sensors
- Liquid level measurement
- Security systems

## Troubleshooting

- Check wiring connections
- Ensure proper power supply
- Verify sensor orientation
- Test with known distances`,
      category_slug: 'arduino',
      difficulty: 'Beginner',
      duration: '30 minutes',
      tags: ['Arduino', 'HC-SR04', 'Ultrasonic', 'Sensor', 'Distance'],
      published: true
    },
    {
      title: 'DHT11 and DHT22 Sensors with Arduino',
      slug: 'dht11-dht22-arduino-tutorial',
      description: 'Complete guide to interfacing DHT11 and DHT22 temperature and humidity sensors with Arduino.',
      content: `# DHT11 and DHT22 Temperature and Humidity Sensors

Learn how to use DHT11 and DHT22 sensors with Arduino to measure temperature and humidity for weather monitoring projects.

## Sensor Comparison

| Feature | DHT11 | DHT22 |
|---------|-------|-------|
| Temperature Range | 0-50°C | -40-80°C |
| Humidity Range | 20-90% | 0-100% |
| Accuracy | ±2°C, ±5% | ±0.5°C, ±2% |
| Price | Lower | Higher |

## Required Components

- Arduino Uno
- DHT11 or DHT22 sensor
- 10kΩ resistor (pull-up)
- Jumper wires
- Breadboard

## Library Installation

Install the DHT sensor library:
1. Open Arduino IDE
2. Go to Sketch → Include Library → Manage Libraries
3. Search for "DHT sensor library" by Adafruit
4. Install the library

## Wiring Diagram

Connect your DHT sensor:

| DHT Pin | Arduino Pin |
|---------|-------------|
| VCC | 3.3V or 5V |
| Data | Pin 2 |
| GND | GND |

Add a 10kΩ pull-up resistor between VCC and Data pin.

## Arduino Code

\`\`\`cpp
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT22   // Change to DHT11 if using DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);
  
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("%  Temperature: ");
  Serial.print(temperature);
  Serial.println("°C");
}
\`\`\`

## Applications

- Weather stations
- Greenhouse monitoring
- HVAC control systems
- Indoor air quality monitoring

## Tips for Better Accuracy

- Allow sensor to stabilize before first reading
- Use appropriate delays between readings
- Consider sensor placement away from heat sources
- Calibrate if high precision is needed`,
      category_slug: 'arduino',
      difficulty: 'Beginner',
      duration: '25 minutes',
      tags: ['Arduino', 'DHT11', 'DHT22', 'Temperature', 'Humidity', 'Sensor'],
      published: true
    }
  ]
};

async function migrateContent() {
  console.log('🚀 Starting content migration...');

  try {
    // Step 1: Get existing categories or create new ones
    console.log('📁 Loading categories...');
    const categoryMap = new Map<string, string>();

    // First, get existing categories
    const existingCategories = await ContentService.getCategories();
    for (const category of existingCategories) {
      categoryMap.set(category.slug, category.id);
      console.log(`✅ Found existing category: ${category.name}`);
    }

    // Create any missing categories
    for (const categoryData of migrationData.categories) {
      if (!categoryMap.has(categoryData.slug)) {
        const category = await ContentService.createCategory({
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          color: categoryData.color,
          icon: categoryData.icon,
          order_index: migrationData.categories.indexOf(categoryData)
        });

        if (category) {
          categoryMap.set(categoryData.slug, category.id);
          console.log(`✅ Created new category: ${category.name}`);
        } else {
          console.log(`❌ Failed to create category: ${categoryData.name}`);
        }
      }
    }

    // Step 2: Create tutorials
    console.log('\n📝 Creating tutorials...');

    for (const tutorialData of migrationData.tutorials) {
      const categoryId = categoryMap.get(tutorialData.category_slug);

      if (!categoryId) {
        console.log(`❌ Category not found for tutorial: ${tutorialData.title}`);
        continue;
      }

      const tutorial = await ContentService.createTutorial({
        title: tutorialData.title,
        slug: tutorialData.slug,
        description: tutorialData.description,
        content: tutorialData.content,
        category_id: categoryId,
        difficulty: tutorialData.difficulty,
        duration: tutorialData.duration,
        tags: tutorialData.tags,
        published: tutorialData.published,
        author: 'EasyioLabs'
      });

      if (tutorial) {
        console.log(`✅ Created tutorial: ${tutorial.title}`);
      } else {
        console.log(`❌ Failed to create tutorial: ${tutorialData.title}`);
      }
    }

    console.log('\n🎉 Migration completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Visit /admin/login to access the admin panel');
    console.log('2. Review and edit the migrated content');
    console.log('3. Add more tutorials using the admin interface');
    console.log('4. Customize categories and settings as needed');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Ensure Supabase is properly configured');
    console.log('2. Check your environment variables');
    console.log('3. Verify database schema is set up');
    console.log('4. Check Supabase project status');
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateContent();
}

export { migrateContent, migrationData };
