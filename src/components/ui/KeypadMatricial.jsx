// ============================================
// COMPONENTE: KEYPAD MATRICIAL
// ============================================
import React from 'react';
import { Grid3x3 } from 'lucide-react';

const KeypadMatricial = ({ input, onKeyPress }) => {
  const keys = ['1', '2', '3', 'A', '4', '5', '6', 'B', '7', '8', '9', 'C', '*', '0', '#', 'D'];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Grid3x3 className="mr-2 text-purple-500" />
        Teclado Matricial 4x4
      </h2>
      
      {/* Display de entrada */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4 h-16 flex items-center justify-end">
        <span className="text-green-400 font-mono text-2xl">
          {input || '_ _ _ _'}
        </span>
      </div>

      {/* Teclado */}
      <div className="grid grid-cols-4 gap-2">
        {keys.map((key) => (
          <button
            key={key}
            onClick={() => onKeyPress(key)}
            className="bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold text-xl py-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition"
          >
            {key}
          </button>
        ))}
      </div>
      
      {/* Menú de comandos */}
      <div className="mt-4 bg-purple-50 p-4 rounded-lg">
        <h3 className="font-bold text-purple-900 mb-2 text-sm">📋 Comandos:</h3>
        <div className="text-xs text-purple-800 space-y-1">
          <p><strong>1</strong>+# = Temp | <strong>2</strong>+# = Hum | <strong>3</strong>+# = Ambos</p>
          <p><strong>4</strong>+# = LEDs | <strong>5</strong>+# = Hora | <strong>0</strong>+# = Menú</p>
          <p><strong>A/B/C</strong>+# = LED On | <strong>D</strong>+# = Todos Off</p>
        </div>
      </div>
    </div>
  );
};

export default KeypadMatricial;