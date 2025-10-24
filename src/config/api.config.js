// ============================================
// CONFIGURACIÓN DE API
// ============================================

export const API_CONFIG = {
  BASE_URL: 'http://localhost:3000', // Esta es la dirección de tu servidor Express
  ENDPOINTS: {
    // Autenticación
    LOGIN: '/login',
    REGISTER: '/registro_users',
    LOGOUT: '/cerrar_session',
    
    // Sensor DHT22
    SENSOR_DATA: '/send_dht',
    
    // Control de dispositivos
    LED_CONTROL: '/leds',
  }
};

// Función helper para obtener headers con autenticación
export const getAuthHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : ''
  };
};

// Función helper para manejar respuestas de la API
export const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Error en la petición');
  }
  return response.json();
};
