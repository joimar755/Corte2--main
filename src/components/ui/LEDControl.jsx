import React, { useState } from "react";
import { Lightbulb } from "lucide-react";

// 🔐 Función para obtener el token JWT desde localStorage
const getToken = () => localStorage.getItem("authToken");

const LEDControl = () => {
  const [leds, setLeds] = useState({
    led1: false,
    led2: false,
    led3: false,
  });

  const handleToggle = async (ledId) => {
    const newState = {
      ...leds,
      [`led${ledId}`]: !leds[`led${ledId}`],
    };
    setLeds(newState);

    // 🔐 Obtener token con la función centralizada
    const token = getToken();
    
    try {
      const response = await fetch("http://192.168.1.6:3000/leds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // ✅ Autenticación
        },
        body: JSON.stringify(newState),
      });

      // Analizar la respuesta
      const result = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          console.warn("⛔ Token inválido o expirado.");
          alert("Tu sesión expiró, inicia sesión nuevamente.");
        }
        throw new Error(result.error || "Error en la solicitud");
      }

      console.log("💡 Estado actualizado en servidor:", result);
    } catch (error) {
      console.error("❌ Error al enviar datos al backend:", error);
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
          const shadowClass = isOn ? `shadow-lg shadow-${led.color}-500/50` : "";

          return (
            <div
              key={led.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-6 h-6 rounded-full transition-all ${colorClass} ${shadowClass}`}
                ></div>
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
