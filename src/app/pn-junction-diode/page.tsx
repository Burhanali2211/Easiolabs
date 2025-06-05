const PNJunctionDiodePage = () => {
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
            PN Junction Diode
          </h1>
          
          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Tutorial Featured Image</span>
          </div>
        </header>

        {/* Content */}
        <div className="tutorial-content">
          <section className="mb-12">
            <p>
              A piece of n-type semiconductor or p-type semiconductor is like a resistor with a very high resistance. 
              However, when you join a piece of n-type and p-type semiconductor together, something interesting happens 
              at the junction—you get a PN junction diode.
            </p>
            
            <p>
              The PN junction diode is one of the most fundamental components in electronics. Understanding how it works 
              is essential for grasping more complex semiconductor devices like transistors and integrated circuits.
            </p>

            <h2>Formation of the PN Junction</h2>
            
            <p>
              When p-type and n-type semiconductors are joined together, electrons from the n-side diffuse to the p-side, 
              and holes from the p-side diffuse to the n-side. This creates a region called the depletion zone where 
              there are no free charge carriers.
            </p>

            <p>
              The movement of charges creates an electric field across the junction, which opposes further diffusion. 
              This electric field creates a potential barrier that must be overcome for current to flow.
            </p>

            <h2>Forward Bias Operation</h2>
            
            <p>
              When the positive terminal of a battery is connected to the p-side and the negative terminal to the n-side, 
              the diode is said to be forward-biased:
            </p>

            <ul>
              <li>The external voltage opposes the internal electric field</li>
              <li>The depletion zone becomes narrower</li>
              <li>Current flows easily through the diode</li>
              <li>The diode acts like a closed switch</li>
            </ul>

            <h2>Reverse Bias Operation</h2>
            
            <p>
              When the positive terminal is connected to the n-side and negative to the p-side, the diode is reverse-biased:
            </p>

            <ul>
              <li>The external voltage reinforces the internal electric field</li>
              <li>The depletion zone becomes wider</li>
              <li>Very little current flows (only leakage current)</li>
              <li>The diode acts like an open switch</li>
            </ul>

            <h2>Key Characteristics</h2>

            <h3>Forward Voltage Drop</h3>
            <p>
              For silicon diodes, the forward voltage drop is approximately 0.7V. For germanium diodes, it's about 0.3V. 
              This voltage must be exceeded for significant current to flow.
            </p>

            <h3>Reverse Breakdown Voltage</h3>
            <p>
              If the reverse voltage exceeds a certain limit (breakdown voltage), the diode will conduct heavily in 
              the reverse direction. This can damage the diode unless it's designed for this operation (like Zener diodes).
            </p>

            <h2>Applications of PN Junction Diodes</h2>
            
            <ul>
              <li><strong>Rectification:</strong> Converting AC to DC</li>
              <li><strong>Voltage Regulation:</strong> Using Zener diodes</li>
              <li><strong>Signal Demodulation:</strong> Extracting information from modulated signals</li>
              <li><strong>Protection:</strong> Preventing reverse current flow</li>
              <li><strong>Switching:</strong> Fast on/off operations</li>
              <li><strong>Light Emission:</strong> LEDs (Light Emitting Diodes)</li>
            </ul>

            <h2>Types of Diodes</h2>
            
            <p>
              Based on the PN junction principle, many specialized diodes have been developed:
            </p>

            <ul>
              <li><strong>Zener Diodes:</strong> For voltage regulation</li>
              <li><strong>Schottky Diodes:</strong> For high-frequency applications</li>
              <li><strong>LEDs:</strong> For light emission</li>
              <li><strong>Photodiodes:</strong> For light detection</li>
              <li><strong>Varactor Diodes:</strong> For voltage-controlled capacitance</li>
            </ul>
          </section>
        </div>
      </article>
    </div>
  );
};

export default PNJunctionDiodePage;
