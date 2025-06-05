import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const PIRSensorTutorialPage = () => {
  const arduinoCode = `// PIR Motion Sensor with Arduino
#define PIR_PIN 2
#define LED_PIN 13

void setup() {
  Serial.begin(9600);
  pinMode(PIR_PIN, INPUT);
  pinMode(LED_PIN, OUTPUT);
  
  Serial.println("PIR Motion Sensor Test");
  Serial.println("Waiting for sensor to stabilize...");
  delay(2000);
  Serial.println("Ready!");
}

void loop() {
  int motionDetected = digitalRead(PIR_PIN);
  
  if (motionDetected == HIGH) {
    digitalWrite(LED_PIN, HIGH);
    Serial.println("Motion detected!");
    delay(1000);
  } else {
    digitalWrite(LED_PIN, LOW);
  }
  
  delay(100);
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
            How HC-SR501 PIR Sensor Works & Interface It With Arduino
          </h1>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">PIR Sensor Tutorial Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#hardware-overview" className="hover:underline">HC-SR501 Hardware Overview</a></li>
            <li><a href="#pinout" className="hover:underline">HC-SR501 PIR Sensor Pinout</a></li>
            <li><a href="#how-it-works" className="hover:underline">How Does PIR Motion Detection Work?</a></li>
            <li><a href="#wiring" className="hover:underline">Wiring PIR Sensor to Arduino</a></li>
            <li><a href="#arduino-code" className="hover:underline">Arduino Example Code</a></li>
            <li><a href="#applications" className="hover:underline">Practical Applications</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Have you ever wondered how automatic doors know when you're approaching? Or how your hallway
              light turns on when you walk by at night? The secret behind these smart systems is often a
              simple yet ingenious device called a PIR (Passive Infrared) motion sensor.
            </p>

            <p>
              The HC-SR501 PIR sensor is one of the most popular and affordable motion detection modules
              available for Arduino projects. Whether you're building a security system, an automatic
              lighting controller, or a smart home device, this sensor is an excellent choice.
            </p>

            <p>
              In this comprehensive tutorial, we'll explore how PIR sensors work, how to connect the
              HC-SR501 to an Arduino, and create practical projects that you can use in your own home
              automation systems.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">What is PIR?</h4>
              <p className="text-blue-800">
                PIR stands for "Passive Infrared." These sensors detect infrared radiation emitted by
                warm objects, including humans and animals.
              </p>
            </div>
          </section>

          <section id="hardware-overview" className="mb-12">
            <h2>HC-SR501 Hardware Overview</h2>

            <p>
              The HC-SR501 is a complete PIR motion sensor module that includes the infrared sensor,
              signal processing circuitry, and adjustable settings. It's designed to be easy to use
              with microcontrollers like Arduino.
            </p>

            <h3>Key Features</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li>Operating voltage: 4.5V to 20V (typically 5V)</li>
              <li>Detection range: up to 7 meters</li>
              <li>Detection angle: approximately 120 degrees</li>
              <li>Adjustable sensitivity and time delay</li>
              <li>Low power consumption</li>
              <li>Digital output (HIGH/LOW)</li>
            </ul>

            <h3>Technical Specifications</h3>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Voltage</td>
                  <td className="border border-gray-300 px-4 py-2">4.5V - 20V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Current</td>
                  <td className="border border-gray-300 px-4 py-2">&lt; 50µA</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Detection Range</td>
                  <td className="border border-gray-300 px-4 py-2">3m - 7m</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Detection Angle</td>
                  <td className="border border-gray-300 px-4 py-2">&lt; 120°</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Trigger Methods</td>
                  <td className="border border-gray-300 px-4 py-2">L: Non-repeat, H: Repeat</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="pinout" className="mb-12">
            <h2>HC-SR501 PIR Sensor Pinout</h2>

            <p>The HC-SR501 has a simple 3-pin interface:</p>

            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-bold mb-2">VCC</h4>
                  <p className="text-sm">Power supply pin. Connect to 5V on Arduino.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">OUT</h4>
                  <p className="text-sm">Digital output pin. Goes HIGH when motion is detected.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">GND</h4>
                  <p className="text-sm">Ground connection. Connect to Arduino GND.</p>
                </div>
              </div>
            </div>

            <h3>Adjustable Components</h3>
            <p>The HC-SR501 also features two potentiometers for adjustment:</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li><strong>Sensitivity (Sx):</strong> Adjusts detection distance (3-7 meters)</li>
              <li><strong>Time Delay (Tx):</strong> Sets output duration (5 seconds to 5 minutes)</li>
            </ul>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Wiring PIR Sensor to Arduino</h2>

            <p>
              Connecting the HC-SR501 to your Arduino is straightforward with just three wires:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">HC-SR501 Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Pin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">OUT</td>
                  <td className="border border-gray-300 px-4 py-2">Digital Pin 2</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                </tr>
              </tbody>
            </table>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <h4 className="font-bold text-yellow-900 mb-2">⚠️ Important Notes</h4>
              <ul className="text-yellow-800 space-y-1">
                <li>• Allow 1-2 minutes for the sensor to stabilize after power-on</li>
                <li>• Avoid placing the sensor near heat sources</li>
                <li>• Keep the sensor away from air conditioning vents</li>
              </ul>
            </div>
          </section>

          <section id="arduino-code" className="mb-12">
            <h2>Arduino Example Code</h2>

            <p>
              Here's a simple Arduino sketch that reads the PIR sensor and controls an LED based on motion detection:
            </p>

            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {arduinoCode}
            </SyntaxHighlighter>

            <h3>How the Code Works</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Initialize the PIR sensor pin as INPUT and LED pin as OUTPUT</li>
              <li>Wait 2 seconds for the sensor to stabilize</li>
              <li>Continuously read the PIR sensor output</li>
              <li>When motion is detected (HIGH), turn on the LED and print a message</li>
              <li>When no motion (LOW), turn off the LED</li>
            </ol>
          </section>

          <section id="applications" className="mb-12">
            <h2>Practical Applications</h2>

            <p>The HC-SR501 PIR sensor can be used in many practical projects:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Security Systems</h4>
                <p className="text-blue-800 text-sm">
                  Create motion-activated alarms and surveillance systems for home security.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Automatic Lighting</h4>
                <p className="text-green-800 text-sm">
                  Build smart lights that turn on when someone enters a room.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Energy Saving</h4>
                <p className="text-purple-800 text-sm">
                  Control appliances to turn off when no one is present.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Pet Monitoring</h4>
                <p className="text-orange-800 text-sm">
                  Track pet movement and activity throughout the day.
                </p>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default PIRSensorTutorialPage;
