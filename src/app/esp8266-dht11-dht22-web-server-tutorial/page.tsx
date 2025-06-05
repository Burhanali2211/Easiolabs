const ESP8266DHTWebServerPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>ESP8266</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Interface DHT11 DHT22 w/ ESP8266 NodeMCU Using Web Server
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-green-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Tutorial Featured Image</span>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <p>
              Have you ever wished you could use your mobile, tablet, or computer to monitor temperature and humidity 
              readings from anywhere in your home? With the ESP8266 NodeMCU and a DHT sensor, you can create a simple 
              web server that displays real-time environmental data.
            </p>
            
            <p>
              This project combines the power of the ESP8266's WiFi capabilities with the simplicity of DHT11 or DHT22 
              sensors to create a wireless monitoring system that you can access from any device on your network.
            </p>

            <h2>Project Overview</h2>
            
            <p>
              In this tutorial, we'll create a web server that:
            </p>

            <ul>
              <li>Reads temperature and humidity from a DHT sensor</li>
              <li>Hosts a web page displaying the current readings</li>
              <li>Updates the data automatically without page refresh</li>
              <li>Can be accessed from any device on your WiFi network</li>
            </ul>

            <h2>Components Required</h2>
            
            <ul>
              <li>ESP8266 NodeMCU development board</li>
              <li>DHT11 or DHT22 temperature and humidity sensor</li>
              <li>Breadboard and jumper wires</li>
              <li>10kΩ pull-up resistor (if not built into sensor module)</li>
            </ul>

            <h2>Circuit Connections</h2>
            
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">DHT Sensor</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">ESP8266 NodeMCU</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">VCC</td>
                  <td className="border border-gray-300 px-4 py-2">3.3V</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Data</td>
                  <td className="border border-gray-300 px-4 py-2">D2 (GPIO4)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                  <td className="border border-gray-300 px-4 py-2">GND</td>
                </tr>
              </tbody>
            </table>

            <h2>Features of the Web Server</h2>
            
            <p>
              The web server we'll create includes:
            </p>

            <ul>
              <li>Clean, responsive web interface</li>
              <li>Real-time temperature and humidity display</li>
              <li>Automatic data refresh every few seconds</li>
              <li>Mobile-friendly design</li>
              <li>Error handling for sensor failures</li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ESP8266DHTWebServerPage;
