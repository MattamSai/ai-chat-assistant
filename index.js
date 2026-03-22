import { configDotenv } from "dotenv"
configDotenv()
import readline from "readline/promises"
import { route } from "./routes/route.js"
import express, { urlencoded } from "express"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(route)

if(!process.env.EXPRESS_PORT){
    console.log(`Ports number in env is not loaded`)
    process.exit(1)
}


app.listen(process.env.EXPRESS_PORT,()=>{
    console.log(`server is listening on ${process.env.EXPRESS_PORT}`)
})
