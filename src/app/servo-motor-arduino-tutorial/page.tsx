import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ServoMotorTutorialPage = () => {
  const basicCode = `// Basic Servo Motor Control
#include <Servo.h>

Servo myServo;  // Create servo object

void setup() {
  myServo.attach(9);  // Attach servo to pin 9
  Serial.begin(9600);
  Serial.println("Servo Motor Test");
}

void loop() {
  // Sweep from 0 to 180 degrees
  for (int pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    delay(15);
  }
  
  // Sweep from 180 to 0 degrees
  for (int pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    delay(15);
  }
}`;

  const potControlCode = `// Servo Control with Potentiometer
#include <Servo.h>

Servo myServo;
int potPin = A0;    // Potentiometer connected to analog pin 0
int potValue;       // Variable to store potentiometer value
int angle;          // Variable to store servo angle

void setup() {
  myServo.attach(9);
  Serial.begin(9600);
}

void loop() {
  potValue = analogRead(potPin);           // Read potentiometer (0-1023)
  angle = map(potValue, 0, 1023, 0, 180);  // Map to servo angle (0-180)
  
  myServo.write(angle);                    // Move servo to angle
  
  Serial.print("Potentiometer: ");
  Serial.print(potValue);
  Serial.print(" -> Servo Angle: ");
  Serial.println(angle);
  
  delay(20);
}`;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Arduino</span> → <span>Motors</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            How Servo Motor Works & Interface It With Arduino
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Servo Motor Tutorial Image</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#how-it-works" className="hover:underline">How Servo Motors Work</a></li>
            <li><a href="#types" className="hover:underline">Types of Servo Motors</a></li>
            <li><a href="#pinout" className="hover:underline">Servo Motor Pinout</a></li>
            <li><a href="#wiring" className="hover:underline">Wiring to Arduino</a></li>
            <li><a href="#basic-control" className="hover:underline">Basic Servo Control</a></li>
            <li><a href="#potentiometer-control" className="hover:underline">Potentiometer Control</a></li>
            <li><a href="#applications" className="hover:underline">Applications & Projects</a></li>
            <li><a href="#troubleshooting" className="hover:underline">Troubleshooting</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              When it comes to choosing the right motor for a project, the options can be overwhelming. 
              DC motors, stepper motors, servo motors - each has its place. But if you need precise 
              angular positioning, smooth movement, and easy control, servo motors are often the perfect choice.
            </p>
            
            <p>
              Servo motors are incredibly popular in robotics, RC vehicles, and automation projects 
              because they offer precise position control with built-in feedback systems. Unlike regular 
              DC motors that just spin continuously, servo motors can move to specific angles and hold 
              their position.
            </p>
            
            <p>
              In this comprehensive tutorial, we'll explore how servo motors work, learn to control them 
              with Arduino, and build practical projects that demonstrate their capabilities.
            </p>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 my-6">
              <h4 className="font-bold text-green-900 mb-2">Why Choose Servo Motors?</h4>
              <p className="text-green-800">
                Servo motors provide precise position control, built-in feedback, and are easy to control 
                with just a single PWM signal from your Arduino.
              </p>
            </div>
          </section>

          <section id="how-it-works" className="mb-12">
            <h2>How Servo Motors Work</h2>
            
            <p>
              A servo motor is essentially a DC motor with additional components that enable precise 
              position control. Here's what's inside a typical servo motor:
            </p>

            <h3>Internal Components</h3>
            <ul className="list-disc list-inside mb-6 text-gray-700 space-y-2">
              <li><strong>DC Motor:</strong> Provides the rotational force</li>
              <li><strong>Gear Train:</strong> Reduces speed and increases torque</li>
              <li><strong>Potentiometer:</strong> Provides position feedback</li>
              <li><strong>Control Circuit:</strong> Processes PWM signals and controls motor</li>
            </ul>

            <h3>Control Signal (PWM)</h3>
            <p>
              Servo motors are controlled using Pulse Width Modulation (PWM) signals with specific characteristics:
            </p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Parameter</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Value</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Result</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Frequency</td>
                  <td className="border border-gray-300 px-4 py-2">50 Hz (20ms period)</td>
                  <td className="border border-gray-300 px-4 py-2">Standard servo frequency</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1ms pulse width</td>
                  <td className="border border-gray-300 px-4 py-2">5% duty cycle</td>
                  <td className="border border-gray-300 px-4 py-2">0° position</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">1.5ms pulse width</td>
                  <td className="border border-gray-300 px-4 py-2">7.5% duty cycle</td>
                  <td className="border border-gray-300 px-4 py-2">90° position (center)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">2ms pulse width</td>
                  <td className="border border-gray-300 px-4 py-2">10% duty cycle</td>
                  <td className="border border-gray-300 px-4 py-2">180° position</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="types" className="mb-12">
            <h2>Types of Servo Motors</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Standard Servo (180°)</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Rotation: 0° to 180°</li>
                  <li>• Most common type</li>
                  <li>• Perfect for robotic arms</li>
                  <li>• Examples: SG90, MG996R</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Continuous Rotation</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• 360° continuous rotation</li>
                  <li>• Speed control instead of position</li>
                  <li>• Good for wheels and conveyor belts</li>
                  <li>• Modified standard servos</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Multi-turn Servo</h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Multiple full rotations</li>
                  <li>• Precise position over 360°+</li>
                  <li>• More expensive</li>
                  <li>• Industrial applications</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Linear Servo</h4>
                <ul className="text-orange-800 text-sm space-y-1">
                  <li>• Linear motion instead of rotational</li>
                  <li>• Built-in lead screw mechanism</li>
                  <li>• Precise linear positioning</li>
                  <li>• Actuator applications</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="pinout" className="mb-12">
            <h2>Servo Motor Pinout</h2>
            
            <p>Standard servo motors have a simple 3-wire interface:</p>
            
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-bold mb-2">Red Wire - VCC</h4>
                  <p className="text-sm">Power supply (4.8V - 6V)</p>
                  <p className="text-xs text-gray-600">Connect to external 5V supply for high-torque servos</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Brown/Black Wire - GND</h4>
                  <p className="text-sm">Ground connection</p>
                  <p className="text-xs text-gray-600">Connect to Arduino GND and power supply GND</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Orange/Yellow Wire - Signal</h4>
                  <p className="text-sm">PWM control signal</p>
                  <p className="text-xs text-gray-600">Connect to Arduino digital pin (PWM capable)</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <h4 className="font-bold text-yellow-900 mb-2">⚠️ Power Considerations</h4>
              <p className="text-yellow-800">
                Small servos (like SG90) can be powered from Arduino's 5V pin, but larger servos 
                require external power supplies. Always connect grounds together!
              </p>
            </div>
          </section>

          <section id="wiring" className="mb-12">
            <h2>Wiring to Arduino</h2>
            
            <p>Here's how to connect a servo motor to your Arduino:</p>

            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Servo Wire</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Red (VCC)</td>
                  <td className="border border-gray-300 px-4 py-2">5V or External Supply</td>
                  <td className="border border-gray-300 px-4 py-2">Use external supply for multiple/large servos</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Brown/Black (GND)</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">Common ground with power supply</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Orange/Yellow (Signal)</td>
                  <td className="border border-gray-300 px-4 py-2">Digital Pin 9</td>
                  <td className="border border-gray-300 px-4 py-2">Any digital pin works</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="basic-control" className="mb-12">
            <h2>Basic Servo Control</h2>
            
            <p>
              Arduino includes a built-in Servo library that makes controlling servo motors simple. 
              Here's a basic example that sweeps the servo back and forth:
            </p>
            
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {basicCode}
            </SyntaxHighlighter>

            <h3>Code Explanation</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li>Include the Servo library and create a servo object</li>
              <li>Attach the servo to pin 9 in setup()</li>
              <li>Use nested for loops to sweep from 0° to 180° and back</li>
              <li>The write() function sets the servo position</li>
              <li>Small delays create smooth movement</li>
            </ol>
          </section>

          <section id="potentiometer-control" className="mb-12">
            <h2>Potentiometer Control</h2>
            
            <p>
              A more interactive example uses a potentiometer to control the servo position in real-time:
            </p>
            
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {potControlCode}
            </SyntaxHighlighter>

            <h3>Additional Wiring for Potentiometer</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Potentiometer Pin</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Arduino Pin</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Left Pin</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Middle Pin (Wiper)</td>
                  <td className="border border-gray-300 px-4 py-2">A0</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Right Pin</td>
                  <td className="border border-gray-300 px-4 py-2">5V</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section id="applications" className="mb-12">
            <h2>Applications & Projects</h2>
            
            <p>Servo motors are used in countless applications:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Robotics</h4>
                <p className="text-blue-800 text-sm">
                  Robotic arms, walking robots, pan-tilt camera mounts, and articulated joints.
                </p>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">RC Vehicles</h4>
                <p className="text-green-800 text-sm">
                  Steering mechanisms, throttle control, and control surface actuation in planes.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Home Automation</h4>
                <p className="text-purple-800 text-sm">
                  Automated blinds, door locks, valve controls, and smart furniture.
                </p>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Art & Displays</h4>
                <p className="text-orange-800 text-sm">
                  Kinetic sculptures, interactive displays, and mechanical art installations.
                </p>
              </div>
            </div>
          </section>

          <section id="troubleshooting" className="mb-12">
            <h2>Troubleshooting</h2>
            
            <h3>Common Issues and Solutions</h3>
            
            <div className="space-y-6">
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <h4 className="font-bold text-red-900 mb-2">Servo doesn't move</h4>
                <ul className="text-red-800 text-sm space-y-1">
                  <li>• Check power connections (VCC and GND)</li>
                  <li>• Verify signal wire connection</li>
                  <li>• Ensure adequate power supply</li>
                  <li>• Test with known working code</li>
                </ul>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <h4 className="font-bold text-yellow-900 mb-2">Servo jitters or moves erratically</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Use external power supply for large servos</li>
                  <li>• Add capacitors to smooth power supply</li>
                  <li>• Check for loose connections</li>
                  <li>• Avoid rapid position changes</li>
                </ul>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h4 className="font-bold text-blue-900 mb-2">Limited range of motion</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Some servos have less than 180° range</li>
                  <li>• Check servo specifications</li>
                  <li>• Calibrate using servo.writeMicroseconds()</li>
                  <li>• Mechanical obstruction check</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ServoMotorTutorialPage;
