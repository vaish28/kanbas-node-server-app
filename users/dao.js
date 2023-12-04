/** @format */

import model from "./model.js"

// Create
export const createUser = (user) => model.create(user)

// Read
export const findAllUsers = () => model.find()
export const findUserById = (userId) => model.findById(userId)
export const findUserByUsername = (username) =>
	model.findOne({ username: username })
export const findUserByCredentials = (usr, pass) =>
	model.findOne({ username: usr, password: pass })

// Delete
export const deleteUser = (userId) => model.deleteOne({ _id: userId })

// Udpate
export const updateUser = (userId, user) =>
	model.updateOne({ _id: userId }, { $set: user })
