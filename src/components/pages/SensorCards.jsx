import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io("http://192.168.1.6:3000"); // 👈 servidor backend con Socket.IO

export default function SensorCards() {
    const [data, setData] = useState({ temperatura: 0, humedad: 0 });


   useEffect(() => {
      // Escucha los datos enviados desde el backend
      socket.on("dhtAvg", (payload) => {
        console.log("Datos recibidos:", payload);
        setData(payload);
      }); 
      // Limpieza al desmontar el componente
      return () => {
        socket.off("dhtAvg");
      };
    }, []);
                                                       
  const cards = [
    {
      id: 1,
      title: "🌡️ Temperatura",
      value: data.temperatura,
      description: "Promedio actual del sensor DHT22",
    },
      {
      id: 2,
      title: "🌡️ humedad",
      value: data.humedad,
      description: "Promedio actual del sensor DHT22",
    }  
  ];

  const [selectedCard, setSelectedCard] = React.useState(0);

  return (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))",
        gap: 2,
        mt: 2,
      }}
    >
      {cards.map((card, index) => (
        <Card key={card.id} elevation={4}>
          <CardActionArea
            onClick={() => setSelectedCard(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent sx={{ height: "100%", textAlign: "center" }}>
              <Typography variant="h5" component="div" fontWeight="bold">
                {card.title}
              </Typography>
              <Typography
                variant="h4"
                color={index === 0 ? "error.main" : "primary.main"}
                sx={{ my: 1 }}
              >
                {card.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
