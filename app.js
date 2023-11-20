import express from "express"
import cors from "cors"
import "dotenv/config"
import Hello from "./hello.js"
import Lab5 from "./lab5.js"

import CourseRoutes from "./courses/routes.js"
import ModuleRoutes from "./modules/routes.js"

const app = express()

app.use(cors())

app.use(express.json())

const PORT = 4000

Hello(app)
Lab5(app)
CourseRoutes(app)
ModuleRoutes(app)

app.listen(process.env.PORT || PORT)