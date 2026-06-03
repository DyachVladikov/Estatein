/* import dns from "node:dns";

dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '1.1.1.1', '208.67.222.222']); */

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import Routes from "./routes/routes.js";

dotenv.config();

const app = express();

//app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }))
//app.use(cors({ origin: "*" }));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Перехватываем предварительный запрос браузера и сразу отдаем статус 200
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use("/api", Routes);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@estatein.dulha3r.mongodb.net/Estate`,
  )
  .catch((err) => console.log(err));

// локальный запуск
if (process.env.NODE_ENV !== "production") {
  const Port = process.env.PORT || 3002;
  app.listen(Port, () => console.log("server start on " + Port));
}

export default app;
