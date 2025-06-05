import React from 'react';

const ZenerDiodePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="text-sm text-gray-600">
            <span>Basic Electronics</span> → <span>Diodes</span>
          </nav>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            The Zener Diode
          </h1>

          {/* Featured Image */}
          <div className="aspect-video bg-gradient-to-br from-orange-500 to-red-600 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white text-lg">Zener Diode Circuit Diagram</span>
          </div>
        </header>

        {/* Table of Contents */}
        <div className="bg-gray-50 rounded-lg p-6 mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Table Of Contents</h2>
          <ul className="space-y-2 text-blue-600">
            <li><a href="#introduction" className="hover:underline">Introduction</a></li>
            <li><a href="#how-it-works" className="hover:underline">How Zener Diodes Work</a></li>
            <li><a href="#characteristics" className="hover:underline">Zener Diode Characteristics</a></li>
            <li><a href="#voltage-regulation" className="hover:underline">Voltage Regulation</a></li>
            <li><a href="#applications" className="hover:underline">Common Applications</a></li>
            <li><a href="#circuit-examples" className="hover:underline">Circuit Examples</a></li>
            <li><a href="#selection-guide" className="hover:underline">Selection Guide</a></li>
          </ul>
        </div>

        {/* Content */}
        <div className="tutorial-content">
          <section id="introduction" className="mb-12">
            <p>
              Ordinary silicon diodes block any current through them when they are reverse-biased.
              However, if the reverse voltage becomes too high, the diode will break down and allow
              current to flow in the reverse direction. This breakdown voltage is usually quite high
              and can damage the diode.
            </p>

            <p>
              Zener diodes are special types of diodes that are designed to operate in this breakdown
              region safely. They are manufactured to have a specific, well-defined breakdown voltage
              called the Zener voltage. This unique property makes them invaluable for voltage regulation
              and protection circuits.
            </p>

            <p>
              Named after physicist Clarence Zener who first described the electrical property known
              as Zener breakdown, these diodes have become essential components in electronic circuits
              where stable voltage references are needed.
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
              <h4 className="font-bold text-blue-900 mb-2">Key Characteristics</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Operates in reverse breakdown region</li>
                <li>• Maintains constant voltage across its terminals</li>
                <li>• Available in various voltage ratings</li>
                <li>• Used for voltage regulation and protection</li>
              </ul>
            </div>
          </section>

          <section id="how-it-works" className="mb-12">
            <h2>How Zener Diodes Work</h2>

            <p>
              A Zener diode operates differently from a regular diode. While it blocks current in
              the reverse direction like a normal diode, it is designed to conduct when the reverse
              voltage reaches its Zener voltage (Vz).
            </p>

            <h3>Forward Bias Operation</h3>
            <p>
              When forward-biased (positive voltage applied to anode), a Zener diode behaves like
              a regular diode, conducting current with a forward voltage drop of approximately 0.7V
              for silicon devices.
            </p>

            <h3>Reverse Bias Operation</h3>
            <p>
              When reverse-biased, the Zener diode blocks current until the reverse voltage reaches
              the Zener voltage. At this point, the diode enters the breakdown region and conducts
              current while maintaining a nearly constant voltage across its terminals.
            </p>

            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <h4 className="font-bold mb-2">Breakdown Mechanisms</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Zener Breakdown (Vz &lt; 5V):</strong>
                  <p>Occurs due to strong electric fields that pull electrons from their bonds.</p>
                </div>
                <div>
                  <strong>Avalanche Breakdown (Vz &gt; 5V):</strong>
                  <p>High-energy electrons collide with atoms, creating more electron-hole pairs.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="characteristics" className="mb-12">
            <h2>Zener Diode Characteristics</h2>

            <h3>Key Parameters</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Parameter</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Symbol</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Zener Voltage</td>
                  <td className="border border-gray-300 px-4 py-2">Vz</td>
                  <td className="border border-gray-300 px-4 py-2">Breakdown voltage in reverse bias</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Zener Current</td>
                  <td className="border border-gray-300 px-4 py-2">Iz</td>
                  <td className="border border-gray-300 px-4 py-2">Current through diode in breakdown</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Maximum Power</td>
                  <td className="border border-gray-300 px-4 py-2">Pz(max)</td>
                  <td className="border border-gray-300 px-4 py-2">Maximum power dissipation</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Dynamic Resistance</td>
                  <td className="border border-gray-300 px-4 py-2">rz</td>
                  <td className="border border-gray-300 px-4 py-2">Resistance in breakdown region</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Temperature Coefficient</td>
                  <td className="border border-gray-300 px-4 py-2">TC</td>
                  <td className="border border-gray-300 px-4 py-2">Voltage change with temperature</td>
                </tr>
              </tbody>
            </table>

            <h3>Voltage Ratings</h3>
            <p>Zener diodes are available in a wide range of voltage ratings:</p>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Low voltage: 2.4V to 12V (commonly used)</li>
              <li>Medium voltage: 13V to 75V</li>
              <li>High voltage: 100V to 200V (special applications)</li>
              <li>Standard values: 3.3V, 5.1V, 6.8V, 9.1V, 12V, 15V, 18V, 24V</li>
            </ul>
          </section>

          <section id="voltage-regulation" className="mb-12">
            <h2>Voltage Regulation</h2>

            <p>
              The primary application of Zener diodes is voltage regulation. A simple Zener regulator
              circuit consists of a Zener diode in parallel with the load, with a series resistor
              to limit current.
            </p>

            <h3>Basic Voltage Regulator Circuit</h3>
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <h4 className="font-bold mb-2">Circuit Components:</h4>
              <ul className="text-sm space-y-1">
                <li>• Input voltage source (Vin)</li>
                <li>• Series resistor (Rs) for current limiting</li>
                <li>• Zener diode (Dz) for voltage regulation</li>
                <li>• Load resistor (RL)</li>
              </ul>
            </div>

            <h3>Design Considerations</h3>
            <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-2">
              <li><strong>Choose Zener voltage:</strong> Select Vz equal to desired output voltage</li>
              <li><strong>Calculate series resistance:</strong> Rs = (Vin - Vz) / (Iz + IL)</li>
              <li><strong>Check power rating:</strong> Pz = Vz × Iz must be less than Pz(max)</li>
              <li><strong>Verify regulation:</strong> Ensure Zener operates in breakdown region</li>
            </ol>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6">
              <h4 className="font-bold text-yellow-900 mb-2">⚠️ Design Tips</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Maintain minimum Zener current (typically 5-10% of Iz(max))</li>
                <li>• Account for load current variations</li>
                <li>• Consider temperature effects on Zener voltage</li>
                <li>• Use heat sinks for high-power applications</li>
              </ul>
            </div>
          </section>

          <section id="applications" className="mb-12">
            <h2>Common Applications</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Voltage Regulation</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Power supply regulation</li>
                  <li>• Reference voltage generation</li>
                  <li>• Bias voltage for transistors</li>
                  <li>• Stabilizing op-amp supplies</li>
                </ul>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Protection Circuits</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Overvoltage protection</li>
                  <li>• Surge suppression</li>
                  <li>• ESD protection</li>
                  <li>• Input protection for ICs</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">Signal Processing</h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• Waveform clipping</li>
                  <li>• Level shifting</li>
                  <li>• Voltage limiting</li>
                  <li>• Peak detection</li>
                </ul>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <h4 className="font-bold text-orange-900 mb-2">Measurement</h4>
                <ul className="text-orange-800 text-sm space-y-1">
                  <li>• Voltage references</li>
                  <li>• Calibration standards</li>
                  <li>• Temperature compensation</li>
                  <li>• Precision voltage sources</li>
                </ul>
              </div>
            </div>
          </section>

          <section id="circuit-examples" className="mb-12">
            <h2>Circuit Examples</h2>

            <h3>1. Simple Voltage Regulator</h3>
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <p className="text-sm mb-2"><strong>Application:</strong> 5V regulation from 9V battery</p>
              <ul className="text-sm space-y-1">
                <li>• Input: 9V battery</li>
                <li>• Zener: 5.1V, 1W</li>
                <li>• Series resistor: 100Ω</li>
                <li>• Output: ~5.1V at up to 20mA</li>
              </ul>
            </div>

            <h3>2. Overvoltage Protection</h3>
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <p className="text-sm mb-2"><strong>Application:</strong> Protect 5V circuit from overvoltage</p>
              <ul className="text-sm space-y-1">
                <li>• Zener: 5.6V (slightly above normal operating voltage)</li>
                <li>• Connected in parallel with protected circuit</li>
                <li>• Series fuse or current-limiting resistor</li>
                <li>• Conducts only when input exceeds 5.6V</li>
              </ul>
            </div>

            <h3>3. Voltage Reference</h3>
            <div className="bg-gray-100 rounded-lg p-6 my-6">
              <p className="text-sm mb-2"><strong>Application:</strong> Stable reference for ADC or comparator</p>
              <ul className="text-sm space-y-1">
                <li>• Low-noise Zener (e.g., 2.5V precision reference)</li>
                <li>• Buffer amplifier for low output impedance</li>
                <li>• Temperature compensation if required</li>
                <li>• Provides stable voltage regardless of supply variations</li>
              </ul>
            </div>
          </section>

          <section id="selection-guide" className="mb-12">
            <h2>Selection Guide</h2>

            <h3>Choosing the Right Zener Diode</h3>
            <table className="w-full border-collapse border border-gray-300 mb-6">
              <thead>
                <tr>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Consideration</th>
                  <th className="bg-gray-50 border border-gray-300 px-4 py-2 text-left font-medium">Guidelines</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Voltage Rating</td>
                  <td className="border border-gray-300 px-4 py-2">Choose Vz equal to desired regulated voltage</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Power Rating</td>
                  <td className="border border-gray-300 px-4 py-2">Pz(max) &gt; Vz × Iz(max) with safety margin</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Tolerance</td>
                  <td className="border border-gray-300 px-4 py-2">±5% for general use, ±1% for precision</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Temperature Coefficient</td>
                  <td className="border border-gray-300 px-4 py-2">Important for temperature-sensitive applications</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2">Dynamic Resistance</td>
                  <td className="border border-gray-300 px-4 py-2">Lower rz provides better regulation</td>
                </tr>
              </tbody>
            </table>

            <h3>Common Part Numbers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2">Low Power (0.5W)</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• 1N4728A (3.3V)</li>
                  <li>• 1N4733A (5.1V)</li>
                  <li>• 1N4742A (12V)</li>
                </ul>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-900 mb-2">Medium Power (1W)</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• 1N4748A (22V)</li>
                  <li>• 1N5221B (2.4V)</li>
                  <li>• 1N5231B (5.1V)</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-bold text-purple-900 mb-2">High Power (5W)</h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• 1N5333B (3.3V)</li>
                  <li>• 1N5338B (5.1V)</li>
                  <li>• 1N5347B (10V)</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
};

export default ZenerDiodePage;
