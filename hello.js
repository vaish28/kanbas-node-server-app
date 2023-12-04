/** @format */

const Hello = (app) => {
	app.get("/hello", (req, res) => {
		res.send("Life is good!")
	})
	app.get("/", (req, res) => {
		res.send(
			"Welcome to Full Stack Development! You are checking out the backend developed with Node and Express."
		)
	})
}
export default Hello
