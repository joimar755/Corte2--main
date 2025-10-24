import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const generatePDF = (data) => {
    console.log("Datos recibidos en generatePDF:", data); // Asegúrate de que es un array
  
    if (!Array.isArray(data)) {
      console.error("Se esperaba un array, pero se recibió:", typeof data);
      return; // Evita continuar si 'data' no es un array
    }
  
    const doc = new jsPDF();
    doc.text("Reporte DHT22", 14, 15);
  
    autoTable(doc, {
      startY: 20,
      head: [['Temperatura', 'Humedad', 'Usuario', 'Fecha']],
      body: data.map(b => [
        b.TEMPERATURA,
        b.HUMEDAD,
        b.NOMBRE_USUARIO,
        b.FECHA
      ])
    });
  
    doc.save('reporte_bombillos.pdf');
  };
  
  export default generatePDF;
  