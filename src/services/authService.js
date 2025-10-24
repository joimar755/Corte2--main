// ============================================
// SERVICIO DE AUTENTICACIÓN
// ============================================
import { API_CONFIG, handleResponse } from '../config/api.config';

// Función de Login - Conectar con tu API
export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    });

    const data = await handleResponse(response);
    
    // Guardar token de autenticación
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }
    
    // El backend devuelve solo el token, guardamos el username del formulario
    localStorage.setItem('user', JSON.stringify({ username }));
    
    return { success: true, data };

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Función de Registro - Conectar con tu API
export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // El backend espera `email` en el cuerpo de la petición
      body: JSON.stringify({
        username: userData.username,
        email: userData.email,
        password: userData.password
      })
    });

    const data = await handleResponse(response);
    return { success: true, data };

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Función para cerrar sesión
export const logoutUser = () => {
  // Limpiar datos del localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  
  // Nota: La ruta '/cerrar_session' en tu backend está vacía.
  // Por ahora, solo se limpiará el almacenamiento local del navegador.
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token !== null;
};

// Función para obtener el usuario actual
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};
