import { calculo } from "./calculo.js";

process.on("exit", (code) => {
  console.log(`El worker con el id ${process.pid} ha finalizado con el codigo: ${code}`);
});

process.on("message", (message) => {
  console.log(`El worker con el id ${process.id} ha recibido el mensaje: ${message}`);
  const sum = calculo();
  process.send(sum); //el hijo envia el resultado al padre cuando termine el trabajo

  //opcional
  process.exit();
});
