// ============================================
// COMPONENTE: LCD DISPLAY
// ============================================
import React from 'react';
import { Monitor } from 'lucide-react';

const LCDDisplay = ({ line1, line2 }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Monitor className="mr-2 text-green-500" />
        Display LCD 16x2
      </h2>
      <div className="bg-green-900 p-6 rounded-lg font-mono">
        <div className="bg-green-400 text-green-900 p-4 rounded text-xl font-bold mb-2 tracking-wider">
          {line1.padEnd(16, ' ')}
        </div>
        <div className="bg-green-400 text-green-900 p-4 rounded text-xl font-bold tracking-wider">
          {line2.padEnd(16, ' ')}
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-4">
        El LCD muestra los valores actuales del circuito
      </p>
    </div>
  );
};

export default LCDDisplay;