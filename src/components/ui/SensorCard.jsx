// ============================================
// COMPONENTE: SENSOR CARD (Tarjeta de Sensor Reutilizable)
// ============================================
import React from 'react';

const SensorCard = ({ title, value, unit, icon: Icon, gradient, percentage }) => {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl shadow-xl p-8 text-white`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Icon size={48} className="opacity-90" />
      </div>
      <div className="text-center my-6">
        <div className="text-6xl font-bold mb-2">
          {value}{unit}
        </div>
        <p className="text-white/90 text-lg">{title}</p>
      </div>
      <div className="bg-white/20 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-white h-full transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SensorCard;