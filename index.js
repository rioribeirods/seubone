import express from "express"
import userRoutes from "./src/routes/users.js"
import vendaRoutes from "./src/routes/vendas.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/", userRoutes, vendaRoutes)

app.listen(8800)