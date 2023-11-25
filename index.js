import express from "express";
import apiRouter from "./apiRouter.js";
import mongoose from "mongoose";
import cors from "cors";

const server = express();
server.use(cors());

const port = 3030;

server.use("/api", apiRouter);

mongoose
  .connect(
    "mongodb+srv://cetesi3456:HWGH47ASd0iy338N@cluster0.ujwhphl.mongodb.net/epicode"
  )
  .then(() => {
    server.listen(port, () => {
      console.log("🚀 Server listening to port: " + port);
    });
  })
  .catch(() => {
    console.log("Errore nella connessione al DB");
  });
