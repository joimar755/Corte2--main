// ============================================
// COMPONENTE: HOME PAGE
// ============================================
import React from 'react';
import { Thermometer, Droplets, Lightbulb, Monitor, Grid3x3 } from 'lucide-react';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-2xl p-12 mb-8 text-white">
          <h1 className="text-5xl font-bold mb-4">Sistema de Monitoreo DHT22</h1>
          <p className="text-xl text-white/90 mb-6">
            Controla y monitorea tu sensor DHT22 y LEDs en tiempo real
          </p>
          <button
            onClick={() => setCurrentPage('dashboard')}
            className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition"
          >
            Ir al Dashboard
          </button>
        </div>

        {/* Tarjetas de características */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-orange-400 to-red-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Thermometer className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Temperatura</h3>
            <p className="text-gray-600">Monitoreo en tiempo real con gráficas históricas</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Droplets className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Humedad</h3>
            <p className="text-gray-600">Control de humedad relativa del ambiente</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Lightbulb className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Control LEDs</h3>
            <p className="text-gray-600">3 LEDs controlables desde la interfaz</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
            <div className="bg-gradient-to-br from-purple-400 to-pink-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Monitor className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">LCD Display</h3>
            <p className="text-gray-600">Visualización de datos en pantalla LCD</p>
          </div>
        </div>

        {/* Componentes del sistema */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Componentes del Sistema</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Thermometer className="text-indigo-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Sensor DHT22</h4>
                <p className="text-gray-600 text-sm">Medición precisa de temperatura y humedad</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Lightbulb className="text-yellow-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">3 LEDs</h4>
                <p className="text-gray-600 text-sm">Indicadores visuales controlables</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Grid3x3 className="text-purple-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Teclado Matricial</h4>
                <p className="text-gray-600 text-sm">Entrada de datos y control manual</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Monitor className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800">LCD 16x2</h4>
                <p className="text-gray-600 text-sm">Pantalla de visualización local</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;