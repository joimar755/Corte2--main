// ============================================
// UTILIDADES PARA EXPORTACIÓN DE DATOS
// ============================================

// Exportar historial a CSV
export const exportToCSV = (data) => {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  const csvContent = [
    ['ID', 'Fecha/Hora', 'Temperatura (°C)', 'Humedad (%)'],
    ...data.map(item => [
      item.id,
      item.timestamp,
      item.temperature,
      item.humidity
    ])
  ].map(row => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `historial_dht22_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  window.URL.revokeObjectURL(url);
};

// Formatear fecha
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

// Calcular promedio de un campo
export const calculateAverage = (data, field) => {
  if (!data || data.length === 0) return '0.0';
  const sum = data.reduce((acc, item) => acc + parseFloat(item[field] || 0), 0);
  return (sum / data.length).toFixed(1);
};

// Calcular máximo
export const calculateMax = (data, field) => {
  if (!data || data.length === 0) return '0.0';
  const max = Math.max(...data.map(item => parseFloat(item[field] || 0)));
  return max.toFixed(1);
};

// Calcular mínimo
export const calculateMin = (data, field) => {
  if (!data || data.length === 0) return '0.0';
  const min = Math.min(...data.map(item => parseFloat(item[field] || 0)));
  return min.toFixed(1);
};