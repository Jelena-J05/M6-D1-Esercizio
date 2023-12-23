import express from "express";
import cors from "cors";
import passport from "passport";
import mongoose from "mongoose";
import dotenv from "dotenv";
import endpoints from "express-list-endpoints";
import googleStrategy from "./auth/oauth/index.js";
import apiRouter from "./apiRouter.js";
import {
  badRequestHandler,
  genericErrorHandler,
  notfoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";

dotenv.config();

const server = express();


server.use(cors());
server.use(express.json()); 


passport.use("google", googleStrategy);


server.use("/api", apiRouter);


server.use(badRequestHandler); // 400
server.use(unauthorizedHandler); // 401
server.use(notfoundHandler); // 404
server.use(genericErrorHandler); // 500

const port = process.env.PORT || 3030;

mongoose.connect(process.env.MONGO_URL).then(() => {
    server.listen(port, () => {
        console.log("Server is running on port 🚀🚀🚀 " + port)

        console.table(endpoints(server))
    })
})