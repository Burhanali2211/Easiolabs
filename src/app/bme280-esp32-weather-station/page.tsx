import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ESP32WeatherStationPage = () => {
  const weatherStationCode = `// ESP32 Weather Station with BME280
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

void handleRoot() {
  String html = "<!DOCTYPE html>";
  html += "<html><head>";
  html += "<title>ESP32 Weather Station</title>";
  html += "<meta charset='UTF-8'>";
  html += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
  html += "<style>";
  html += "body { font-family: Arial, sans-serif; margin: 20px; background: #f0f0f0; }";
  html += ".container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }";
  html += ".sensor-card { background: #e3f2fd; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #2196f3; }";
  html += ".value { font-size: 24px; font-weight: bold; color: #1976d2; }";
  html += ".unit { font-size: 16px; color: #666; }";
  html += "</style>";
  html += "<script>";
  html += "function updateData() {";
  html += "  fetch('/data').then(response => response.json()).then(data => {";
  html += "    document.getElementById('temp').innerHTML = data.temperature + '<span class=\\"unit\\"> °C</span>';";
  html += "    document.getElementById('hum').innerHTML = data.humidity + '<span class=\\"unit\\"> %</span>';";
  html += "    document.getElementById('press').innerHTML = data.pressure + '<span class=\\"unit\\"> hPa</span>';";
  html += "  });";
  html += "}";
  html += "setInterval(updateData, 5000);";
  html += "window.onload = updateData;";
  html += "</script>";
  html += "</head><body>";
  html += "<div class='container'>";
  html += "<h1>🌤️ ESP32 Weather Station</h1>";
  html += "<div class='sensor-card'>";
  html += "<h3>🌡️ Temperature</h3>";
  html += "<div class='value' id='temp'>--</div>";
  html += "</div>";
  html += "<div class='sensor-card'>";
  html += "<h3>💧 Humidity</h3>";
  html += "<div class='value' id='hum'>--</div>";
  html += "</div>";
  html += "<div class='sensor-card'>";
  html += "<h3>🌪️ Pressure</h3>";
  html += "<div class='value' id='press'>--</div>";
  html += "</div>";
  html += "<p><small>Data updates every 5 seconds</small></p>";
  html += "</div>";
  html += "</body></html>";
  
  server.send(200, "text/html", html);
}

void handleData() {
  String json = "{";
  json += "\\"temperature\\":" + String(temperature, 2) + ",";
  json += "\\"humidity\\":" + String(humidity, 2) + ",";
  json += "\\"pressure\\":" + String(pressure, 2);
  json += "}";
  
  server.send(200, "application/json", json);
}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>ESP32</span> → <span>IoT Projects</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Create A Simple ESP32 Weather Station With BME280
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">ESP32 Weather Station Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#components" className="hover:underline">Required Components</a></li>
            <li><a href="#bme280-overview" className="hover:underline">BME280 Sensor Overview</a></li>
            <li><a href="#wiring" className="hover:underline">Circuit Wiring</a></li>
            <li><a href="#library-setup" className="hover:underline">Library Installation</a></li>
            <li><a href="#code-implementation" className="hover:underline">Code Implementation</a></li>
            <li><a href="#web-interface" className="hover:underline">Web Interface</a></li>
            <li><a href="#enhancements" className="hover:underline">Possible Enhancements</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Don't rely solely on smartphone weather apps or commercial weather stations that cost hundreds 
              of dollars. With an ESP32 microcontroller and a BME280 sensor, you can build your own 
              professional-grade weather station that monitors temperature, humidity, and atmospheric pressure.
            </p>
            
            <p>
              This project combines the power of the ESP32's WiFi capabilities with the precision of the 
              BME280 sensor to create a web-accessible weather monitoring system. You'll be able to check 
              your local weather conditions from any device connected to your network.
            </p>
            
            <p>
              The best part? This entire project can be completed in under an hour and costs less than $20 
              in components. Let's build a weather station that rivals commercial solutions!
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <h4 className="font-bold text-green-900 mb-2">Project Features</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Real-time temperature, humidity, and pressure monitoring</li>
                <li>• Web-based interface accessible from any device</li>
                <li>• Automatic data updates every 5 seconds</li>
                <li>• Responsive design for mobile and desktop</li>
                <li>• Low power consumption for battery operation</li>
              </ul>
            </div>
          </section>

          <section id="components" className="mb-12">
            <h2>Required Components</h2>
            
            <p>Here's everything you'll need for this project:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Main Components</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• ESP32 development board</li>
                  <li>• BME280 sensor module</li>
                  <li>• Breadboard</li>
                  <li>• Jumper wires (4 pieces)</li>
                  <li>• USB cable for programming</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Optional Components</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Enclosure/case for outdoor use</li>
                  <li>• Battery pack for portable operation</li>
                  <li>• OLED display for local readings</li>
                  <li>• External antenna for better WiFi range</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="bme280-overview" className="mb-12">
            <h2>BME280 Sensor Overview</h2>
            
            <p>
              The BME280 is a high-precision environmental sensor that measures three key parameters:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Parameter</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Range</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Accuracy</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Temperature</td>
                  <td className="border border-gray-300 px-4 py-2">-40°C to +85°C</td>
                  <td className="border border-gray-300 px-4 py-2">±1.0°C</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Humidity</td>
                  <td className="border border-gray-300 px-4 py-2">0% to 100% RH</td>
                  <td className="border border-gray-300 px-4 py-2">±3% RH</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Pressure</td>
                  <td className="border border-gray-300 px-4 py-2">300 to 1100 hPa</td>
                  <td className="border border-gray-300 px-4 py-2">±1 hPa</td>
                </tr>
              </tbody>
            </table>

            <h3>Key Features</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>I2C and SPI interface support</li>
              <li>Low power consumption (3.4µA @ 1Hz)</li>
              <li>Small package size (2.5mm x 2.5mm)</li>
              <li>Built-in filtering and oversampling</li>
              <li>Operating voltage: 1.71V to 3.6V</li>
            </ul>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Circuit Wiring</h2>
            
            <p>
              The BME280 uses I2C communication, requiring only 4 connections to the ESP32:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">BME280 Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">ESP32 Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">3.3V</td>
                  <td className="border border-gray-300 px-4 py-2">Power supply</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">Ground</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SCL</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO22</td>
                  <td className="border border-gray-300 px-4 py-2">I2C Clock</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SDA</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO21</td>
                  <td className="border border-gray-300 px-4 py-2">I2C Data</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">I2C Address</h4>
              <p className="text-blue-800">
                The BME280 typically uses I2C address 0x76 or 0x77. Most modules use 0x76 by default. 
                If your sensor isn't detected, try changing the address in the code.
              </p>
            </div>
          </section>

          <section id="library-setup" className="mb-12">
            <h2>Library Installation</h2>
            
            <p>Install the required libraries through the Arduino IDE Library Manager:</p>

            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Open Arduino IDE</li>
              <li>Go to Sketch → Include Library → Manage Libraries</li>
              <li>Search for and install "Adafruit BME280 Library"</li>
              <li>Install "Adafruit Unified Sensor" (dependency)</li>
              <li>The WiFi and WebServer libraries are built into ESP32 core</li>
            </ol>
          </section>

          <section id="code-implementation" className="mb-12">
            <h2>Code Implementation</h2>
            
            <p>
              Here's the complete code for the ESP32 weather station with web interface:
            </p>
            
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {weatherStationCode}
            </SyntaxHighlighter>

            <h3>Code Explanation</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Initialize BME280 sensor and WiFi connection</li>
              <li>Create web server with two routes: "/" for main page and "/data" for JSON data</li>
              <li>Read sensor data every 10 seconds and store in global variables</li>
              <li>Serve responsive HTML page with real-time updates</li>
              <li>Provide JSON API endpoint for sensor data</li>
            </ol>
          </section>

          <section id="web-interface" className="mb-12">
            <h2>Web Interface</h2>
            
            <p>
              The weather station creates a beautiful, responsive web interface that includes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Features</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Real-time data updates every 5 seconds</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Clean, modern interface</li>
                  <li>• Color-coded sensor cards</li>
                  <li>• Automatic data refresh</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Access Methods</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Direct IP address in browser</li>
                  <li>• JSON API at /data endpoint</li>
                  <li>• Mobile-friendly interface</li>
                  <li>• Works on local network</li>
                  <li>• No internet connection required</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="enhancements" className="mb-12">
            <h2>Possible Enhancements</h2>
            
            <p>Take your weather station to the next level with these improvements:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Data Logging</h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Store data to SD card</li>
                  <li>• Upload to cloud services</li>
                  <li>• Create historical charts</li>
                  <li>• Export data as CSV</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Additional Sensors</h4>
                <ul className="text-orange-800 text-sm space-y-1">
                  <li>• Light sensor (BH1750)</li>
                  <li>• UV index sensor</li>
                  <li>• Rain detection</li>
                  <li>• Wind speed/direction</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">Connectivity</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• MQTT integration</li>
                  <li>• Home Assistant support</li>
                  <li>• Mobile app notifications</li>
                  <li>• Weather alerts</li>
                </ul>
              </div>
              <div className="bg-teal-50 p-6 rounded-lg">
                <h4 className="font-bold text-teal-900 mb-2">Display Options</h4>
                <ul className="text-teal-800 text-sm space-y-1">
                  <li>• OLED/LCD local display</li>
                  <li>• E-ink display for battery life</li>
                  <li>• LED status indicators</li>
                  <li>• Voice announcements</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ESP32WeatherStationPage;
