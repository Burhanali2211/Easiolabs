const WLEDTutorialPage = () => {
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
            Control WS2812B Addressable LEDs with ESP8266 and WLED
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Tutorial Featured Image</span>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <p>
              Whether you call them individually addressable RGB LEDs, WS2812B, or NeoPixels, these colorful lights 
              have become incredibly popular for DIY projects. When combined with the ESP8266 microcontroller and 
              WLED firmware, you can create stunning lighting effects that can be controlled wirelessly.
            </p>
            
            <p>
              WLED is an open-source firmware that turns your ESP8266 into a powerful LED controller with a web interface, 
              mobile app support, and integration with home automation systems like Home Assistant.
            </p>

            <h2>What You'll Need</h2>
            
            <ul>
              <li>ESP8266 development board (NodeMCU, Wemos D1 Mini, etc.)</li>
              <li>WS2812B LED strip or individual LEDs</li>
              <li>5V power supply (for longer LED strips)</li>
              <li>Jumper wires</li>
              <li>Breadboard (optional)</li>
            </ul>

            <h2>Wiring the WS2812B LEDs</h2>
            
            <p>
              The wiring is straightforward. Connect the data pin of your LED strip to GPIO2 (D4) on your ESP8266, 
              VCC to 5V (or 3.3V for shorter strips), and GND to ground.
            </p>

            <h2>Installing WLED Firmware</h2>
            
            <p>
              The easiest way to install WLED is through the web installer at install.wled.me. Simply connect your 
              ESP8266 to your computer via USB and follow the installation steps in your web browser.
            </p>

            <h2>Configuration and Effects</h2>
            
            <p>
              Once WLED is installed, you can access the web interface by connecting to the ESP8266's WiFi hotspot 
              or through your local network. The interface allows you to:
            </p>

            <ul>
              <li>Choose from dozens of built-in effects</li>
              <li>Adjust colors, brightness, and speed</li>
              <li>Create custom palettes</li>
              <li>Set up schedules and timers</li>
              <li>Sync multiple WLED devices</li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
};

export default WLEDTutorialPage;
