const mongoose = require('mongoose')
const { Schema } = mongoose

const paintingSchema1 = new Schema({
	originalTitle: String,
	englishTitle: String,
	year: String,
	permanentResidence: String,
	currentOwner: String,
	medium: String,
	artistId: String,
});

function createPaintingSchema() {
	const paintingSchema = new Schema({
		originalTitle: String,
		englishTitle: String,
		year: String,
		permanentResidence: String,
		currentOwner: String,
		medium: String,
		artistId: String,
	});

	paintingSchema.post('updateOne', (error, res, next) => {
		if (error) {
			console.log('error in paintingSchema after attempted update: ', error)
		} else return next();
	});

	return paintingSchema;
}

const pSchema = createPaintingSchema()

module.exports = mongoose.model('Painting', pSchema)