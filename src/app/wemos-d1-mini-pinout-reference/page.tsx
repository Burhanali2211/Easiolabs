const WeMosD1MiniPinoutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>ESP8266</span> → <span>Hardware Reference</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            WeMos D1 Mini Pinout Reference
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">WeMos D1 Mini Pinout Diagram</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#specifications" className="hover:underline">Technical Specifications</a></li>
            <li><a href="#pinout-diagram" className="hover:underline">Pinout Diagram</a></li>
            <li><a href="#gpio-functions" className="hover:underline">GPIO Pin Functions</a></li>
            <li><a href="#power-pins" className="hover:underline">Power Supply Pins</a></li>
            <li><a href="#special-pins" className="hover:underline">Special Function Pins</a></li>
            <li><a href="#pin-limitations" className="hover:underline">Pin Limitations</a></li>
            <li><a href="#programming" className="hover:underline">Programming Interface</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              When it comes to ESP8266 boards, the WeMos D1 Mini stands out as one of the most popular 
              and versatile development boards available. Its compact size, built-in WiFi, and Arduino 
              IDE compatibility make it perfect for IoT projects, home automation, and wireless sensor networks.
            </p>
            
            <p>
              The D1 Mini packs the power of the ESP8266 into a tiny form factor while maintaining 
              compatibility with standard breadboards and shields. Understanding its pinout is crucial 
              for successful project development.
            </p>
            
            <p>
              This comprehensive pinout reference will help you understand every pin on the WeMos D1 Mini, 
              their functions, limitations, and best practices for use in your projects.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">Why Choose WeMos D1 Mini?</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Compact size (34.2mm x 25.6mm)</li>
                <li>• Built-in WiFi and USB programming</li>
                <li>• Arduino IDE compatible</li>
                <li>• Affordable price point</li>
                <li>• Large ecosystem of shields</li>
              </ul>
            </div>
          </section>

          <section id="specifications" className="mb-12">
            <h2>Technical Specifications</h2>
            
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Microcontroller</td>
                  <td className="border border-gray-300 px-4 py-2">ESP8266EX</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Voltage</td>
                  <td className="border border-gray-300 px-4 py-2">3.3V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Input Voltage</td>
                  <td className="border border-gray-300 px-4 py-2">5V (via USB) or 3.3V (direct)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Digital I/O Pins</td>
                  <td className="border border-gray-300 px-4 py-2">11</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Analog Input Pins</td>
                  <td className="border border-gray-300 px-4 py-2">1 (3.2V max)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Flash Memory</td>
                  <td className="border border-gray-300 px-4 py-2">4MB</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Clock Speed</td>
                  <td className="border border-gray-300 px-4 py-2">80MHz (160MHz max)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">WiFi</td>
                  <td className="border border-gray-300 px-4 py-2">802.11 b/g/n</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Dimensions</td>
                  <td className="border border-gray-300 px-4 py-2">34.2mm x 25.6mm</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="pinout-diagram" className="mb-12">
            <h2>Pinout Diagram</h2>
            
            <p>The WeMos D1 Mini has pins on both sides of the board:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="font-bold mb-4">Left Side (Top to Bottom)</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>RST:</strong> Reset pin</div>
                  <div><strong>A0:</strong> Analog input (ADC)</div>
                  <div><strong>D0:</strong> GPIO16</div>
                  <div><strong>D5:</strong> GPIO14 (SCK)</div>
                  <div><strong>D6:</strong> GPIO12 (MISO)</div>
                  <div><strong>D7:</strong> GPIO13 (MOSI)</div>
                  <div><strong>D8:</strong> GPIO15 (SS)</div>
                  <div><strong>3V3:</strong> 3.3V output</div>
                </div>
              </div>
              
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="font-bold mb-4">Right Side (Top to Bottom)</h3>
                <div className="space-y-2 text-sm">
                  <div><strong>TX:</strong> GPIO1 (UART TX)</div>
                  <div><strong>RX:</strong> GPIO3 (UART RX)</div>
                  <div><strong>D1:</strong> GPIO5 (SCL)</div>
                  <div><strong>D2:</strong> GPIO4 (SDA)</div>
                  <div><strong>D3:</strong> GPIO0 (Flash button)</div>
                  <div><strong>D4:</strong> GPIO2 (Built-in LED)</div>
                  <div><strong>GND:</strong> Ground</div>
                  <div><strong>5V:</strong> 5V input/output</div>
                </div>
              </div>
            </div>
          </section>

          <section id="gpio-functions" className="mb-12">
            <h2>GPIO Pin Functions</h2>
            
            <p>Here's a detailed breakdown of each GPIO pin and its capabilities:</p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Pin Label</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">GPIO</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Function</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D0</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO16</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, Wake from deep sleep</td>
                  <td className="border border-gray-300 px-4 py-2">No PWM or I2C support</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D1</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO5</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, SCL (I2C)</td>
                  <td className="border border-gray-300 px-4 py-2">PWM, I2C, SPI</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D2</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO4</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, SDA (I2C)</td>
                  <td className="border border-gray-300 px-4 py-2">PWM, I2C, SPI</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D3</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO0</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, Flash button</td>
                  <td className="border border-gray-300 px-4 py-2">Boot mode pin, pull-up required</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D4</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO2</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, Built-in LED</td>
                  <td className="border border-gray-300 px-4 py-2">Boot mode pin, pull-up required</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D5</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO14</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, SCK (SPI)</td>
                  <td className="border border-gray-300 px-4 py-2">PWM, I2C, SPI</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D6</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO12</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, MISO (SPI)</td>
                  <td className="border border-gray-300 px-4 py-2">PWM, I2C, SPI</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D7</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO13</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, MOSI (SPI)</td>
                  <td className="border border-gray-300 px-4 py-2">PWM, I2C, SPI</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">D8</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO15</td>
                  <td className="border border-gray-300 px-4 py-2">Digital I/O, SS (SPI)</td>
                  <td className="border border-gray-300 px-4 py-2">Boot mode pin, pull-down required</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">RX</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO3</td>
                  <td className="border border-gray-300 px-4 py-2">UART RX</td>
                  <td className="border border-gray-300 px-4 py-2">Serial communication</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">TX</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO1</td>
                  <td className="border border-gray-300 px-4 py-2">UART TX</td>
                  <td className="border border-gray-300 px-4 py-2">Serial communication</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="power-pins" className="mb-12">
            <h2>Power Supply Pins</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">Power Input</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li><strong>5V:</strong> 5V input via USB or external supply</li>
                  <li><strong>3V3:</strong> 3.3V direct input (bypass regulator)</li>
                  <li><strong>GND:</strong> Ground connection</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Power Output</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li><strong>3V3:</strong> 3.3V output (max 500mA)</li>
                  <li><strong>5V:</strong> 5V output when powered via USB</li>
                  <li>All GPIO pins operate at 3.3V logic level</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <h4 className="font-bold text-yellow-900 mb-2">⚠️ Voltage Warning</h4>
              <p className="text-yellow-800">
                The ESP8266 operates at 3.3V. Applying 5V directly to GPIO pins will damage the chip. 
                Use level shifters when interfacing with 5V devices.
              </p>
            </div>
          </section>

          <section id="special-pins" className="mb-12">
            <h2>Special Function Pins</h2>
            
            <h3>Communication Interfaces</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">I2C (Wire)</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li><strong>SDA:</strong> D2 (GPIO4)</li>
                  <li><strong>SCL:</strong> D1 (GPIO5)</li>
                  <li>Default I2C pins</li>
                  <li>Can be changed in software</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">SPI</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li><strong>SCK:</strong> D5 (GPIO14)</li>
                  <li><strong>MISO:</strong> D6 (GPIO12)</li>
                  <li><strong>MOSI:</strong> D7 (GPIO13)</li>
                  <li><strong>SS:</strong> D8 (GPIO15)</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">UART</h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li><strong>TX:</strong> GPIO1</li>
                  <li><strong>RX:</strong> GPIO3</li>
                  <li>Hardware serial</li>
                  <li>Used for programming</li>
                </ul>
              </div>
            </div>

            <h3>Analog Input</h3>
            <div className="bg-orange-50 p-6 rounded-lg my-6">
              <h4 className="font-bold text-orange-900 mb-2">A0 (ADC)</h4>
              <ul className="text-orange-800 text-sm space-y-1">
                <li>• Single analog input pin</li>
                <li>• 10-bit resolution (0-1024)</li>
                <li>• Input range: 0-3.2V</li>
                <li>• Use voltage divider for higher voltages</li>
                <li>• Cannot be used simultaneously with WiFi in some modes</li>
              </ul>
            </div>
          </section>

          <section id="pin-limitations" className="mb-12">
            <h2>Pin Limitations</h2>
            
            <p>Understanding these limitations is crucial for successful projects:</p>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">Boot Mode Pins</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• GPIO0 (D3): Must be HIGH during boot</li>
                  <li>• GPIO2 (D4): Must be HIGH during boot</li>
                  <li>• GPIO15 (D8): Must be LOW during boot</li>
                  <li>• Avoid connecting devices that might interfere with boot</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-900 mb-2">GPIO16 (D0) Limitations</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• No PWM support</li>
                  <li>• No I2C or SPI support</li>
                  <li>• Used for deep sleep wake-up</li>
                  <li>• Digital I/O only</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-bold text-blue-900 mb-2">Current Limitations</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Maximum 12mA per GPIO pin</li>
                  <li>• Total current for all pins: 80mA</li>
                  <li>• Use external drivers for high-current devices</li>
                  <li>• Built-in LED on GPIO2 draws current</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="programming" className="mb-12">
            <h2>Programming Interface</h2>
            
            <p>
              The WeMos D1 Mini includes a built-in USB-to-serial converter for easy programming:
            </p>

            <h3>Programming Setup</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Install ESP8266 board package in Arduino IDE</li>
              <li>Select "LOLIN(WEMOS) D1 R2 & mini" as board</li>
              <li>Choose appropriate upload speed (115200 bps recommended)</li>
              <li>Connect via USB cable</li>
              <li>Upload your sketch</li>
            </ol>

            <h3>Board Settings</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Board</td>
                  <td className="border border-gray-300 px-4 py-2">LOLIN(WEMOS) D1 R2 & mini</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Upload Speed</td>
                  <td className="border border-gray-300 px-4 py-2">115200</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">CPU Frequency</td>
                  <td className="border border-gray-300 px-4 py-2">80 MHz</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Flash Size</td>
                  <td className="border border-gray-300 px-4 py-2">4MB (FS:2MB OTA:~1019KB)</td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </article>
    </div>
  );
};

export default WeMosD1MiniPinoutPage;
