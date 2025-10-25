import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Lightbulb } from "lucide-react";

const socket = io("http://192.168.1.6:3000"); // ⚡ Ajusta la IP del servidor

const getToken = () => localStorage.getItem("authToken");

const LEDControl = () => {
  const [leds, setLeds] = useState({ led1: false, led2: false, led3: false });

  useEffect(() => {
    socket.on("control", (data) => {
      console.log("📡 Estado recibido:", data);
      setLeds(data);
    });

    return () => socket.off("control");
  }, []);

  const handleToggle = async (ledId) => {
    const newState = { ...leds, [`led${ledId}`]: !leds[`led${ledId}`] };
    setLeds(newState);

    const token = getToken();
    try {
      await fetch("http://192.168.1.6:3000/leds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newState),
      });
    } catch (err) {
      console.error("❌ Error enviando datos:", err);
    }
  };

  const ledConfig = [
    { id: 1, name: "LED 1 (Rojo)", color: "red" },
    { id: 2, name: "LED 2 (Verde)", color: "green" },
    { id: 3, name: "LED 3 (Azul)", color: "blue" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <Lightbulb className="mr-2 text-yellow-500" />
        Control de LEDs
      </h2>

      <div className="space-y-4">
        {ledConfig.map((led) => {
          const isOn = leds[`led${led.id}`];
          const colorClass = isOn ? `bg-${led.color}-500` : "bg-gray-300";

          return (
            <div
              key={led.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full ${colorClass}`}></div>
                <span className="font-semibold text-gray-700">{led.name}</span>
              </div>
              <button
                onClick={() => handleToggle(led.id)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  isOn
                    ? `${colorClass} text-white hover:opacity-90`
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
              >
                {isOn ? "ON" : "OFF"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LEDControl;
