import express from "express";
// import morgan from "morgan";
import indexRoutes from "./routes/index.js";
import { connectDB } from "./config/db.connect.js";
import { config } from "./config/config.js";
import compression from "express-compression";
import errorHandler from "./middleware/errorHandler.js";
import winstonLogger from "./utils/winston.util.js";
import loggerWinston from "./middleware/winston.logger.mid.js";

const app = express();
const PORT = config.PORT;

//Config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("dev"));
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//Mongoose Database
connectDB();
app.use(loggerWinston);

//Routes
app.use("/api", indexRoutes);
app.use((req, res) => {
  res.status(404).json({ response: "Route don't exist" });
});

//Errors Manager "next(error)"
app.use(errorHandler);

app.listen(PORT, () => {
  winstonLogger.info(`Server online PORT:${PORT} Mode Server: [[ ${config.MODE} ]]`);
});
