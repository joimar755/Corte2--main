// ============================================
// COMPONENTE: DASHBOARD
// ============================================
import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Activity } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { getCurrentSensorData, controlLED } from '../../services/sensorService';
import SensorCard from '../ui/SensorCard';
import LEDControl from '../ui/LEDControl';
import LCDDisplay from '../ui/LCDDisplay';
import KeypadMatricial from '../ui/KeypadMatricial';
import { io } from "socket.io-client";
import LineChartTempHum from './LineChartTempHum';
import GridDemo from './GridDemo';
import SensorCards from './SensorCards';
import DHTBarChart from './DHTBarChart';

const socket = io("http://192.168.1.6:3000");
const Dashboard = () => {
  // Estados para datos del sensor
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [data, setData] = useState({ temperatura: 0, humedad: 0 });

  
  // Estados para LEDs
  const [leds, setLeds] = useState({
    led1: false,
    led2: false,
    led3: false
  });
  
  // Estado para historial de gráficas
  const [dataHistory, setDataHistory] = useState([]);
  
  // Estados para LCD
  const [lcdLine1, setLcdLine1] = useState('DHT22 Sensor');
  const [lcdLine2, setLcdLine2] = useState('Iniciando...');
  const [lcdMode, setLcdMode] = useState('menu');
  
  // Estado para teclado
  const [keypadInput, setKeypadInput] = useState('');

  // TODO: Función para obtener datos del sensor
  const fetchSensorData = async () => {
    const result = await getCurrentSensorData();
    
    if (result.success) {
      setTemperature(result.data.temperature);
      setHumidity(result.data.humidity);
      setLastUpdate(new Date());
      
      // Actualizar historial
      setDataHistory(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString('es-ES', { 
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit' 
          }),
          temperatura: parseFloat(result.data.temperature),
          humedad: parseFloat(result.data.humidity)
        }];
        return newData.slice(-20);
      });
    }
  };
  useEffect(() => {
  socket.on("sensorData", (payload) => {
    console.log("Datos recibidos:", payload);
    setDataHistory(prev => {
      const newData = [...prev, {
        time: new Date().toLocaleTimeString('es-ES', { 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        }),
        temperatura: parseFloat(payload.temperatura),
        humedad: parseFloat(payload.humedad)
      }];
      return newData.slice(-20);
    });
  });

  return () => socket.off("sensorData");
}, []);

  // TODO: Función para controlar LEDs
  const handleToggleLED = async (ledNumber) => {
    const newState = !leds[`led${ledNumber}`];
    const result = await controlLED(ledNumber, newState);
    
    if (result.success) {
      setLeds(prev => ({
        ...prev,
        [`led${ledNumber}`]: newState
      }));
    }
  };

  // Función para actualizar LCD
  const updateLCDDisplay = (mode, temp, hum) => {
    switch(mode) {
      case 'menu':
        setLcdLine1('MENU PRINCIPAL');
        setLcdLine2('Presiona 1-5');
        break;
      case 'temp':
        setLcdLine1('TEMPERATURA');
        setLcdLine2(`${temp} C`);
        break;
      case 'hum':
        setLcdLine1('HUMEDAD');
        setLcdLine2(`${hum} %`);
        break;
      case 'both':
        setLcdLine1(`Temp: ${temp}C`);
        setLcdLine2(`Hum: ${hum}%`);
        break;
      case 'leds':
        setLcdLine1('ESTADO LEDs');
        setLcdLine2(`R:${leds.led1?'ON':'OFF'} G:${leds.led2?'ON':'OFF'} B:${leds.led3?'ON':'OFF'}`);
        break;
      case 'time':
        const now = new Date();
        setLcdLine1('HORA ACTUAL');
        setLcdLine2(now.toLocaleTimeString('es-ES'));
        break;
      default:
        setLcdLine1('DHT22 Sensor');
        setLcdLine2('Sistema OK');
    }
  };

  // Función para manejar teclado
  /* const handleKeypadClick = (key) => {
    if (key === 'C') {
      setKeypadInput('');
      setLcdLine1('ENTRADA');
      setLcdLine2('BORRADA');
      setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 1000);
    } else if (key === '#') {
      processKeypadCommand(keypadInput);
      setKeypadInput('');
    } else {
      setKeypadInput(prev => {
        const newInput = prev + key;
        setLcdLine1('ENTRADA:');
        setLcdLine2(newInput);
        return newInput;
      });
    }
  };
 */
  // Procesar comandos del teclado
  /* const processKeypadCommand = (command) => {
    switch(command) {
      case '1':
        setLcdMode('temp');
        updateLCDDisplay('temp', temperature, humidity);
        break;
      case '2':
        setLcdMode('hum');
        updateLCDDisplay('hum', temperature, humidity);
        break;
      case '3':
        setLcdMode('both');
        updateLCDDisplay('both', temperature, humidity);
        break;
      case '4':
        setLcdMode('leds');
        updateLCDDisplay('leds', temperature, humidity);
        break;
      case '5':
        setLcdMode('time');
        updateLCDDisplay('time', temperature, humidity);
        break;
      case '0':
        setLcdMode('menu');
        updateLCDDisplay('menu', temperature, humidity);
        break;
      case 'A':
        handleToggleLED(1);
        setLcdLine1('LED 1 ROJO');
        setLcdLine2('TOGGLE');
        setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
        break;
      case 'B':
        handleToggleLED(2);
        setLcdLine1('LED 2 VERDE');
        setLcdLine2('TOGGLE');
        setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
        break;
      case 'C':
        handleToggleLED(3);
        setLcdLine1('LED 3 AZUL');
        setLcdLine2('TOGGLE');
        setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
        break;
      case 'D':
        setLeds({ led1: false, led2: false, led3: false });
        setLcdLine1('TODOS LOS LEDs');
        setLcdLine2('APAGADOS');
        setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
        break;
      default:
        setLcdLine1('COMANDO');
        setLcdLine2('NO VALIDO');
        setTimeout(() => updateLCDDisplay(lcdMode, temperature, humidity), 2000);
    }
  }; */

  // useEffect para polling de datos
  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 5000); // Cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  // useEffect para actualizar LCD
  useEffect(() => {
    updateLCDDisplay(lcdMode, temperature, humidity);
  }, [lcdMode]);

   useEffect(() => {
    // Escucha los datos enviados desde el backend
    socket.on("sensorData", (payload) => {
      console.log("Datos recibidos:", payload);
      setData(payload);
    });

    // Limpieza al desmontar el componente
    return () => {
      socket.off("sensorData");
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Monitoreo en Tiempo Real</h1>
              <p className="text-gray-600">Última actualización: {lastUpdate.toLocaleTimeString('es-ES')}</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-600 font-semibold">En línea</span>
            </div>
          </div>
        </div>

        {/* Tarjetas de sensores */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <SensorCard
            title="Temperatura"
            value={data.temperatura}
            unit="°C"
            icon={Thermometer}
            gradient="from-amber-950 to-red-500"
          />
          <SensorCard
            title="Humedad"
            value={data.humedad}
            unit="%"
            icon={Droplets}
            gradient="from-blue-200 to-cyan-500"
          />
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Gráfica Temperatura */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2 text-orange-500" />
              Historial de Temperatura
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dataHistory}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="temperatura" stroke="#f97316" fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfica Humedad */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Activity className="mr-2 text-blue-500" />
              Historial de Humedad
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dataHistory}>
                <defs>
                  <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2b6313ff" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#b2b20fff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="humedad" stroke="#3b82f6" fillOpacity={1} fill="url(#colorHum)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Controles */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <LEDControl leds={leds} onToggle={handleToggleLED} />
          <GridDemo />
          <SensorCards />
          <DHTBarChart />
          {/* <LCDDisplay line1={lcdLine1} line2={lcdLine2} /> */}
          {/* <KeypadMatricial input={keypadInput} onKeyPress={handleKeypadClick} /> */}
          <LineChartTempHum />
        </div>

        {/* Información técnica */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Especificaciones DHT22</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Rango Temperatura:</span>
                <span className="text-orange-600 font-bold">-40°C a 80°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Precisión Temp:</span>
                <span className="text-orange-600 font-bold">±0.5°C</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Rango Humedad:</span>
                <span className="text-blue-600 font-bold">0-100% RH</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-semibold">Precisión Humedad:</span>
                <span className="text-blue-600 font-bold">±2-5% RH</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Estado del Sistema</h2>
            <div className="space-y-3">
              {['Sensor DHT22', 'Transmisión datos', 'LEDs', 'Display LCD'].map((item) => (
                <div key={item} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-semibold text-gray-700">{item}</span>
                  </div>
                  <span className="text-green-600 font-bold">Operativo</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;