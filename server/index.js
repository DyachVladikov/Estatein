import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import EstateRoute from "./routes/estate.js"

const app = express()
dotenv.config()

const Port = process.env.PORT || 3001
const DbPassword = process.env.DB_PASSWORD
const DbUser = process.env.DB_USER

app.use(cors())
app.use(express.json())

async function Start() {

    try {
        await mongoose.connect(`mongodb+srv://${DbUser}:${DbPassword}@estatein.dulha3r.mongodb.net/Estate`)

        app.listen(Port, () => {
            console.log("server start on " + Port);    
        })
        app.use("/api" , EstateRoute)

    } catch (error) {
        console.log(error);
        
    }
}

Start()