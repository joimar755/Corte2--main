import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const socket = io("http://localhost:3000"); // 🔁 cambia al dominio de tu backend

export default function GridDemo() {
  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    socket.on("sensorData", (data) => {
      setDataHistory((prev) => {
        const newData = [
          ...prev,
          {
            time: new Date().toLocaleTimeString("es-ES", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            temperatura: parseFloat(data.temperatura),
            humedad: parseFloat(data.humedad),
          },
        ];
        return newData.slice(-20); // solo últimos 20 datos
      });
    });

    return () => socket.off("sensorData");
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2 text-gray-700">
        Temperatura y Humedad en tiempo real
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperatura"
            stroke="#f97316"
            strokeWidth={3}
            dot={false}
            name="Temperatura (°C)"
          />
          <Line
            type="monotone"
            dataKey="humedad"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            name="Humedad (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
