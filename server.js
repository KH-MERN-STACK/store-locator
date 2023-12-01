import path from "path"
import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import routes from "./routes/stores.js"
import connectDB from "./config/db.js"

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('./public'))
app.use("/api/v1/stores", routes)

const start = () => {
	app.listen(PORT, () => console.log(`server listening on ${PORT}....`))
	connectDB()
}


start()