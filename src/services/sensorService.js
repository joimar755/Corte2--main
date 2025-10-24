// ============================================
// SERVICIO DE SENSOR Y DISPOSITIVOS
// ============================================
import { API_CONFIG, getAuthHeaders, handleResponse } from '../config/api.config';

// TODO: Obtener datos actuales del sensor DHT22
export const getCurrentSensorData = async () => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENSOR_DATA}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await handleResponse(response);
    return { 
      success: true, 
      data: {
        temperature: data.temperature,
        humidity: data.humidity,
        timestamp: data.timestamp
      }
    };
    */

    // CÓDIGO TEMPORAL - REMOVER AL CONECTAR TU API
    console.log('Aquí se obtienen datos del sensor desde tu API');
    return { 
      success: false, 
      error: 'API no conectada - Conecta tu circuito DHT22' 
    };
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// TODO: Obtener historial completo desde tu base de datos
export const getSensorHistory = async (filters = {}) => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.SENSOR_HISTORY}?${queryParams}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    const data = await handleResponse(response);
    
    // Ejemplo de estructura esperada:
    // data.history = [
    //   { id: 1, timestamp: '2024-01-15 10:30:00', temperature: 25.5, humidity: 60.2 },
    //   { id: 2, timestamp: '2024-01-15 10:35:00', temperature: 25.7, humidity: 59.8 },
    //   ...
    // ]
    
    return { success: true, data: data.history };
    */

    // CÓDIGO TEMPORAL - REMOVER AL CONECTAR TU API
    console.log('Aquí se obtiene el historial desde tu base de datos');
    
    // Datos de ejemplo para visualización (REMOVER al conectar tu API)
    const ejemploHistorial = [];
    // Puedes descomentar esto si quieres ver datos de ejemplo:
    /*
    for (let i = 1; i <= 50; i++) {
      ejemploHistorial.push({
        id: i,
        timestamp: new Date(Date.now() - i * 300000).toLocaleString('es-ES'),
        temperature: (Math.random() * 10 + 20).toFixed(1),
        humidity: (Math.random() * 30 + 40).toFixed(1)
      });
    }
    */
    
    return { success: true, data: ejemploHistorial };
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// TODO: Controlar LED desde tu circuito
export const controlLED = async (ledNumber, state) => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LED_CONTROL}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        ledNumber: ledNumber,  // 1, 2, o 3
        state: state           // true o false
      })
    });

    const data = await handleResponse(response);
    return { success: true, data };
    */

    // CÓDIGO TEMPORAL - REMOVER AL CONECTAR TU API
    console.log(`Control LED ${ledNumber}: ${state ? 'ON' : 'OFF'}`);
    return { success: true, data: { ledNumber, state } };
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// TODO: Actualizar display LCD
export const updateLCD = async (line1, line2) => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.LCD_UPDATE}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        line1: line1,  // Primera línea del LCD (16 caracteres)
        line2: line2   // Segunda línea del LCD (16 caracteres)
      })
    });

    const data = await handleResponse(response);
    return { success: true, data };
    */

    // CÓDIGO TEMPORAL - REMOVER AL CONECTAR TU API
    console.log(`LCD actualizado: Línea 1: "${line1}" | Línea 2: "${line2}"`);
    return { success: true };
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};

// TODO: Enviar comando del teclado matricial
export const sendKeypadCommand = async (command) => {
  try {
    // ==== REEMPLAZAR ESTA SECCIÓN CON TU LLAMADA A LA API ====
    /*
    const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.KEYPAD_INPUT}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        command: command  // Comando del teclado (ej: "1", "A", "#", etc.)
      })
    });

    const data = await handleResponse(response);
    return { success: true, data };
    */

    // CÓDIGO TEMPORAL - REMOVER AL CONECTAR TU API
    console.log(`Comando de teclado enviado: "${command}"`);
    return { success: true, data: { command } };
    // ==== FIN DE LA SECCIÓN A REEMPLAZAR ====

  } catch (error) {
    return { success: false, error: error.message };
  }
};