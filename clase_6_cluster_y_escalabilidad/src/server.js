import express from "express";
import indexRoutes from "./routes/index.js";
import { connectDB } from "./config/db.connect.js";
import { config } from "./config/config.js";
import compression from "express-compression";
import errorHandler from "./middleware/errorHandler.js";
import winstonLogger from "./utils/winston.util.js";
import loggerWinston from "./middleware/winston.logger.mid.js";
import cluster from "cluster";
import { cpus } from "os";

const numberOfProcess = cpus().length;
// console.log("Number of CPU's:", numberOfProcess);

const app = express();
const PORT = config.PORT;

// Configuración de express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

// Conexión a la base de datos
connectDB();
app.use(loggerWinston);

// Rutas
app.use("/api", indexRoutes);
app.use((req, res) => {
  res.status(404).json({ response: "Route don't exist" });
});

// Manejador de errores
app.use(errorHandler);

// Manejo de clusters
if (cluster.isPrimary) {
  console.log("Primary process managing workers");

  // Crear tantos workers como núcleos
  for (let i = 0; i < numberOfProcess; i++) {
    cluster.fork();
  }

  // Cuando un worker muere, reiniciarlo
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, restarting...`);
    cluster.fork();
  });
} else {
  // Workers escuchando en el puerto configurado
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
    winstonLogger.info(`Worker listening on PORT:${PORT}`);
  });
}
