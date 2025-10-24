import  { useState, useEffect } from "react";
import { History, Thermometer, Droplets, Activity } from "lucide-react";
import { getSensorHistory } from "../../services/sensorService";
import { exportToCSV, calculateAverage } from "../../utils/exportUtils";
import axios from "axios";
import PDFButton from './PDFButton';
import generatePDF from './generatePDF'
const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterDate, setFilterDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // TODO: Cargar historial desde la base de datos
  const fetchHistory = async () => {
    
    setIsLoading(true);
    const result = await getSensorHistory({ date: filterDate });

    if (result.success) {
      setHistoryData(result.data);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, []);
  //reporte pdf
  const [data, setData] = useState([]);


    useEffect(() => {
        const obtener = async () => {
            const url = await axios.post("http://192.168.1.6:3000/dht/pdf");
            const data = url;
            setData(data.data);
          };
        obtener();
    }, []);
   
     console.log(data);

  useEffect(() => {
    const obtener = async () => {
      const url = await axios.post("http://192.168.1.6:3000/dht/pdf");
      const data = url;
      setData(data.data);
    };
    obtener();
  }, []);

  console.log(data);

  // Filtrar datos
  const filteredData = filterDate
    ? historyData.filter((item) => item.timestamp.startsWith(filterDate))
    : historyData;

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
                <History className="mr-3 text-indigo-600" size={36} />
                Historial de Mediciones
              </h1>
              <p className="text-gray-600">
                Registro completo de temperatura y humedad
              </p>
            </div>
            <button
              onClick={() => exportToCSV(filteredData)}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition font-semibold"
            >
              📥 Exportar CSV
            </button>
            <PDFButton onDownload={() => generatePDF(data.data)} />
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filtrar por fecha
              </label>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => {
                  setFilterDate(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilterDate("");
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold transition"
              >
                Limpiar Filtros
              </button>
            </div>
            <div className="flex items-end">
              <button
                onClick={fetchHistory}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                🔄 Actualizar
              </button>
            </div>
          </div>
        </div>

        {/* Tabla */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">ID</th>
                  <th className="px-6 py-4 text-left font-bold">
                    Fecha y Hora
                  </th>
                  <th className="px-6 py-4 text-center font-bold">
                    Temperatura (°C)
                  </th>
                  <th className="px-6 py-4 text-center font-bold">
                    Humedad (%)
                  </th>
                  <th className="px-6 py-4 text-center font-bold">Estado</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
                        <div
                          className="w-4 h-4 bg-purple-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-4 h-4 bg-pink-600 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                      <p className="mt-4 font-semibold">Cargando datos...</p>
                    </td>
                  </tr>
                ) : currentItems.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <History
                        size={48}
                        className="mx-auto mb-4 text-gray-300"
                      />
                      <p className="font-semibold text-lg">
                        No hay datos disponibles
                      </p>
                      <p className="text-sm mt-2">
                        Los datos se mostrarán aquí una vez que tu circuito
                        comience a enviar información
                      </p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr
                      key={item.id || index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 font-semibold text-gray-700">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-bold">
                          <Thermometer size={16} />
                          <span>{item.temperature}°C</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-bold">
                          <Droplets size={16} />
                          <span>{item.humidity}%</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center space-x-1 bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold text-sm">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>OK</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {!isLoading && currentItems.length > 0 && (
            <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-200">
              <div className="text-sm text-gray-600">
                Mostrando {indexOfFirstItem + 1} a{" "}
                {Math.min(indexOfLastItem, filteredData.length)} de{" "}
                {filteredData.length} registros
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                >
                  Anterior
                </button>
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-lg font-semibold transition ${
                        currentPage === i + 1
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Estadísticas */}
        {!isLoading && filteredData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Activity className="text-indigo-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-700">Total Registros</h3>
              </div>
              <p className="text-3xl font-bold text-indigo-600">
                {filteredData.length}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Thermometer className="text-orange-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-700">Temp. Promedio</h3>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {calculateAverage(filteredData, "temperature")}°C
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Droplets className="text-blue-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-700">Hum. Promedio</h3>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {calculateAverage(filteredData, "humidity")}%
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-2">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Activity className="text-green-600" size={24} />
                </div>
                <h3 className="font-bold text-gray-700">Estado</h3>
              </div>
              <p className="text-2xl font-bold text-green-600 flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Operativo
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
