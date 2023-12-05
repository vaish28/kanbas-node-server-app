/** @format */

import express from "express"
import cors from "cors"

import "dotenv/config"

import mongoose from "mongoose"
import session from "express-session"

import Hello from "./hello.js"
import Lab5 from "./lab5.js"

import CourseRoutes from "./courses/routes.js"
import ModuleRoutes from "./modules/routes.js"

import UserRoutes from "./users/routes.js"

const app = express()

const CONNECTION_STRING =
	process.env.DB_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"


await mongoose.connect(CONNECTION_STRING)

app.use(
	cors({
		credentials: true,
		origin: process.env.FRONTEND_URL,
	})
)

const sessionOptions = {
	secret: "MYSECRET",
	resave: false,
	saveUninitialized: false,
}
if (process.env.NODE_ENV !== "development") {
	sessionOptions.proxy = true
	sessionOptions.cookie = {
		sameSite: "none",
		secure: true,
	}
}

app.use(session(sessionOptions))

// Passing JSON data to the server in an HTTP Body
app.use(express.json())

const PORT = 4000

Hello(app)
Lab5(app)
CourseRoutes(app)
ModuleRoutes(app)
UserRoutes(app)

app.listen(process.env.PORT || PORT)
