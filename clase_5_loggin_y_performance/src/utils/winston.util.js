import { createLogger, format, addColors, transports } from "winston";
const { colorize, simple, timestamp } = format;
const { Console, File } = transports;

// const levels = { internalServerError: 0, error: 1, info: 2, http_api: 3 };
// const colors = { internalServerError: "red", error: "yellow", info: "blue", http_api: "white" };

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  http: 4,
  debug: 5,
};

const colors = {
  fatal: "red",
  error: "yellow",
  warn: "magenta",
  info: "blue",
  http: "white",
  debug: "green",
};

addColors(colors);

const winstonLogger = createLogger({
  levels,
  format: format.combine(
    timestamp(), // Agrega la fecha y hora
    colorize(),
    simple() // Formato simple
  ),
  transports: [
    // primer nivel de registro http_api en consola
    new Console({ level: "http" }),
    // segundo nivel de registro ERROR en archivo (y tambien de forma automatica en consola)
    new File({ level: "error", filename: "./src/log/errors.log" }),
    new File({ level: "info", filename: "./src/log/info.log" }),
  ],
});

export default winstonLogger;

// A PARTIR DE AHORA NO SE USA MAS EL CONSOLE.LOG
// A PARTIR DE AHORA SE USA WINSTON.NIVELQUECORRESPONDA(LO QUE QUIERO REGISTRAR)
//ESTE ARCHIVO ES EL QUE SE LLAMA IMPORTANDOLO DONDE SE QUIERA USAR
//import winstonLogger from "....etc"
//winstonLogger.
