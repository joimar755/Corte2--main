import React from 'react';
import { Thermometer, Home, Activity, History, User, LogOut } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, currentUser, onLogout }) => {
  return (
    <nav className="bg-white shadow-lg border-b-2 border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Thermometer className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              DHT22 Monitor
            </span>
          </div>

          {/* Navegación */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-medium ${
                currentPage === 'home' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Home size={20} />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-medium ${
                currentPage === 'dashboard' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Activity size={20} />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentPage('history')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition font-medium ${
                currentPage === 'history' 
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <History size={20} />
              <span>Historial</span>
            </button>

            {/* Usuario y Logout */}
            <div className="flex items-center space-x-3 border-l-2 border-gray-200 pl-4 ml-2">
              <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
                <User size={18} className="text-indigo-600" />
                <span className="text-gray-700 font-medium">{currentUser}</span>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
              >
                <LogOut size={18} />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;