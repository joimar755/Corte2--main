import * as React from 'react';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { BarChart } from '@mui/x-charts/BarChart';
import { io } from 'socket.io-client';

// 🔹 Conectamos al servidor Socket.IO
const socket = io("http://192.168.1.6:3000");

// 🔹 Componente selector de ticks (mantener igual)
function TickParamsSelector({
  tickPlacement,
  tickLabelPlacement,
  setTickPlacement,
  setTickLabelPlacement,
}) {
  return (
    <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
      <FormControl>
        <FormLabel id="tick-placement-radio-buttons-group-label">
          tickPlacement
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="tick-placement-radio-buttons-group-label"
          name="tick-placement"
          value={tickPlacement}
          onChange={(event) => setTickPlacement(event.target.value)}
        >
          <FormControlLabel value="start" control={<Radio />} label="start" />
          <FormControlLabel value="end" control={<Radio />} label="end" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
          <FormControlLabel value="extremities" control={<Radio />} label="extremities" />
        </RadioGroup>
      </FormControl>
      <FormControl>
        <FormLabel id="label-placement-radio-buttons-group-label">
          tickLabelPlacement
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="label-placement-radio-buttons-group-label"
          name="label-placement"
          value={tickLabelPlacement}
          onChange={(event) => setTickLabelPlacement(event.target.value)}
        >
          <FormControlLabel value="tick" control={<Radio />} label="tick" />
          <FormControlLabel value="middle" control={<Radio />} label="middle" />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
}

export default function DHTBarChart() {
  const [sensorData, setSensorData] = React.useState({ temperatura: 0, humedad: 0 });
  const [tickPlacement, setTickPlacement] = React.useState('middle');
  const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');

  // 🔹 Escucha de datos del backend en tiempo real
  React.useEffect(() => {
    socket.on("sensorData", (payload) => {
      console.log("Datos recibidos:", payload);
      setSensorData(payload);
    });

    return () => {
      socket.off("sensorData");
    };
  }, []);

  // 🔹 Dataset dinámico para la gráfica
 const dataset = [
  { metric: 'Temperatura', value: sensorData.temperatura },
  { metric: 'Humedad', value: sensorData.humedad },
]

  const chartSetting = {
    yAxis: [
      {
        label: 'Valor',
        width: 60,
      },
    ],
    series: [{ dataKey: 'value', label: 'Sensor DHT22' }],
    height: 300,
    margin: { left: 0 },
  };

  return (
    <div style={{ width: '100%' }}>
      <TickParamsSelector
        tickPlacement={tickPlacement}
        tickLabelPlacement={tickLabelPlacement}
        setTickPlacement={setTickPlacement}
        setTickLabelPlacement={setTickLabelPlacement}
      />
      <BarChart
        dataset={dataset}
        xAxis={[{ dataKey: 'metric', tickPlacement, tickLabelPlacement }]}
        {...chartSetting}
      />
    </div>
  );
}
