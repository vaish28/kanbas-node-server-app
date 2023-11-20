/** @format */

import Database from "../Database/index.js"

function CourseRoutes(app) {
	// Get all the courses
	app.get("/api/courses", (req, res) => {
		const courses = Database.courses
		res.send(courses)
	})

	// Create a new course
	app.post("/api/courses", (req, res) => {
		const course = { ...req.body, _id: new Date().getTime().toString() }
		Database.courses.push(course)
		res.send(course)
	})

	// Delete a course, given id
	app.delete("/api/courses/:id", (req, res) => {
		const { id } = req.params
		console.log(Database.courses.length, "Length before deleting", id)
		Database.courses = Database.courses.filter((c) => c._id !== id)
		console.log(Database.courses.length, "Length after deleting")
		res.sendStatus(204)
	})

	// Update a course given id
	app.put("/api/courses/:id", (req, res) => {
		const { id } = req.params
		const course = req.body
		Database.courses = Database.courses.map((c) =>
			c._id === id ? { c, ...course } : c
		)
		res.sendStatus(204)
	})

	// Get a particular course from ID
	app.get("/api/courses/:id", (req, res) => {
		const { id } = req.params
		const course = Database.courses.find((c) => c._id === id)
		if (!course) {
			res.status(404).send("Course not found")
			return
		}
		res.send(course)
	})
}

export default CourseRoutes