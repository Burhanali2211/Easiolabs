const HalfWaveRectifierPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Basic Electronics</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Half-Wave Rectifier
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Tutorial Featured Image</span>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <p>
              Most electronic systems, like TVs, audio systems, and computers, need DC (Direct Current) power to operate. 
              However, the electricity that comes from wall outlets is AC (Alternating Current). This is where rectifier 
              circuits come in handy—they convert AC voltage into DC voltage.
            </p>
            
            <p>
              The half-wave rectifier is the simplest type of rectifier circuit. While it's not the most efficient, 
              understanding how it works is fundamental to grasping more complex rectifier designs.
            </p>

            <h2>How a Half-Wave Rectifier Works</h2>
            
            <p>
              A half-wave rectifier uses a single diode to convert AC to DC. The diode acts like a one-way valve for 
              electrical current—it allows current to flow in one direction but blocks it in the opposite direction.
            </p>

            <p>
              During the positive half-cycle of the AC input:
            </p>

            <ul>
              <li>The diode is forward-biased (turned on)</li>
              <li>Current flows through the diode to the load</li>
              <li>The output voltage follows the input voltage</li>
            </ul>

            <p>
              During the negative half-cycle of the AC input:
            </p>

            <ul>
              <li>The diode is reverse-biased (turned off)</li>
              <li>No current flows through the circuit</li>
              <li>The output voltage is zero</li>
            </ul>

            <h2>Circuit Components</h2>
            
            <p>A basic half-wave rectifier consists of:</p>

            <ul>
              <li><strong>AC Source:</strong> Provides the alternating current input</li>
              <li><strong>Transformer:</strong> Steps down the AC voltage to desired level</li>
              <li><strong>Diode:</strong> Allows current flow in only one direction</li>
              <li><strong>Load Resistor:</strong> Represents the circuit being powered</li>
            </ul>

            <h2>Advantages and Disadvantages</h2>

            <h3>Advantages:</h3>
            <ul>
              <li>Simple circuit design</li>
              <li>Low cost (only one diode required)</li>
              <li>Easy to understand and implement</li>
            </ul>

            <h3>Disadvantages:</h3>
            <ul>
              <li>Low efficiency (only 40.6%)</li>
              <li>High ripple factor</li>
              <li>Poor transformer utilization</li>
              <li>High harmonic content</li>
            </ul>

            <h2>Applications</h2>
            
            <p>
              Half-wave rectifiers are typically used in:
            </p>

            <ul>
              <li>Low-power applications</li>
              <li>Simple DC power supplies</li>
              <li>Battery chargers for small devices</li>
              <li>Educational demonstrations</li>
            </ul>

            <p>
              While half-wave rectifiers are simple and inexpensive, their poor efficiency makes them unsuitable for 
              most practical applications. For better performance, full-wave rectifiers are preferred in most commercial 
              and industrial applications.
            </p>
          </section>
        </div>
      </article>
    </div>
  );
};

export default HalfWaveRectifierPage;
