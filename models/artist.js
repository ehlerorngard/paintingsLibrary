const mongoose = require('mongoose')
const { Schema } = mongoose

const artistSchema = new Schema({
	firstName: String,
	lastName: String,
	birthPlace: String,
	birthDate: String,
})

module.exports = mongoose.model('Artist', artistSchema)