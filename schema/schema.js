const graphql = require('graphql')
const { 
	GraphQLObjectType, 
	GraphQLString, 
	GraphQLInt, 
	GraphQLID, 
	GraphQLNonNull,
	GraphQLList, 
	GraphQLSchema } = graphql
const Artist = require('../models/artist.js')
const Painting = require('../models/painting.js')



// DUMMY DATA
const paintings = [
	{englishTitle: 'the Birth of Venus', year: '1486', medium: 'oil on canvas', id: '1', artistId: '17', permanentResidence: "Uffizi in Firenze, Italy", originalTitle: 'la Nascita di Venere'},
	{englishTitle: 'Guernica', year: '1937', medium: 'oil on canvas', id: '2', permanentResidence: 'Reina Sofía in Madrid, Spain', artistId: '19'},
	{englishTitle: 'Café Terrace at Night', year: '1888', medium: 'oil on canvas', id: '3', artistId: '18', permanentResidence: 'Kröller-Müller Museum in Otterlo, Netherlands', originalTitle: 'Café, le soir'},
]

const artists = [
	{firstName: 'Sandro', lastName: 'Botticelli', birthDate: '1445', id: '17', birthPlace: 'Firenze, Italy', },
	{firstName: 'Vincent', lastName: 'van Gogh', birthDate: '30 March, 1853', id: '18', birthPlace: 'Groot-Zundert, the Netherlands',},
	{firstName: 'Pablo', lastName: 'Picasso', birthDate: '25 October, 1881', id: '19', birthPlace: 'Málaga, Spain',},
]



// =======================
// == DATA TYPES =========
// =======================
const PaintingType = new GraphQLObjectType({
	name: 'Painting', 
	fields: () => ({
		id: { type: GraphQLID },
		originalTitle: { type: GraphQLString },
		englishTitle: { type: GraphQLString },
		year: { type: GraphQLInt },
		medium: { type: GraphQLString },
		currentOwner: { type: GraphQLString },
		permanentResidence: { type: GraphQLString },
		artist: {
			type: ArtistType,
			resolve(parent, args){
				console.log("looking for the artist of painting", parent.englishTitle)
				return Artist.findById(parent.artistId)
			}
		}
	})
})

const ArtistType = new GraphQLObjectType({
	name: 'Artist', 
	fields: () => ({
		id: { type: GraphQLID },
		birthDate: { type: GraphQLString },
		birthPlace: { type: GraphQLString },
		firstName: { type: GraphQLString },
		lastName: { type: GraphQLString },
		paintings: {
			type: new GraphQLList(PaintingType),
			resolve(parent, args) {
				return Painting.find({ artistId: parent.id })
			}
		},
	})
})


const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: () => ({
		addArtist: { 
			type: ArtistType,
			args: {
				birthDate: { type: GraphQLString },
				birthPlace: { type: GraphQLString },
				firstName: { type: GraphQLString },
				lastName: { type: new GraphQLNonNull(GraphQLString) },
			},
			resolve(parent, args) {
				const artist = new Artist({
					birthPlace: args.birthPlace,
					birthDate: args.birthDate,
					firstName: args.firstName,
					lastName: args.lastName,
				})
				return artist.save()
			}
		},
		addPainting: { 
			type: PaintingType,
			args: {
				year: { type: GraphQLInt },
				originalTitle: { type: GraphQLString },
				englishTitle: { type: new GraphQLNonNull(GraphQLString) },
				permanentResidence: { type: GraphQLString },
				currentOwner: { type: GraphQLString },
				medium: { type: GraphQLString },
				artistId: { type: GraphQLID },
			},
			resolve(parent, args) {
				const painting = new Painting({
					year: args.year,
					originalTitle: args.originalTitle,
					englishTitle: args.englishTitle,
					birthPlace: args.birthPlace,
					birthDate: args.birthDate,
					artistId: args.artistId,
				})
				return painting.save()
			}
		},
		updatePainting: { 
			type: PaintingType,
			args: {
				id: { type: GraphQLID },
				year: { type: GraphQLInt },
				originalTitle: { type: GraphQLString },
				englishTitle: { type: GraphQLString },
				permanentResidence: { type: GraphQLString },
				currentOwner: { type: GraphQLString },
				medium: { type: GraphQLString },
				artistId: { type: GraphQLID },
			},
			resolve(parent, args) {

				const callback = () => {
					// return Painting.find()
					return Painting.findById(args.id)
				}

				Painting.updateOne({ _id: args.id }, {
					year: args.year,
					originalTitle: args.originalTitle,
					englishTitle: args.englishTitle,
					permanentResidence: args.permanentResidence,
					currentOwner: args.currentOwner,
					medium: args.medium,
					artistId: args.artistId,
				}, {}, callback);

				return Painting.findById(args.id)
			}
		},
	})
})


// =======================
// == ROOT QUERY =========
// =======================
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		painting: {
			type: PaintingType,
			args: { id: {type: GraphQLID} },
			resolve(parent, args) {
				return Painting.findById(args.id)
			}
		},
		artist: {
			type: ArtistType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Artist.findById(args.id)
			}
		},
		paintings: {
			type: new GraphQLList(PaintingType),
			resolve(parent, args) {
				return Painting.find()
			}
		},
		artists: {
			type: new GraphQLList(ArtistType),
			resolve(parent, args) {
				return Artist.find()
			}
		},
	}
})


module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation,
})