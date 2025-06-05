import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DHTSensorTutorialPage = () => {
  const arduinoCode = `// DHT11/DHT22 Temperature and Humidity Sensor
#include "DHT.h"

#define DHT_PIN 2
#define DHT_TYPE DHT22  // Change to DHT11 if using DHT11

DHT dht(DHT_PIN, DHT_TYPE);

void setup() {
  Serial.begin(9600);
  Serial.println("DHT Temperature & Humidity Sensor Test");
  dht.begin();
}

void loop() {
  // Wait a few seconds between measurements
  delay(2000);

  // Read humidity and temperature
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float temperatureF = dht.readTemperature(true); // Fahrenheit

  // Check if any reads failed
  if (isnan(humidity) || isnan(temperature) || isnan(temperatureF)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Calculate heat index
  float heatIndex = dht.computeHeatIndex(temperatureF, humidity);

  // Print results
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.print("%  Temperature: ");
  Serial.print(temperature);
  Serial.print("°C ");
  Serial.print(temperatureF);
  Serial.print("°F  Heat index: ");
  Serial.print(heatIndex);
  Serial.println("°F");
}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Arduino</span> → <span>Sensors</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Interfacing DHT11 and DHT22 Sensors with Arduino
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">DHT Sensor Tutorial Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#dht11-vs-dht22" className="hover:underline">DHT11 vs DHT22 Comparison</a></li>
            <li><a href="#hardware-overview" className="hover:underline">Hardware Overview</a></li>
            <li><a href="#pinout" className="hover:underline">DHT Sensor Pinout</a></li>
            <li><a href="#wiring" className="hover:underline">Wiring to Arduino</a></li>
            <li><a href="#library-installation" className="hover:underline">Library Installation</a></li>
            <li><a href="#arduino-code" className="hover:underline">Arduino Code Example</a></li>
            <li><a href="#applications" className="hover:underline">Project Applications</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Looking to keep track of the climate in your greenhouse, create a humidor control system, 
              or build a weather station? The DHT11 and DHT22 sensors are perfect for measuring both 
              temperature and humidity in your Arduino projects.
            </p>
            
            <p>
              These popular sensors are affordable, easy to use, and provide digital output that can be 
              read directly by your Arduino. Whether you're a beginner or an experienced maker, these 
              sensors are an excellent choice for environmental monitoring projects.
            </p>
            
            <p>
              In this comprehensive tutorial, we'll explore both DHT11 and DHT22 sensors, learn how to 
              connect them to Arduino, and create practical applications for monitoring temperature and humidity.
            </p>
          </section>

          <section id="dht11-vs-dht22" className="mb-12">
            <h2>DHT11 vs DHT22 Comparison</h2>
            
            <p>
              Both sensors measure temperature and humidity, but they have different specifications and accuracy levels:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Feature</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">DHT11</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">DHT22</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Temperature Range</td>
                  <td className="border border-gray-300 px-4 py-2">0-50°C</td>
                  <td className="border border-gray-300 px-4 py-2">-40-80°C</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Temperature Accuracy</td>
                  <td className="border border-gray-300 px-4 py-2">±2°C</td>
                  <td className="border border-gray-300 px-4 py-2">±0.5°C</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Humidity Range</td>
                  <td className="border border-gray-300 px-4 py-2">20-80%</td>
                  <td className="border border-gray-300 px-4 py-2">0-100%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Humidity Accuracy</td>
                  <td className="border border-gray-300 px-4 py-2">±5%</td>
                  <td className="border border-gray-300 px-4 py-2">±2-5%</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Sampling Rate</td>
                  <td className="border border-gray-300 px-4 py-2">1 Hz (1 reading/sec)</td>
                  <td className="border border-gray-300 px-4 py-2">0.5 Hz (1 reading/2 sec)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium">Price</td>
                  <td className="border border-gray-300 px-4 py-2">Lower</td>
                  <td className="border border-gray-300 px-4 py-2">Higher</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <h4 className="font-bold text-green-900 mb-2">Which Sensor to Choose?</h4>
              <p className="text-green-800">
                <strong>DHT11:</strong> Perfect for basic projects where high accuracy isn't critical.<br/>
                <strong>DHT22:</strong> Better for precision applications like weather stations or scientific projects.
              </p>
            </div>
          </section>

          <section id="hardware-overview" className="mb-12">
            <h2>Hardware Overview</h2>
            
            <p>
              Both DHT11 and DHT22 sensors use a single-wire digital protocol to communicate with microcontrollers. 
              They contain a capacitive humidity sensor and a thermistor for temperature measurement, along with 
              a basic chip that performs analog-to-digital conversion.
            </p>

            <h3>Common Specifications</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>Operating voltage: 3.3V to 5V</li>
              <li>Operating current: 0.3mA (measuring) to 60µA (standby)</li>
              <li>Digital output via single-bus</li>
              <li>4-pin package (only 3 pins used)</li>
              <li>Long-term stability</li>
            </ul>
          </section>

          <section id="pinout" className="mb-12">
            <h2>DHT Sensor Pinout</h2>
            
            <p>Both DHT11 and DHT22 have the same pinout configuration:</p>
            
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Pin 1 - VCC</h4>
                  <p className="text-sm">Power supply (3.3V to 5V)</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Pin 2 - Data</h4>
                  <p className="text-sm">Digital data input/output</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Pin 3 - NC</h4>
                  <p className="text-sm">Not connected</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Pin 4 - GND</h4>
                  <p className="text-sm">Ground connection</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">Pull-up Resistor</h4>
              <p className="text-blue-800">
                A 10kΩ pull-up resistor is required between the data pin and VCC for proper operation. 
                Many breakout boards include this resistor.
              </p>
            </div>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Wiring to Arduino</h2>
            
            <p>
              Connecting the DHT sensor to Arduino is simple. Here's the wiring for both sensors:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">DHT Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC (Pin 1)</td>
                  <td className="border border-gray-300 px-4 py-2">5V or 3.3V</td>
                  <td className="border border-gray-300 px-4 py-2">Power supply</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Data (Pin 2)</td>
                  <td className="border border-gray-300 px-4 py-2">Digital Pin 2</td>
                  <td className="border border-gray-300 px-4 py-2">With 10kΩ pull-up to VCC</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">NC (Pin 3)</td>
                  <td className="border border-gray-300 px-4 py-2">Not connected</td>
                  <td className="border border-gray-300 px-4 py-2">Leave unconnected</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND (Pin 4)</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">Ground connection</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="library-installation" className="mb-12">
            <h2>Library Installation</h2>
            
            <p>
              To use DHT sensors with Arduino, you'll need to install the DHT sensor library:
            </p>

            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Open Arduino IDE</li>
              <li>Go to Sketch → Include Library → Manage Libraries</li>
              <li>Search for "DHT sensor library" by Adafruit</li>
              <li>Install the library and its dependencies</li>
              <li>Also install "Adafruit Unified Sensor" library</li>
            </ol>
          </section>

          <section id="arduino-code" className="mb-12">
            <h2>Arduino Code Example</h2>
            
            <p>
              Here's a complete Arduino sketch that reads temperature and humidity from a DHT sensor:
            </p>
            
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {arduinoCode}
            </SyntaxHighlighter>

            <h3>Code Explanation</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Include the DHT library and define sensor pin and type</li>
              <li>Initialize the DHT sensor in setup()</li>
              <li>Read humidity and temperature values</li>
              <li>Check for reading errors (NaN values)</li>
              <li>Calculate heat index for comfort assessment</li>
              <li>Display all readings on Serial Monitor</li>
            </ol>
          </section>

          <section id="applications" className="mb-12">
            <h2>Project Applications</h2>
            
            <p>DHT sensors are perfect for various environmental monitoring projects:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Weather Station</h4>
                <p className="text-blue-800 text-sm">
                  Build a complete weather monitoring system with data logging capabilities.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Greenhouse Control</h4>
                <p className="text-green-800 text-sm">
                  Monitor and control greenhouse climate for optimal plant growth.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Home Automation</h4>
                <p className="text-purple-800 text-sm">
                  Create smart home systems that respond to environmental conditions.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">HVAC Control</h4>
                <p className="text-orange-800 text-sm">
                  Build intelligent heating and cooling systems based on real-time data.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default DHTSensorTutorialPage;
