import express from "express";
import { calculo } from "./calculo.js";
import { fork } from "child_process";

const app = express();
const PORT = 5000;

app.get("/", (req, res) => {
  res.json({ message: `${Math.round(Math.random() * 10000)}` });
});

//BLOQUEANTE
app.get("/bloqueante", (req, res) => {
  const sum = calculo();
  res.json({ result: sum });
});

//NO BLOQUEANTE
app.get("/no-bloqueante", (req, res) => {
  const child = fork("./no-bloqueante.js");
  child.send("Inicia el proceso por favor"); //El padre envia el mensaje al hijo

  child.on("message", (message) => {
    //el hijo se queda esperando a que conteste el padre
    res.json({ result: `El resultado es: ${message}` });
  });
});

app.get("/servicio-externo", (req, res) => {
  const child = fork("./servicio-externo.js");
  child.send("Inicia la consulta externa por favor");

  child.on("message", (message) => {
    //el hijo se queda esperando a que conteste el padre
    console.log(`consulta terminada`);
    res.json({ result: `El resultado a la consulta externa es: ${message}` });
  });
});

app.listen(PORT, () => {
  console.log("Server online in port 5000");
});
