const ESP32CAMPinoutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>ESP32</span> → <span>Hardware Reference</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            ESP32-CAM Pinout Reference
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">ESP32-CAM Pinout Diagram</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#specifications" className="hover:underline">Technical Specifications</a></li>
            <li><a href="#pinout-diagram" className="hover:underline">Pinout Diagram</a></li>
            <li><a href="#gpio-pins" className="hover:underline">GPIO Pin Functions</a></li>
            <li><a href="#camera-interface" className="hover:underline">Camera Interface</a></li>
            <li><a href="#programming" className="hover:underline">Programming the ESP32-CAM</a></li>
            <li><a href="#power-supply" className="hover:underline">Power Supply Requirements</a></li>
            <li><a href="#limitations" className="hover:underline">Pin Limitations</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Without a doubt, the ESP32-CAM is a powerful device with an impressive set of features 
              for its price point. Combining the ESP32-S microcontroller with an OV2640 camera module, 
              it opens up possibilities for IoT projects involving image capture, streaming, and computer vision.
            </p>
            
            <p>
              However, the ESP32-CAM's compact design comes with some unique characteristics and limitations 
              that you need to understand before diving into your projects. This comprehensive pinout 
              reference will help you make the most of this versatile development board.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">Key Features</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• ESP32-S dual-core processor</li>
                <li>• 2MP OV2640 camera with flash LED</li>
                <li>• WiFi and Bluetooth connectivity</li>
                <li>• MicroSD card slot</li>
                <li>• Multiple GPIO pins for expansion</li>
              </ul>
            </div>
          </section>

          <section id="specifications" className="mb-12">
            <h2>Technical Specifications</h2>
            
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Microcontroller</td>
                  <td className="border border-gray-300 px-4 py-2">ESP32-S (dual-core Tensilica LX6)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Clock Speed</td>
                  <td className="border border-gray-300 px-4 py-2">240 MHz</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">SRAM</td>
                  <td className="border border-gray-300 px-4 py-2">520 KB</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Flash Memory</td>
                  <td className="border border-gray-300 px-4 py-2">4 MB</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Camera</td>
                  <td className="border border-gray-300 px-4 py-2">OV2640 (2MP, 1600x1200)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">WiFi</td>
                  <td className="border border-gray-300 px-4 py-2">802.11 b/g/n</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Bluetooth</td>
                  <td className="border border-gray-300 px-4 py-2">v4.2 BR/EDR and BLE</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Voltage</td>
                  <td className="border border-gray-300 px-4 py-2">5V (via USB) or 3.3V (direct)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Dimensions</td>
                  <td className="border border-gray-300 px-4 py-2">40.5mm x 27mm</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="pinout-diagram" className="mb-12">
            <h2>Pinout Diagram</h2>
            
            <p>
              The ESP32-CAM has a unique pin layout with connections on three sides of the board:
            </p>

            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <h3 className="font-bold mb-4">Left Side Pins (Top to Bottom)</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>5V:</strong> Power input (5V)
                </div>
                <div>
                  <strong>GND:</strong> Ground
                </div>
                <div>
                  <strong>IO12:</strong> GPIO12 (MTDI)
                </div>
                <div>
                  <strong>IO13:</strong> GPIO13 (MTCK)
                </div>
                <div>
                  <strong>IO15:</strong> GPIO15 (MTDO)
                </div>
                <div>
                  <strong>IO14:</strong> GPIO14 (MTMS)
                </div>
                <div>
                  <strong>IO2:</strong> GPIO2 (Boot mode)
                </div>
                <div>
                  <strong>IO4:</strong> GPIO4 (Flash LED)
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <h3 className="font-bold mb-4">Right Side Pins (Top to Bottom)</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>3V3:</strong> 3.3V output
                </div>
                <div>
                  <strong>GND:</strong> Ground
                </div>
                <div>
                  <strong>IO1:</strong> GPIO1 (TX)
                </div>
                <div>
                  <strong>IO3:</strong> GPIO3 (RX)
                </div>
                <div>
                  <strong>IO16:</strong> GPIO16 (UART2 RX)
                </div>
                <div>
                  <strong>IO0:</strong> GPIO0 (Boot/Flash mode)
                </div>
                <div>
                  <strong>VCC:</strong> Power input
                </div>
                <div>
                  <strong>GND:</strong> Ground
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <h3 className="font-bold mb-4">Bottom Pins (Left to Right)</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>U0T:</strong> UART0 TX (GPIO1)
                </div>
                <div>
                  <strong>U0R:</strong> UART0 RX (GPIO3)
                </div>
                <div>
                  <strong>IO16:</strong> GPIO16
                </div>
              </div>
            </div>
          </section>

          <section id="gpio-pins" className="mb-12">
            <h2>GPIO Pin Functions</h2>
            
            <p>Here's a detailed breakdown of each GPIO pin and its capabilities:</p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">GPIO</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Function</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO0</td>
                  <td className="border border-gray-300 px-4 py-2">Boot mode selection</td>
                  <td className="border border-gray-300 px-4 py-2">Pull LOW for programming mode</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO1</td>
                  <td className="border border-gray-300 px-4 py-2">UART0 TX</td>
                  <td className="border border-gray-300 px-4 py-2">Serial communication</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO2</td>
                  <td className="border border-gray-300 px-4 py-2">Boot mode, Built-in LED</td>
                  <td className="border border-gray-300 px-4 py-2">Must be HIGH during boot</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO3</td>
                  <td className="border border-gray-300 px-4 py-2">UART0 RX</td>
                  <td className="border border-gray-300 px-4 py-2">Serial communication</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO4</td>
                  <td className="border border-gray-300 px-4 py-2">Flash LED control</td>
                  <td className="border border-gray-300 px-4 py-2">Controls camera flash LED</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO12</td>
                  <td className="border border-gray-300 px-4 py-2">MTDI, ADC2_CH5</td>
                  <td className="border border-gray-300 px-4 py-2">Touch sensor, ADC</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO13</td>
                  <td className="border border-gray-300 px-4 py-2">MTCK, ADC2_CH4</td>
                  <td className="border border-gray-300 px-4 py-2">Touch sensor, ADC</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO14</td>
                  <td className="border border-gray-300 px-4 py-2">MTMS, ADC2_CH6</td>
                  <td className="border border-gray-300 px-4 py-2">Touch sensor, ADC</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO15</td>
                  <td className="border border-gray-300 px-4 py-2">MTDO, ADC2_CH3</td>
                  <td className="border border-gray-300 px-4 py-2">Touch sensor, ADC</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GPIO16</td>
                  <td className="border border-gray-300 px-4 py-2">UART2 RX</td>
                  <td className="border border-gray-300 px-4 py-2">Secondary UART</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="camera-interface" className="mb-12">
            <h2>Camera Interface</h2>
            
            <p>
              The OV2640 camera is connected to specific ESP32 pins and cannot be changed:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Camera Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">ESP32 GPIO</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Function</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">PWDN</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO32</td>
                  <td className="border border-gray-300 px-4 py-2">Power down</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">RESET</td>
                  <td className="border border-gray-300 px-4 py-2">-1 (not connected)</td>
                  <td className="border border-gray-300 px-4 py-2">Reset (software reset)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">XCLK</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO0</td>
                  <td className="border border-gray-300 px-4 py-2">External clock</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SIOD</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO26</td>
                  <td className="border border-gray-300 px-4 py-2">I2C data</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SIOC</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO27</td>
                  <td className="border border-gray-300 px-4 py-2">I2C clock</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Y9-Y2</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO36, 21, 19, 18, 5, 4, 2, 15</td>
                  <td className="border border-gray-300 px-4 py-2">Data bits</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VSYNC</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO25</td>
                  <td className="border border-gray-300 px-4 py-2">Vertical sync</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">HREF</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO23</td>
                  <td className="border border-gray-300 px-4 py-2">Horizontal reference</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">PCLK</td>
                  <td className="border border-gray-300 px-4 py-2">GPIO22</td>
                  <td className="border border-gray-300 px-4 py-2">Pixel clock</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <h4 className="font-bold text-yellow-900 mb-2">⚠️ Important Note</h4>
              <p className="text-yellow-800">
                Many GPIO pins are dedicated to the camera interface and cannot be used for other purposes 
                when the camera is active. This significantly limits the available pins for external connections.
              </p>
            </div>
          </section>

          <section id="programming" className="mb-12">
            <h2>Programming the ESP32-CAM</h2>
            
            <p>
              The ESP32-CAM doesn't have a built-in USB-to-serial converter, so you need an external 
              programmer or FTDI adapter:
            </p>

            <h3>Programming Mode Connections</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">FTDI/Programmer</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">ESP32-CAM</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">TX</td>
                  <td className="border border-gray-300 px-4 py-2">U0R (GPIO3)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">RX</td>
                  <td className="border border-gray-300 px-4 py-2">U0T (GPIO1)</td>
                </tr>
              </tbody>
            </table>

            <h3>Programming Steps</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Connect GPIO0 to GND (programming mode)</li>
              <li>Connect power and serial lines as shown above</li>
              <li>Press reset button or power cycle</li>
              <li>Upload your code through Arduino IDE</li>
              <li>Disconnect GPIO0 from GND</li>
              <li>Reset the board to run your program</li>
            </ol>
          </section>

          <section id="power-supply" className="mb-12">
            <h2>Power Supply Requirements</h2>
            
            <p>
              The ESP32-CAM has specific power requirements, especially when using the camera and WiFi:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-red-50 p-6 rounded-lg">
                <h4 className="font-bold text-red-900 mb-2">Power Requirements</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Operating voltage: 5V (recommended)</li>
                  <li>• Current consumption: 160-260mA</li>
                  <li>• Peak current: up to 800mA</li>
                  <li>• Minimum supply: 3.3V (limited functionality)</li>
                </ul>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Power Sources</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• USB power bank (5V, 2A minimum)</li>
                  <li>• Wall adapter (5V, 2A)</li>
                  <li>• Li-Po battery with boost converter</li>
                  <li>• Avoid computer USB ports (insufficient current)</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="limitations" className="mb-12">
            <h2>Pin Limitations</h2>
            
            <p>Understanding the ESP32-CAM's limitations is crucial for successful projects:</p>

            <div className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-900 mb-2">Limited Available Pins</h4>
                <p className="text-yellow-800 text-sm">
                  Only GPIO12, GPIO13, GPIO14, GPIO15, and GPIO16 are readily available for external connections 
                  when the camera is in use.
                </p>
              </div>

              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">Boot Mode Pins</h4>
                <p className="text-red-800 text-sm">
                  GPIO0 and GPIO2 affect boot mode. Avoid connecting devices that might interfere with 
                  the boot process.
                </p>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-bold text-blue-900 mb-2">No Built-in Programmer</h4>
                <p className="text-blue-800 text-sm">
                  Unlike other ESP32 boards, the ESP32-CAM requires an external programmer for code upload, 
                  making development slightly more complex.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ESP32CAMPinoutPage;
