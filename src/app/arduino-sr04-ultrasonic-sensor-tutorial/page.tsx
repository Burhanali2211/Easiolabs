import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const UltrasonicTutorialPage = () => {
  const arduinoCode = `// Include NewPing Library
#include "NewPing.h"

// Hook up HC-SR04 with Trig to Arduino Pin 9, Echo to Arduino pin 10
#define TRIGGER_PIN 9
#define ECHO_PIN 10

// Maximum distance we want to ping for (in centimeters).
#define MAX_DISTANCE 400

// NewPing setup of pins and maximum distance.
NewPing sonar(TRIGGER_PIN, ECHO_PIN, MAX_DISTANCE);

void setup() {
  Serial.begin(9600);
}

void loop() {
  Serial.print("Distance = ");
  Serial.print(sonar.ping_cm());
  Serial.println(" cm");
  delay(500);
}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Arduino</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How HC-SR04 Ultrasonic Sensor Works & Interface It With Arduino
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Tutorial Featured Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#hardware-overview" className="hover:underline">HC-SR04 Hardware Overview</a></li>
            <li><a href="#pinout" className="hover:underline">HC-SR04 Ultrasonic Sensor Pinout</a></li>
            <li><a href="#how-it-works" className="hover:underline">How Does HC-SR04 Ultrasonic Distance Sensor Work?</a></li>
            <li><a href="#wiring" className="hover:underline">Wiring an HC-SR04 Sensor to an Arduino</a></li>
            <li><a href="#library-installation" className="hover:underline">Library Installation</a></li>
            <li><a href="#arduino-code" className="hover:underline">Arduino Example Code</a></li>
            <li><a href="#project" className="hover:underline">Arduino Project – Contactless Distance Finder</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Whether you're building a robot that needs to avoid obstacles, an automatic door that opens when someone approaches, 
              a parking assistant that helps you park your car without hitting the wall, or even a smart measuring device to replace 
              your tape measure, the HC-SR04 is a fun and useful tool to add to your projects!
            </p>
            
            <p>
              This sensor is popular among hobbyists and makers for several good reasons. It uses very little power, making it perfect 
              for battery-powered projects. It's also affordable—you can usually find these sensors for just a few dollars. Best of all, 
              it's super easy to connect to an Arduino or other microcontrollers.
            </p>
            
            <p>
              In this tutorial, we'll explore how the HC-SR04 sensor works, how to connect it to an Arduino, and how to write a simple 
              program to measure distances with it.
            </p>
            
            <p>So, let's get started and give your next Arduino project bat-like powers!</p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">What is Ultrasonic?</h4>
              <p className="text-blue-800">
                "Ultrasonic" refers to sound waves with frequencies that exceed the range of what human ears can hear.
              </p>
            </div>
          </section>

          <section id="hardware-overview" className="mb-12">
            <h2>HC-SR04 Hardware Overview</h2>
            
            <p>
              The HC-SR04 ultrasonic distance sensor consists of two ultrasonic transducers working together. One acts as a transmitter, 
              changing electrical signals into 40 kHz ultrasonic sound pulses. The other works as a receiver, listening for these pulses 
              after they bounce back from an object.
            </p>
            
            <p>
              When the receiver detects these returning sound waves, it creates an output signal. The length of this signal is directly 
              related to how far away the object is. By measuring this signal length, your Arduino can calculate the exact distance to the object.
            </p>

            <h3>Technical Specifications</h3>
            
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Voltage</td>
                  <td className="border border-gray-300 px-4 py-2">DC 5V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Current</td>
                  <td className="border border-gray-300 px-4 py-2">15mA</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Operating Frequency</td>
                  <td className="border border-gray-300 px-4 py-2">40KHz</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Max Range</td>
                  <td className="border border-gray-300 px-4 py-2">4m</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Min Range</td>
                  <td className="border border-gray-300 px-4 py-2">2cm</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2 font-medium bg-gray-50">Ranging Accuracy</td>
                  <td className="border border-gray-300 px-4 py-2">3mm</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="pinout" className="mb-12">
            <h2>HC-SR04 Ultrasonic Sensor Pinout</h2>
            
            <p>Now, let's take a closer look at the pinout of the HC-SR04 Ultrasonic Sensor and what each pin does:</p>
            
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-bold mb-2">VCC</h4>
                  <p className="text-sm">Power pin for the sensor. Connect to 5V output from Arduino.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Trig (Trigger)</h4>
                  <p className="text-sm">Signal input pin. Pull HIGH for 10 microseconds to trigger measurement.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Echo</h4>
                  <p className="text-sm">Signal output pin. Goes HIGH when waiting for echo, LOW when echo received.</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">GND</h4>
                  <p className="text-sm">Ground connection. Connect to Arduino ground pin.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Wiring an HC-SR04 Sensor to an Arduino</h2>
            
            <p>
              Now that we fully understand how the HC-SR04 ultrasonic sensor works, let's connect it to our Arduino!
            </p>
            
            <p>
              Connecting the HC-SR04 to your Arduino is super simple. First, place the sensor on your breadboard. Connect the VCC pin 
              to the 5V pin on the Arduino, and the GND pin to the ground pin. Next, connect the Trig pin to digital pin #9 on your 
              Arduino, and the Echo pin to digital pin #10.
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">HC-SR04 Sensor</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Trig</td>
                  <td className="border border-gray-300 px-4 py-2">9</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Echo</td>
                  <td className="border border-gray-300 px-4 py-2">10</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="arduino-code" className="mb-12">
            <h2>Arduino Example Code</h2>
            
            <p>
              Let's try a simple program that uses the HC-SR04 ultrasonic sensor to measure the distance to objects and display 
              the results in centimeters on the Arduino's serial monitor every half-second.
            </p>
            
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {arduinoCode}
            </SyntaxHighlighter>

            <p>
              Once the code is uploaded to your Arduino, open the serial monitor and set the baud rate to 9600 bps. Now, point the 
              sensor at different objects around you—like your desk, a wall, or even your hand—and watch as the measured distances 
              update in real time.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default UltrasonicTutorialPage;
