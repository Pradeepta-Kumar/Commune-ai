import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import dataRoutes from "./routes/data.route.js";

const app = new express();

dotenv.config({
  path: "./.env",
});

//middlewares
app.use(
  cors({
    origin: "https://commune-ai-indol.vercel.app/",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/data", dataRoutes);

export default app;
