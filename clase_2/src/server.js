import express from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.js";
import { connectDB } from "./config/db.connect.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//Connection to MONGO
connectDB();

//Routes
app.use("/api", indexRoutes);
app.use((req, res) => {
  res.status(404).json({ response: "Error", message: "Route don't exist" });
});
app.get("/", (req, res) => {
  res.status(200).json({ response: "Ok" });
});

app.listen(PORT, () => {
  console.log(`Server online on Port: ${PORT}`);
});
