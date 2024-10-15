import mongoose from "mongoose";

export const connectDB = async () => {
  mongoose
    .connect("mongodb://localhost:27017/backend3_clase2")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
};
