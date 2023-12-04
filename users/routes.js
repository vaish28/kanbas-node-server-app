/** @format */

import * as dao from "./dao.js"
let currentUser = null
function UserRoutes(app) {
	// Create
	const createUser = async (req, res) => {
		try {
			const user = await dao.createUser(req.body)
			res.json(user)
		} catch (e) {
			console.log(e)
		}
	}
	app.post("/api/users", createUser)

	const signup = async (req, res) => {
		try {
			const user = await dao.findUserByUsername(req.body.username)
			if (user) {
				res.status(400).json({ message: "Username already taken" })
			}
			const currentUser = await dao.createUser(req.body)
			req.session["currentUser"] = currentUser
			res.json(currentUser)
		} catch (e) {
			console.log(e)
		}
	}

	const signin = async (req, res) => {
		try {
			const { username, password } = req.body
			// currentUser = await dao.findUserByCredentials(username, password)
			// res.json( currentUser )

			const currentUser = await dao.findUserByCredentials(username, password)
			req.session["currentUser"] = currentUser
			res.json(currentUser)
		} catch (e) {
			console.log(e)
		}
	}

	const signout = (req, res) => {
		try {
			req.session["currentUser"] = null
			res.json(200)
		} catch (e) {
			console.log(e)
		}
	}

	// Delete
	const deleteUser = async (req, res) => {
		try {
			const status = await dao.deleteUser(req.params.userId)
			req.session.destroy()
			res.json(status)
		} catch (e) {
			console.log(e)
		}
	}

	// Read
	const findAllUsers = async (req, res) => {
		try {
			const users = await dao.findAllUsers()
			res.json(users)
		} catch (e) {
			console.log(e)
		}
	}

	const findUserById = async (req, res) => {
		try {
			const user = await dao.findUserById(req.params.userId)
			res.json(user)
		} catch (e) {
			console.log(e)
		}
	}

	// Update
	const updateUser = async (req, res) => {
		try {
			const { userId } = req.params
			const status = await dao.updateUser(userId, req.body)
			const currentUser = await dao.findUserById(userId)
			req.session["currentUser"] = currentUser
		} catch (e) {
			console.log(e)
		}
	}

	// Account
	const account = async (req, res) => {
		try {
			const user = req.session["currentUser"]
			const currentUser = await dao.findUserById(user?._id)
			req.session["currentUser"] = currentUser

			res.json(req.session["currentUser"])
		} catch (e) {
			console.log(e)
		}
	}

	app.post("/api/users", createUser)
	app.get("/api/users", findAllUsers)
	app.get("/api/users/:userId", findUserById)
	app.put("/api/users/:userId", updateUser)
	app.delete("/api/users/:userId", deleteUser)
	app.post("/api/users/signup", signup)
	app.post("/api/users/signin", signin)
	app.post("/api/users/signout", signout)
	app.post("/api/users/account", account)
}
export default UserRoutes
