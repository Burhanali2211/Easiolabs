import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const NRF24L01TutorialPage = () => {
  const transmitterCode = `// nRF24L01 Transmitter Code
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN pins

const byte address[6] = "00001";

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openWritingPipe(address);
  radio.setPALevel(RF24_PA_MIN);
  radio.stopListening();
  Serial.println("nRF24L01 Transmitter Started");
}

void loop() {
  const char text[] = "Hello from Arduino!";
  radio.write(&text, sizeof(text));
  Serial.println("Message sent: " + String(text));
  delay(1000);
}`;

  const receiverCode = `// nRF24L01 Receiver Code
#include <SPI.h>
#include <nRF24L01.h>
#include <RF24.h>

RF24 radio(7, 8); // CE, CSN pins

const byte address[6] = "00001";

void setup() {
  Serial.begin(9600);
  radio.begin();
  radio.openReadingPipe(0, address);
  radio.setPALevel(RF24_PA_MIN);
  radio.startListening();
  Serial.println("nRF24L01 Receiver Started");
}

void loop() {
  if (radio.available()) {
    char text[32] = "";
    radio.read(&text, sizeof(text));
    Serial.println("Received: " + String(text));
  }
}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Arduino</span> → <span>Wireless & IoT</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How nRF24L01+ Wireless Module Works & Interface with Arduino
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">nRF24L01 Tutorial Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#features" className="hover:underline">nRF24L01+ Features</a></li>
            <li><a href="#pinout" className="hover:underline">Module Pinout</a></li>
            <li><a href="#wiring" className="hover:underline">Wiring to Arduino</a></li>
            <li><a href="#library-installation" className="hover:underline">Library Installation</a></li>
            <li><a href="#basic-communication" className="hover:underline">Basic Communication</a></li>
            <li><a href="#advanced-features" className="hover:underline">Advanced Features</a></li>
            <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Imagine having two or more Arduinos talking to each other wirelessly! This opens up a 
              world of possibilities - from remote sensor networks to wireless robot control systems. 
              The nRF24L01+ wireless transceiver module makes this dream a reality with reliable, 
              low-power wireless communication.
            </p>
            
            <p>
              The nRF24L01+ is a popular 2.4GHz wireless communication module that's perfect for 
              Arduino projects. It offers excellent range, low power consumption, and can create 
              networks of up to 6 devices. Whether you're building a weather station network, 
              remote control system, or IoT project, this module is an excellent choice.
            </p>
            
            <p>
              In this comprehensive tutorial, we'll explore how to use the nRF24L01+ module with 
              Arduino, covering everything from basic point-to-point communication to advanced 
              multi-node networks.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <h4 className="font-bold text-green-900 mb-2">Why Choose nRF24L01+?</h4>
              <p className="text-green-800">
                Excellent range (up to 1km with external antenna), low power consumption, 
                multi-device networks, and affordable price make it perfect for Arduino projects.
              </p>
            </div>
          </section>

          <section id="features" className="mb-12">
            <h2>nRF24L01+ Features</h2>
            
            <p>The nRF24L01+ offers impressive specifications for its price point:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div>
                <h3>Technical Specifications</h3>
                <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                  <li>Frequency: 2.4GHz ISM band</li>
                  <li>Data rate: 250kbps, 1Mbps, 2Mbps</li>
                  <li>Range: 100m (open space)</li>
                  <li>Operating voltage: 1.9V - 3.6V</li>
                  <li>Current consumption: 13.5mA (TX), 13.5mA (RX)</li>
                  <li>Channels: 125 channels</li>
                </ul>
              </div>
              <div>
                <h3>Key Features</h3>
                <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
                  <li>SPI interface for easy connection</li>
                  <li>Auto-acknowledgment and retransmission</li>
                  <li>6 data pipes for multi-device networks</li>
                  <li>Built-in CRC error detection</li>
                  <li>Low power modes for battery operation</li>
                  <li>Small form factor (15mm x 29mm)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="pinout" className="mb-12">
            <h2>Module Pinout</h2>
            
            <p>The nRF24L01+ module has an 8-pin interface:</p>
            
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Name</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">Ground connection</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2</td>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">Power supply (3.3V)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">3</td>
                  <td className="border border-gray-300 px-4 py-2">CE</td>
                  <td className="border border-gray-300 px-4 py-2">Chip Enable (RX/TX mode)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">4</td>
                  <td className="border border-gray-300 px-4 py-2">CSN</td>
                  <td className="border border-gray-300 px-4 py-2">SPI Chip Select</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">5</td>
                  <td className="border border-gray-300 px-4 py-2">SCK</td>
                  <td className="border border-gray-300 px-4 py-2">SPI Clock</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">6</td>
                  <td className="border border-gray-300 px-4 py-2">MOSI</td>
                  <td className="border border-gray-300 px-4 py-2">SPI Master Out Slave In</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">7</td>
                  <td className="border border-gray-300 px-4 py-2">MISO</td>
                  <td className="border border-gray-300 px-4 py-2">SPI Master In Slave Out</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">8</td>
                  <td className="border border-gray-300 px-4 py-2">IRQ</td>
                  <td className="border border-gray-300 px-4 py-2">Interrupt (optional)</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-6">
              <h4 className="font-bold text-red-900 mb-2">⚠️ Voltage Warning</h4>
              <p className="text-red-800">
                The nRF24L01+ operates at 3.3V! Connecting it directly to Arduino's 5V pins will 
                damage the module. Use a voltage regulator or logic level converter.
              </p>
            </div>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Wiring to Arduino</h2>
            
            <p>Here's how to connect the nRF24L01+ to Arduino Uno:</p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">nRF24L01+ Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Uno Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">Ground connection</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">3.3V</td>
                  <td className="border border-gray-300 px-4 py-2">NOT 5V!</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">CE</td>
                  <td className="border border-gray-300 px-4 py-2">7</td>
                  <td className="border border-gray-300 px-4 py-2">Configurable</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">CSN</td>
                  <td className="border border-gray-300 px-4 py-2">8</td>
                  <td className="border border-gray-300 px-4 py-2">Configurable</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SCK</td>
                  <td className="border border-gray-300 px-4 py-2">13</td>
                  <td className="border border-gray-300 px-4 py-2">SPI Clock</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">MOSI</td>
                  <td className="border border-gray-300 px-4 py-2">11</td>
                  <td className="border border-gray-300 px-4 py-2">SPI MOSI</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">MISO</td>
                  <td className="border border-gray-300 px-4 py-2">12</td>
                  <td className="border border-gray-300 px-4 py-2">SPI MISO</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">IRQ</td>
                  <td className="border border-gray-300 px-4 py-2">Not connected</td>
                  <td className="border border-gray-300 px-4 py-2">Optional interrupt</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="library-installation" className="mb-12">
            <h2>Library Installation</h2>
            
            <p>To use the nRF24L01+ with Arduino, install the RF24 library:</p>

            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Open Arduino IDE</li>
              <li>Go to Sketch → Include Library → Manage Libraries</li>
              <li>Search for "RF24" by TMRh20</li>
              <li>Install the RF24 library</li>
              <li>Restart Arduino IDE</li>
            </ol>
          </section>

          <section id="basic-communication" className="mb-12">
            <h2>Basic Communication</h2>
            
            <p>
              Let's create a simple transmitter-receiver pair. You'll need two Arduino boards 
              with nRF24L01+ modules.
            </p>

            <h3>Transmitter Code</h3>
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {transmitterCode}
            </SyntaxHighlighter>

            <h3>Receiver Code</h3>
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {receiverCode}
            </SyntaxHighlighter>

            <h3>How It Works</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Both modules use the same address ("00001") for communication</li>
              <li>Transmitter opens a writing pipe and sends data every second</li>
              <li>Receiver opens a reading pipe and listens for incoming data</li>
              <li>When data is received, it's printed to the Serial Monitor</li>
            </ol>
          </section>

          <section id="advanced-features" className="mb-12">
            <h2>Advanced Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Multi-Node Networks</h4>
                <p className="text-blue-800 text-sm">
                  Create networks with up to 6 receiving nodes using different data pipes and addresses.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Auto-Acknowledgment</h4>
                <p className="text-green-800 text-sm">
                  Built-in acknowledgment ensures reliable data delivery with automatic retransmission.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Power Management</h4>
                <p className="text-purple-800 text-sm">
                  Multiple power modes for battery-operated projects with ultra-low standby current.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Dynamic Payloads</h4>
                <p className="text-orange-800 text-sm">
                  Send variable-length data packets without specifying payload size in advance.
                </p>
              </div>
            </div>
          </section>

          <section id="troubleshooting" className="mb-12">
            <h2>Troubleshooting</h2>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">No communication between modules</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Check 3.3V power supply (not 5V!)</li>
                  <li>• Verify all wiring connections</li>
                  <li>• Ensure both modules use same address</li>
                  <li>• Check for loose connections on breadboard</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-900 mb-2">Intermittent communication</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Add decoupling capacitors (10µF, 100nF)</li>
                  <li>• Use shorter, thicker wires</li>
                  <li>• Check power supply stability</li>
                  <li>• Reduce transmission power if too close</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-bold text-blue-900 mb-2">Short range</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Increase power level (RF24_PA_HIGH)</li>
                  <li>• Use external antenna version</li>
                  <li>• Check for interference sources</li>
                  <li>• Ensure clear line of sight</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default NRF24L01TutorialPage;
