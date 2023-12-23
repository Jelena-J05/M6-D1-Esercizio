import express from "express"
import endpoints from "express-list-endpoints"
import {
    badRequestHandler,
    genericErrorHandler,
    notfoundHandler,
    unauthorizedHandler,
} from "./errorHandlers.js"
import passport from "passport"
import googleStrategy from "./auth/oauth/index.js"
import apiRouter from "./apiRouter.js"
import mongoose from "mongoose"
import cors from "cors"

const server = express()
server.use(cors())

const PORT = process.env.PORT || 3030

server.use("/api", apiRouter)
passport.use("google", googleStrategy)

server.use(badRequestHandler) // 400
server.use(unauthorizedHandler) // 401
server.use(notfoundHandler) // 404
server.use(genericErrorHandler) // 500

const initServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("The server has successfully connected to mongodb.")
        server.listen(PORT, () => {
            console.log(
                "Server has started on port " +
                    PORT +
                    "!" +
                    "The server has these endpoints:"
            )
            console.table(endpoints(server))
        })
    } catch (error) {
        console.log("CONNECTION FAILED! Error: ", error)
    }
}

initServer()
