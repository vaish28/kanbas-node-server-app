/** @format */

import db from "../Database/index.js"
function ModuleRoutes(app) {
	// Getting all modules of a course
	app.get("/api/courses/:cid/modules", (req, res) => {
		const { cid } = req.params
		console.log(cid, "Fetching modules for this course id")
		console.log(db.modules.length, "total modules")
		const modules = db.modules.filter((m) => m.course === cid)
		console.log(modules.length, " of modules")
		res.send(modules)
	})

	// Creating modules for a course
	app.post("/api/courses/:cid/modules", (req, res) => {
		console.log("Adding a new module for the course")
		const { cid } = req.params
		const newModule = {
			...req.body,
			course: cid,
			_id: new Date().getTime().toString(),
		}
		db.modules.push(newModule)
		res.send(newModule)
	})

	// Deleting a module
	app.delete("/api/modules/:mid", (req, res) => {
		console.log("Deleting a module from the course")
		const { mid } = req.params
		db.modules = db.modules.filter((m) => m._id !== mid)
		res.sendStatus(200)
	})


    
	// Update a module
	app.put("/api/modules/:mid", (req, res) => {
		console.log("Editing a module of the course")
		const { mid } = req.params
		const moduleIndex = db.modules.findIndex((m) => m._id === mid)
		db.modules[moduleIndex] = {
			...db.modules[moduleIndex],
			...req.body,
		}
		res.sendStatus(204)
	})
}
export default ModuleRoutes