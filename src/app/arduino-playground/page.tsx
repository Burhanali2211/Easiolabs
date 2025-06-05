'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Play, Square, RotateCcw, Code, Lightbulb, Download, Upload } from 'lucide-react';

const ArduinoPlaygroundPage = () => {
  const [code, setCode] = useState(`// Arduino LED Blink Example
// This is a basic example to get you started

void setup() {
  // Initialize digital pin 13 as an output
  pinMode(13, OUTPUT);
  Serial.begin(9600);
  Serial.println("Arduino started!");
}

void loop() {
  // Turn the LED on
  digitalWrite(13, HIGH);
  Serial.println("LED ON");
  delay(1000);  // Wait for 1 second
  
  // Turn the LED off
  digitalWrite(13, LOW);
  Serial.println("LED OFF");
  delay(1000);  // Wait for 1 second
}`);

  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [ledState, setLedState] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1000);

  const examples = [
    {
      name: 'Blink LED',
      description: 'Basic LED blinking example',
      code: `// Arduino LED Blink Example
void setup() {
  pinMode(13, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  digitalWrite(13, HIGH);
  Serial.println("LED ON");
  delay(1000);
  
  digitalWrite(13, LOW);
  Serial.println("LED OFF");
  delay(1000);
}`
    },
    {
      name: 'Button Control',
      description: 'Control LED with a button',
      code: `// Button controlled LED
const int buttonPin = 2;
const int ledPin = 13;
int buttonState = 0;

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  buttonState = digitalRead(buttonPin);
  
  if (buttonState == HIGH) {
    digitalWrite(ledPin, HIGH);
    Serial.println("Button pressed - LED ON");
  } else {
    digitalWrite(ledPin, LOW);
    Serial.println("Button released - LED OFF");
  }
  
  delay(50);
}`
    },
    {
      name: 'Analog Read',
      description: 'Read analog sensor values',
      code: `// Read analog sensor (potentiometer)
int sensorPin = A0;
int sensorValue = 0;

void setup() {
  Serial.begin(9600);
}

void loop() {
  sensorValue = analogRead(sensorPin);
  
  Serial.print("Sensor value: ");
  Serial.println(sensorValue);
  
  // Map sensor value to LED brightness
  int brightness = map(sensorValue, 0, 1023, 0, 255);
  analogWrite(9, brightness);
  
  delay(100);
}`
    },
    {
      name: 'PWM Control',
      description: 'Fade LED using PWM',
      code: `// Fade LED using PWM
int ledPin = 9;
int brightness = 0;
int fadeAmount = 5;

void setup() {
  pinMode(ledPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  analogWrite(ledPin, brightness);

  Serial.print("Brightness: ");
  Serial.println(brightness);

  brightness = brightness + fadeAmount;

  if (brightness <= 0 || brightness >= 255) {
    fadeAmount = -fadeAmount;
  }

  delay(30);
}`
    },
    {
      name: 'Temperature Sensor',
      description: 'Read temperature from analog sensor',
      code: `// Temperature sensor reading
int sensorPin = A0;
float temperature = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Temperature Monitor Started");
}

void loop() {
  int sensorValue = analogRead(sensorPin);

  // Convert to voltage (5V reference)
  float voltage = sensorValue * (5.0 / 1023.0);

  // Convert to temperature (TMP36 sensor)
  temperature = (voltage - 0.5) * 100;

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" °C");

  delay(1000);
}`
    },
    {
      name: 'Traffic Light',
      description: 'Simple traffic light sequence',
      code: `// Traffic Light Controller
int redPin = 11;
int yellowPin = 12;
int greenPin = 13;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  Serial.begin(9600);
  Serial.println("Traffic Light Started");
}

void loop() {
  // Red light
  digitalWrite(redPin, HIGH);
  Serial.println("RED - STOP");
  delay(3000);

  // Red + Yellow
  digitalWrite(yellowPin, HIGH);
  Serial.println("RED + YELLOW - GET READY");
  delay(1000);

  // Green light
  digitalWrite(redPin, LOW);
  digitalWrite(yellowPin, LOW);
  digitalWrite(greenPin, HIGH);
  Serial.println("GREEN - GO");
  delay(3000);

  // Yellow light
  digitalWrite(greenPin, LOW);
  digitalWrite(yellowPin, HIGH);
  Serial.println("YELLOW - CAUTION");
  delay(1000);

  digitalWrite(yellowPin, LOW);
}`
    },
    {
      name: 'Servo Sweep',
      description: 'Control servo motor movement',
      code: `// Servo Motor Sweep
#include <Servo.h>

Servo myServo;
int pos = 0;

void setup() {
  myServo.attach(9);
  Serial.begin(9600);
  Serial.println("Servo Sweep Started");
}

void loop() {
  // Sweep from 0 to 180 degrees
  for (pos = 0; pos <= 180; pos += 1) {
    myServo.write(pos);
    Serial.print("Servo position: ");
    Serial.println(pos);
    delay(15);
  }

  // Sweep from 180 to 0 degrees
  for (pos = 180; pos >= 0; pos -= 1) {
    myServo.write(pos);
    Serial.print("Servo position: ");
    Serial.println(pos);
    delay(15);
  }
}`
    }
  ];

  const loadExample = (example: typeof examples[0]) => {
    setCode(example.code);
    stopSimulation();
  };

  const startSimulation = () => {
    setIsRunning(true);
    setOutput([]);
    setCurrentLine(0);
    simulateArduino();
  };

  const stopSimulation = () => {
    setIsRunning(false);
    setLedState(false);
    setCurrentLine(0);
  };

  const resetSimulation = () => {
    stopSimulation();
    setOutput([]);
  };

  const simulateArduino = () => {
    // Simple simulation logic
    const lines = code.split('\n');
    let lineIndex = 0;
    let loopStartIndex = -1;
    let setupComplete = false;

    // Find setup and loop functions
    lines.forEach((line, index) => {
      if (line.includes('void loop()')) {
        loopStartIndex = index;
      }
    });

    const simulate = () => {
      if (!isRunning) return;

      const line = lines[lineIndex]?.trim();
      if (!line || line.startsWith('//')) {
        lineIndex++;
        if (lineIndex >= lines.length) {
          if (loopStartIndex >= 0 && setupComplete) {
            lineIndex = loopStartIndex + 1; // Start loop again
          } else {
            setIsRunning(false);
            return;
          }
        }
        setTimeout(simulate, 100);
        return;
      }

      setCurrentLine(lineIndex);

      // Simulate Arduino commands
      if (line.includes('Serial.println')) {
        const message = line.match(/"([^"]*)"/)?.[1] || line.match(/Serial\.println\(([^)]+)\)/)?.[1] || 'Output';
        setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
      } else if (line.includes('Serial.print')) {
        const message = line.match(/"([^"]*)"/)?.[1] || line.match(/Serial\.print\(([^)]+)\)/)?.[1] || 'Output';
        setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
      } else if (line.includes('digitalWrite') && (line.includes('13') || line.includes('ledPin'))) {
        if (line.includes('HIGH')) {
          setLedState(true);
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: LED turned ON`]);
        } else if (line.includes('LOW')) {
          setLedState(false);
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: LED turned OFF`]);
        }
      } else if (line.includes('analogWrite')) {
        const brightnessMatch = line.match(/analogWrite\([^,]+,\s*(\w+)\)/);
        if (brightnessMatch) {
          const brightness = brightnessMatch[1];
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: PWM set to ${brightness}`]);
          // Simulate LED brightness based on PWM value
          if (brightness === 'brightness' || parseInt(brightness) > 0) {
            setLedState(true);
          }
        }
      } else if (line.includes('analogRead')) {
        const sensorValue = Math.floor(Math.random() * 1024); // Simulate sensor reading
        setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: Sensor reading: ${sensorValue}`]);
      } else if (line.includes('delay(')) {
        const delayMatch = line.match(/delay\((\d+)\)/);
        if (delayMatch) {
          const delayTime = parseInt(delayMatch[1]);
          setTimeout(simulate, Math.min(delayTime / simulationSpeed, 2000));
          lineIndex++;
          return;
        }
      } else if (line.includes('void setup()')) {
        setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: Setup started`]);
      } else if (line.includes('void loop()')) {
        if (!setupComplete) {
          setupComplete = true;
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: Setup complete, starting loop`]);
        }
      } else if (line.includes('pinMode')) {
        const pinMatch = line.match(/pinMode\((\d+),\s*(\w+)\)/);
        if (pinMatch) {
          setOutput(prev => [...prev, `${new Date().toLocaleTimeString()}: Pin ${pinMatch[1]} set as ${pinMatch[2]}`]);
        }
      }

      lineIndex++;
      if (lineIndex >= lines.length) {
        if (loopStartIndex >= 0 && setupComplete) {
          lineIndex = loopStartIndex + 1; // Start loop again
        } else {
          setIsRunning(false);
          return;
        }
      }

      setTimeout(simulate, 200);
    };

    simulate();
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'arduino_sketch.ino';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <Code className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={downloadCode}
                className="flex items-center text-gray-600 hover:text-gray-700"
              >
                <Download className="h-5 w-5 mr-2" />
                Download
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Code className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Arduino Code Playground
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Write, test, and simulate Arduino code in your browser
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

            {/* Examples Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Example Code</h3>
                <div className="space-y-2">
                  {examples.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => loadExample(example)}
                      className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <h4 className="font-medium text-gray-900 text-sm">{example.name}</h4>
                      <p className="text-gray-600 text-xs mt-1">{example.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900">Code Editor</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={startSimulation}
                      disabled={isRunning}
                      className="flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </button>
                    <button
                      onClick={stopSimulation}
                      disabled={!isRunning}
                      className="flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Square className="h-4 w-4 mr-2" />
                      Stop
                    </button>
                    <button
                      onClick={resetSimulation}
                      className="flex items-center px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-96 p-4 font-mono text-sm border-none resize-none focus:outline-none"
                    placeholder="Write your Arduino code here..."
                    style={{
                      backgroundColor: '#1e1e1e',
                      color: '#d4d4d4',
                      lineHeight: '1.5'
                    }}
                  />
                  {isRunning && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                      Running...
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Simulation Speed:
                    </span>
                    <select
                      value={simulationSpeed}
                      onChange={(e) => setSimulationSpeed(Number(e.target.value))}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      <option value={2000}>Slow (2x)</option>
                      <option value={1000}>Normal (1x)</option>
                      <option value={500}>Fast (0.5x)</option>
                      <option value={200}>Very Fast (0.2x)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulation Output */}
            <div className="lg:col-span-1">
              <div className="space-y-4">

                {/* Virtual Arduino */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Virtual Arduino</h3>
                  <div className="bg-green-800 rounded-lg p-4 text-center">
                    <div className="text-white text-sm mb-2">Pin 13 LED</div>
                    <div
                      className={`w-8 h-8 rounded-full mx-auto transition-all duration-300 ${ledState ? 'bg-yellow-400 shadow-lg shadow-yellow-400/50' : 'bg-gray-400'
                        }`}
                    />
                    <div className="text-white text-xs mt-2">
                      {ledState ? 'ON' : 'OFF'}
                    </div>
                  </div>
                </div>

                {/* Serial Monitor */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Serial Monitor</h3>
                  <div className="bg-black text-green-400 font-mono text-xs p-3 rounded h-64 overflow-y-auto">
                    {output.length === 0 ? (
                      <div className="text-gray-500">Serial output will appear here...</div>
                    ) : (
                      output.map((line, index) => (
                        <div key={index} className="mb-1">{line}</div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Lightbulb className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-bold text-blue-900">How to Use the Playground</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-blue-800">
              <div>
                <h4 className="font-medium mb-2">Getting Started:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Choose an example from the sidebar</li>
                  <li>• Modify the code in the editor</li>
                  <li>• Click "Run" to start simulation</li>
                  <li>• Watch the virtual Arduino and serial output</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Supported Features:</h4>
                <ul className="text-sm space-y-1">
                  <li>• digitalWrite() for LED control</li>
                  <li>• Serial.println() for output</li>
                  <li>• delay() for timing</li>
                  <li>• Basic setup() and loop() structure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArduinoPlaygroundPage;
