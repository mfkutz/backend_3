import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/mocking_manejo_de_errores")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};
