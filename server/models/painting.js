const mongoose = require('mongoose')
const { Schema } = mongoose

const paintingSchema = new Schema({
	originalTitle: String,
	englishTitle: String,
	year: String,
	permanentResidence: String,
	currentOwner: String,
	medium: String,
	artistId: String,
})

module.exports = mongoose.model('Painting', paintingSchema)