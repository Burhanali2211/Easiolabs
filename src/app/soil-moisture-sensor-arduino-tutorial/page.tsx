import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SoilMoistureTutorialPage = () => {
  const arduinoCode = `// Soil Moisture Sensor with Arduino
#define SENSOR_PIN A0
#define POWER_PIN 7

void setup() {
  Serial.begin(9600);
  pinMode(POWER_PIN, OUTPUT);
  digitalWrite(POWER_PIN, LOW);
}

void loop() {
  digitalWrite(POWER_PIN, HIGH);
  delay(10);
  
  int value = analogRead(SENSOR_PIN);
  digitalWrite(POWER_PIN, LOW);
  
  Serial.print("Soil Moisture Value: ");
  Serial.println(value);
  
  if (value < 300) {
    Serial.println("Status: Dry soil");
  } else if (value < 700) {
    Serial.println("Status: Humid soil");
  } else {
    Serial.println("Status: Water detected");
  }
  
  delay(1000);
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
            How Soil Moisture Sensor Works and Interface it with Arduino
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-green-500 to-blue-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Tutorial Featured Image</span>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <p>
              When you hear the term "smart garden," one of the first things that comes to mind is automated watering 
              based on soil moisture levels. The soil moisture sensor is a simple yet powerful tool that can help you 
              monitor the water content in soil, making it perfect for automated irrigation systems, plant monitoring, 
              and agricultural applications.
            </p>
            
            <p>
              In this tutorial, we'll explore how soil moisture sensors work, how to connect them to an Arduino, 
              and how to create a simple monitoring system that can help you keep your plants healthy.
            </p>

            <h2>How Soil Moisture Sensors Work</h2>
            
            <p>
              Soil moisture sensors work by measuring the electrical conductivity between two probes. When the soil 
              is dry, there's very little conductivity between the probes, resulting in a high resistance reading. 
              As moisture increases, the conductivity increases and resistance decreases.
            </p>

            <h2>Arduino Code Example</h2>
            
            <p>
              Here's a simple Arduino sketch that reads soil moisture values and provides feedback about the soil condition:
            </p>
            
            <SyntaxHighlighter language="cpp" style={tomorrow} className="rounded-lg">
              {arduinoCode}
            </SyntaxHighlighter>

            <p>
              This code reads the analog value from the sensor and categorizes the soil condition into three states: 
              dry, humid, or water detected. You can adjust the threshold values based on your specific sensor and soil type.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default SoilMoistureTutorialPage;
