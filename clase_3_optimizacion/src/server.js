import express from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.js";
import { connectDB } from "./config/db.connect.js";
import { config } from "./config/config.js";
import compression from "express-compression";
import errorHandler from "./middleware/errorHandler.js";

const app = express();
const PORT = config.PORT;

//Config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  compression({
    brotli: { enabled: true, zlib: {} },
  })
);

//Mongoose Database
connectDB();

//Routes
app.use("/api", indexRoutes);
app.use((req, res) => {
  res.status(404).json({ response: "Route don't exist" });
});

//Errors Manager "next(error)"
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server online in port http://localhost:${PORT}`);
  console.log(`Mode Server: [[[[[[ ${config.MODE} ]]]]]]`);
});
