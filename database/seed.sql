-- Insert categories
INSERT INTO categories (name, slug, description, color, icon, order_index) VALUES
('Electronics 101', 'electronics-101', 'Complete beginner? Start here! Step-by-step lessons from absolute basics to building your first circuits.', 'bg-green-500', 'BookOpen', 1),
('Arduino', 'arduino', 'If this is your first experience tinkering with electronics, Arduino is the best platform you can start playing with.', 'bg-blue-500', 'Cpu', 2),
('ESP32', 'esp32', 'Building a sensor network? Want to create a BLE device? ESP32 is your one-stop-solution for many IoT apps.', 'bg-indigo-500', 'Wifi', 3),
('ESP8266', 'esp8266', 'The ESP8266 is the easiest point of entry to basic IoT. It is great for beginners and advanced users alike.', 'bg-purple-500', 'Zap', 4),
('Basic Electronics', 'basic-electronics', 'Fundamental electronic concepts, components, and circuit theory.', 'bg-orange-500', 'CircuitBoard', 5),
('Tools & Calculators', 'tools-calculators', 'Interactive tools and calculators for electronics design and learning.', 'bg-yellow-500', 'Calculator', 6);

-- Insert some sample tutorials (we'll add more later)
INSERT INTO tutorials (title, slug, description, content, category_id, difficulty, duration, published, tags) VALUES
(
  'Create A Simple ESP32 Weather Station With BME280',
  'bme280-esp32-weather-station',
  'Don''t rely solely on smartphone weather apps or commercial weather stations that cost hundreds of dollars. With an ESP32 microcontroller and a BME280 sensor, you can build your own professional-grade weather station.',
  '# Create A Simple ESP32 Weather Station With BME280

Don''t rely solely on smartphone weather apps or commercial weather stations that cost hundreds of dollars. With an ESP32 microcontroller and a BME280 sensor, you can build your own professional-grade weather station that monitors temperature, humidity, and atmospheric pressure.

## Project Overview

This project combines the power of the ESP32''s WiFi capabilities with the precision of the BME280 sensor to create a web-accessible weather monitoring system. You''ll be able to check your local weather conditions from any device connected to your network.

The best part? This entire project can be completed in under an hour and costs less than $20 in components. Let''s build a weather station that rivals commercial solutions!

## Required Components

Here''s everything you''ll need for this project:

### Main Components
- ESP32 development board
- BME280 sensor module
- Breadboard
- Jumper wires (4 pieces)
- USB cable for programming

### Optional Components
- Enclosure/case for outdoor use
- Battery pack for portable operation
- OLED display for local readings
- External antenna for better WiFi range

## BME280 Sensor Overview

The BME280 is a high-precision environmental sensor that measures three key parameters:

| Parameter | Range | Accuracy |
|-----------|-------|----------|
| Temperature | -40°C to +85°C | ±1.0°C |
| Humidity | 0% to 100% RH | ±3% RH |
| Pressure | 300 to 1100 hPa | ±1 hPa |

## Circuit Wiring

The BME280 uses I2C communication, requiring only 4 connections to the ESP32:

| BME280 Pin | ESP32 Pin | Description |
|------------|-----------|-------------|
| VCC | 3.3V | Power supply |
| GND | GND | Ground |
| SCL | GPIO22 | I2C Clock |
| SDA | GPIO21 | I2C Data |

## Code Implementation

```cpp
#include <WiFi.h>
#include <WebServer.h>
#include <Wire.h>
#include <Adafruit_BME280.h>
#include <Adafruit_Sensor.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// BME280 sensor
Adafruit_BME280 bme;

// Web server on port 80
WebServer server(80);

// Variables to store sensor readings
float temperature;
float humidity;
float pressure;

void setup() {
  Serial.begin(115200);
  
  // Initialize BME280 sensor
  if (!bme.begin(0x76)) {
    Serial.println("Could not find BME280 sensor!");
    while (1);
  }
  
  // Connect to WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  
  Serial.println();
  Serial.print("Connected! IP address: ");
  Serial.println(WiFi.localIP());
  
  // Define web server routes
  server.on("/", handleRoot);
  server.on("/data", handleData);
  
  // Start server
  server.begin();
  Serial.println("Web server started");
}

void loop() {
  server.handleClient();
  
  // Read sensor data every 10 seconds
  static unsigned long lastReading = 0;
  if (millis() - lastReading > 10000) {
    readSensorData();
    lastReading = millis();
  }
}

void readSensorData() {
  temperature = bme.readTemperature();
  humidity = bme.readHumidity();
  pressure = bme.readPressure() / 100.0F; // Convert to hPa
  
  Serial.printf("Temperature: %.2f°C\\n", temperature);
  Serial.printf("Humidity: %.2f%%\\n", humidity);
  Serial.printf("Pressure: %.2f hPa\\n", pressure);
}
```

## Conclusion

You now have a fully functional ESP32 weather station that provides real-time environmental data through a web interface. This project demonstrates the power of combining sensors with WiFi-enabled microcontrollers for IoT applications.',
  (SELECT id FROM categories WHERE slug = 'esp32'),
  'Beginner',
  '45 minutes',
  true,
  ARRAY['ESP32', 'BME280', 'Weather Station', 'IoT', 'Sensors', 'WiFi']
);

-- Insert sample pages
INSERT INTO pages (title, slug, content, meta_description, published) VALUES
(
  'About Us',
  'about-us',
  '# About EasyioLabs

## Our Mission

At EasyioLabs, we believe that learning electronics should be accessible, engaging, and fun for everyone. Whether you''re a complete beginner taking your first steps into the world of electronics or an experienced maker looking to expand your skills, we''re here to guide you on your journey.

## What We Do

We create comprehensive, easy-to-follow tutorials and guides that break down complex electronic concepts into digestible, practical lessons. Our content covers:

- **Arduino Programming**: From basic sketches to advanced projects
- **ESP32 & ESP8266**: IoT development and wireless communication
- **Basic Electronics**: Fundamental concepts and circuit theory
- **Interactive Tools**: Calculators, simulators, and learning aids

## Our Approach

We believe in learning by doing. That''s why every tutorial includes:

- Step-by-step instructions with clear explanations
- Real-world examples and practical applications
- Code samples and circuit diagrams
- Troubleshooting tips and common mistakes to avoid

## Join Our Community

Electronics is more fun when shared with others. Join thousands of learners who are discovering the exciting world of electronics through our tutorials and guides.

Ready to start your electronics journey? [Begin with Electronics 101](/electronics-101) or explore our [Arduino tutorials](/electronics/arduino-projects).',
  'Learn about EasyioLabs mission to make electronics education accessible to everyone through comprehensive tutorials and guides.',
  true
);

-- Insert site settings
INSERT INTO site_settings (key, value, description) VALUES
('site_title', 'EasyioLabs - Learn Electronics the Easy Way', 'Main site title'),
('site_description', 'Quick, easy and to the point electronics tutorials for Arduino, ESP32, ESP8266, and basic electronics. Learn with step-by-step guides and practical projects.', 'Site meta description'),
('contact_email', 'contact@easyiolabs.com', 'Contact email address'),
('newsletter_enabled', 'true', 'Enable/disable newsletter signup'),
('analytics_enabled', 'false', 'Enable/disable analytics tracking');
