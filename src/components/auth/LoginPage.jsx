// ============================================
// COMPONENTE: LOGIN PAGE
// ============================================
import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';
import { loginUser } from '../../services/authService';

const LoginPage = ({ onLoginSuccess, onShowRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    const result = await loginUser(username, password);

    if (result.success) {
      onLoginSuccess(username);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-700 flex items-center justify-center p-4">

      {/* Efectos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -top-48 -left-48 blur-3xl"></div>
        <div className="absolute w-96 h-96 bg-white/10 rounded-full -bottom-48 -right-48 blur-3xl"></div>
      </div>

      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <Thermometer className="text-white" size={40} />
          </div>
          <h1 className="text-3xl font-bold font-[Montserrat] bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
             SISTEMA DE DATOS 
          </h1>
          <p className="text-gray-600 mt-2">DHT22 Monitoring System</p>
          <p className="text-gray-600 mt-1 text-sm">Melanny Ariza - Carlos Florez - Ana Rocha</p>
        </div>

        {/* Formulario */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Ingresa tu usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleLogin()}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Ingresa tu contraseña"
            />
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded">
              <p className="font-semibold">{error}</p>
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-black to-blue-700 text-white py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition duration-200 font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          <div className="text-center">
            <button
              onClick={onShowRegister}
              className="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
            Regístrate aquí
            </button>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Demo: usuario: <strong>admin</strong> / contraseña: <strong>admin</strong></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;