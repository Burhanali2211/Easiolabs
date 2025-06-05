import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const I2CLCDTutorialPage = () => {
  const arduinoCode = `// I2C LCD Display with Arduino
#include <LiquidCrystal_I2C.h>

// Set the LCD address to 0x27 for a 16 chars and 2 line display
LiquidCrystal_I2C lcd(0x27, 16, 2);

void setup() {
  // Initialize the LCD
  lcd.init();
  
  // Turn on the backlight
  lcd.backlight();
  
  // Print a message to the LCD
  lcd.setCursor(0, 0);
  lcd.print("Hello, World!");
  
  lcd.setCursor(0, 1);
  lcd.print("EasyioLabs");
}

void loop() {
  // Scroll text example
  for (int position = 0; position < 13; position++) {
    lcd.scrollDisplayLeft();
    delay(300);
  }
  
  for (int position = 0; position < 29; position++) {
    lcd.scrollDisplayRight();
    delay(300);
  }
  
  for (int position = 0; position < 16; position++) {
    lcd.scrollDisplayLeft();
    delay(300);
  }
  
  delay(1000);
}`;

  const scannerCode = `// I2C Scanner to find LCD address
#include <Wire.h>

void setup() {
  Wire.begin();
  Serial.begin(9600);
  while (!Serial);
  Serial.println("\\nI2C Scanner");
}

void loop() {
  byte error, address;
  int nDevices;

  Serial.println("Scanning...");

  nDevices = 0;
  for(address = 1; address < 127; address++) {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      Serial.print("I2C device found at address 0x");
      if (address < 16) 
        Serial.print("0");
      Serial.print(address, HEX);
      Serial.println("  !");

      nDevices++;
    }
  }
  
  if (nDevices == 0)
    Serial.println("No I2C devices found\\n");
  else
    Serial.println("done\\n");

  delay(5000);
}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Arduino</span> → <span>Displays</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Interface an I2C LCD with Arduino
          </h1>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">I2C LCD Tutorial Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#i2c-advantages" className="hover:underline">Why Use I2C LCD?</a></li>
            <li><a href="#hardware-overview" className="hover:underline">Hardware Overview</a></li>
            <li><a href="#pinout" className="hover:underline">I2C LCD Pinout</a></li>
            <li><a href="#wiring" className="hover:underline">Wiring to Arduino</a></li>
            <li><a href="#finding-address" className="hover:underline">Finding I2C Address</a></li>
            <li><a href="#library-installation" className="hover:underline">Library Installation</a></li>
            <li><a href="#arduino-code" className="hover:underline">Arduino Code Examples</a></li>
            <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              If you've ever tried connecting an LCD display to an Arduino, you've probably noticed it
              uses a lot of digital pins - typically 6 or more! This can quickly consume most of your
              Arduino's available pins, leaving little room for other components.
            </p>

            <p>
              The solution? An I2C LCD display! By using the I2C communication protocol, you can control
              a 16x2 or 20x4 LCD display using just 2 pins (SDA and SCL), freeing up valuable digital
              pins for other sensors and actuators in your project.
            </p>

            <p>
              In this tutorial, we'll learn how to connect and program an I2C LCD display with Arduino,
              covering everything from basic text display to advanced features like custom characters
              and scrolling text.
            </p>
          </section>

          <section id="i2c-advantages" className="mb-12">
            <h2>Why Use I2C LCD?</h2>

            <p>I2C LCD displays offer several advantages over traditional parallel LCD connections:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">✅ Fewer Pins</h4>
                <p className="text-green-800 text-sm">
                  Uses only 2 pins (SDA, SCL) instead of 6+ pins for parallel connection.
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">✅ Easier Wiring</h4>
                <p className="text-blue-800 text-sm">
                  Simpler connections with fewer wires to manage and debug.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">✅ Multiple Devices</h4>
                <p className="text-purple-800 text-sm">
                  Can connect multiple I2C devices on the same bus with different addresses.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">✅ Long Distance</h4>
                <p className="text-orange-800 text-sm">
                  I2C can work over longer distances compared to parallel connections.
                </p>
              </div>
            </div>
          </section>

          <section id="hardware-overview" className="mb-12">
            <h2>Hardware Overview</h2>

            <p>
              An I2C LCD display consists of a standard LCD panel (usually 16x2 or 20x4) with an
              I2C backpack module soldered to the back. This backpack contains a PCF8574 I/O expander
              chip that converts I2C signals to the parallel signals required by the LCD.
            </p>

            <h3>Common Specifications</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>Operating voltage: 5V (some 3.3V versions available)</li>
              <li>Display sizes: 16x2, 20x4 characters most common</li>
              <li>I2C address: Usually 0x27 or 0x3F (adjustable)</li>
              <li>Backlight: Blue with white text (most common)</li>
              <li>Character set: Standard ASCII + custom characters</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">I2C Backpack</h4>
              <p className="text-blue-800">
                The I2C backpack module typically includes a potentiometer for contrast adjustment
                and jumpers for setting the I2C address.
              </p>
            </div>
          </section>

          <section id="pinout" className="mb-12">
            <h2>I2C LCD Pinout</h2>

            <p>The I2C LCD backpack has a simple 4-pin interface:</p>

            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <h4 className="font-bold mb-2">VCC</h4>
                  <p className="text-sm">Power supply (5V)</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">GND</h4>
                  <p className="text-sm">Ground connection</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">SDA</h4>
                  <p className="text-sm">I2C data line</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">SCL</h4>
                  <p className="text-sm">I2C clock line</p>
                </div>
              </div>
            </div>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Wiring to Arduino</h2>

            <p>
              Connecting an I2C LCD to Arduino is straightforward. The exact pins depend on your Arduino model:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">LCD Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Uno/Nano</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Mega</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SDA</td>
                  <td className="border border-gray-300 px-4 py-2">A4</td>
                  <td className="border border-gray-300 px-4 py-2">20</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">SCL</td>
                  <td className="border border-gray-300 px-4 py-2">A5</td>
                  <td className="border border-gray-300 px-4 py-2">21</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <h4 className="font-bold text-yellow-900 mb-2">⚠️ Pull-up Resistors</h4>
              <p className="text-yellow-800">
                I2C requires pull-up resistors on SDA and SCL lines. Most I2C LCD modules include
                these resistors, but if you experience communication issues, you may need to add
                external 4.7kΩ pull-up resistors.
              </p>
            </div>
          </section>

          <section id="finding-address" className="mb-12">
            <h2>Finding I2C Address</h2>

            <p>
              Before using your I2C LCD, you need to find its I2C address. Different manufacturers
              may use different default addresses. Use this I2C scanner code:
            </p>

            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {scannerCode}
            </SyntaxHighlighter>

            <p>
              Upload this code and open the Serial Monitor. The scanner will display the I2C address
              of your LCD (commonly 0x27 or 0x3F).
            </p>
          </section>

          <section id="library-installation" className="mb-12">
            <h2>Library Installation</h2>

            <p>
              To control I2C LCD displays, you'll need to install the LiquidCrystal_I2C library:
            </p>

            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Open Arduino IDE</li>
              <li>Go to Sketch → Include Library → Manage Libraries</li>
              <li>Search for "LiquidCrystal I2C" by Frank de Brabander</li>
              <li>Click Install</li>
              <li>Restart Arduino IDE</li>
            </ol>
          </section>

          <section id="arduino-code" className="mb-12">
            <h2>Arduino Code Examples</h2>

            <p>
              Here's a basic example that displays text and demonstrates scrolling:
            </p>

            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {arduinoCode}
            </SyntaxHighlighter>

            <h3>Code Explanation</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Include the LiquidCrystal_I2C library</li>
              <li>Create LCD object with address (0x27) and dimensions (16x2)</li>
              <li>Initialize the LCD and turn on backlight</li>
              <li>Set cursor position and print text</li>
              <li>Demonstrate scrolling text effects</li>
            </ol>

            <h3>Useful LCD Functions</h3>
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <ul className="space-y-2 text-sm">
                <li><code>lcd.init()</code> - Initialize the LCD</li>
                <li><code>lcd.backlight()</code> - Turn on backlight</li>
                <li><code>lcd.noBacklight()</code> - Turn off backlight</li>
                <li><code>lcd.clear()</code> - Clear the display</li>
                <li><code>lcd.setCursor(col, row)</code> - Set cursor position</li>
                <li><code>lcd.print("text")</code> - Print text</li>
                <li><code>lcd.scrollDisplayLeft()</code> - Scroll display left</li>
                <li><code>lcd.scrollDisplayRight()</code> - Scroll display right</li>
              </ul>
            </div>
          </section>

          <section id="troubleshooting" className="mb-12">
            <h2>Troubleshooting</h2>

            <h3>Common Issues and Solutions</h3>

            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">Display shows nothing</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Check wiring connections</li>
                  <li>• Verify I2C address using scanner code</li>
                  <li>• Adjust contrast potentiometer on backpack</li>
                  <li>• Ensure 5V power supply</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-900 mb-2">Garbled characters</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Check I2C address in code</li>
                  <li>• Verify SDA/SCL connections</li>
                  <li>• Add pull-up resistors if needed</li>
                  <li>• Check for loose connections</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-bold text-blue-900 mb-2">Backlight works but no text</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Adjust contrast potentiometer</li>
                  <li>• Check library installation</li>
                  <li>• Verify LCD dimensions in code</li>
                  <li>• Test with simple "Hello World" code</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default I2CLCDTutorialPage;
