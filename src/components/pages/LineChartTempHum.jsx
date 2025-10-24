import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.6:3000"); // tu servidor Socket.IO

const LineChartTempHum = () => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);
  const [dataTemp, setDataTemp] = useState([]);
  const [dataHum, setDataHum] = useState([]);
  const [labels, setLabels] = useState([]);

  // Configuración base del gráfico
  const options = {
    chart: {
      type: "line",
      height: 350,
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: { speed: 1000 },
      },
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    stroke: {
      width: 4,
      curve: "smooth",
    },
    series: [
      {
        name: "Temperatura (°C)",
        data: dataTemp,
        color: "#f97316",
      },
      {
        name: "Humedad (%)",
        data: dataHum,
        color: "#3b82f6",
      },
    ],
    xaxis: {
      categories: labels,
      labels: {
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: "text-xs font-normal fill-gray-500",
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        style: { fontFamily: "Inter, sans-serif" },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      labels: {
        colors: "#333",
      },
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: { left: 10, right: 10, top: 10, bottom: 10 },
    },
  };

  // Iniciar gráfico al montar
  useEffect(() => {
    if (chartRef.current && !chart) {
      const newChart = new ApexCharts(chartRef.current, options);
      newChart.render();
      setChart(newChart);
    }
  }, []);

  // Actualizar gráfico en tiempo real desde Socket.IO
  useEffect(() => {
    socket.on("sensorData", (payload) => {
      const time = new Date().toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      setDataTemp((prev) => {
        const updated = [...prev, parseFloat(payload.temperatura)].slice(-20);
        if (chart) chart.updateSeries([{ name: "Temperatura (°C)", data: updated }, { name: "Humedad (%)", data: dataHum }]);
        return updated;
      });

      setDataHum((prev) => {
        const updated = [...prev, parseFloat(payload.humedad)].slice(-20);
        if (chart) chart.updateSeries([{ name: "Temperatura (°C)", data: dataTemp }, { name: "Humedad (%)", data: updated }]);
        return updated;
      });

      setLabels((prev) => {
        const updated = [...prev, time].slice(-20);
        if (chart) chart.updateOptions({ xaxis: { categories: updated } });
        return updated;
      });
    });

    return () => {
      socket.off("sensorData");
    };
  }, [chart, dataTemp, dataHum]);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Comparación Temperatura vs Humedad
      </h2>
      <div id="line-chart" ref={chartRef}></div>
    </div>
  );
};

export default LineChartTempHum;
