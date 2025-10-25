// ============================================
// APP PRINCIPAL
// ============================================
import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import RegisterPage from './components/auth/RegisterPage';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import Dashboard from './components/pages/Dashboard';
import HistoryPage from './components/pages/HistoryPage';
import { logoutUser } from './services/authService';
import { About } from './components/pages/About';

function App() {
  // Estados de autenticación y navegación
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [currentUser, setCurrentUser] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  // Función para manejar login exitoso
  const handleLoginSuccess = (username) => {
    setCurrentUser(username);
    setIsAuthenticated(true);
    setShowRegister(false);
  };

  // Función para manejar registro exitoso
  const handleRegisterSuccess = () => {
    setShowRegister(false);
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    logoutUser();
    setIsAuthenticated(false);
    setCurrentUser('');
    setCurrentPage('home');
  };

  // Renderizado condicional basado en autenticación
  if (!isAuthenticated) {
    if (showRegister) {
      return (
        <RegisterPage 
          onRegisterSuccess={handleRegisterSuccess}
          onShowLogin={() => setShowRegister(false)}
        />
      );
    }
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onShowRegister={() => setShowRegister(true)}
      />
    );
  }

  // Renderizado de la aplicación autenticada
  return (
    <div>
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      
      {/* Renderizado condicional de páginas */}
      {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard />}
      {currentPage === 'history' && <HistoryPage />}
      {currentPage === 'about' && <About />}

    </div>
  );
}

export default App;