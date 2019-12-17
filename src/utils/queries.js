import { gql } from 'apollo-boost'

export default {
	getPaintings: gql`
		{
			paintings{
				id
				englishTitle
				originalTitle
				year
				medium
				permanentResidence
				currentOwner
				artist{
					id
					firstName
					lastName
					birthPlace
					birthDate
				}
			}
		}`,

	getArtists: gql`
		{
			artists{
				id
				firstName
				lastName
				birthPlace
				birthDate
				paintings{
					id
					englishTitle
					year
				}
			}
		}`,

	getPainting: gql`
		query($id: ID){
			painting(id: $id){
				id
				originalTitle
				year
			}
		}`,

	getArtist: gql`
		query($id: ID){
			id
			firstName
			lastName
			birthPlace
			birthDate
		}`,

	addArtist: gql`
		mutation($id: String!, $firstName: String, $lastName: String!, $birthPlace: String){
			addArtist(id: $id, firstName: $firstName, lastName: $lastName, birthPlace: $birthPlace, birthDate: $birthDate){
				id
				firstName
				lastName
				birthPlace
				birthDate
			}
		}`,

	addPainting: gql`
		mutation($englishTitle: String!, $originalTitle: String!, $year: Int, $permanentResidence: String, $currentOwner: String, $artistId: ID){
			addPainting(englishTitle: $englishTitle, originalTitle: $originalTitle, year: $year, permanentResidence: $permanentResidence, currentOwner: $currentOwner, artistId: $artistId){
				id
				englishTitle
				originalTitle
				year
				permanentResidence
				currentOwner
			}
		}`,

	updatePainting: gql`
		mutation($id: ID, $englishTitle: String!, $originalTitle: String, $year: Int, $permanentResidence: String, $currentOwner: String, $medium: String, $artistId: ID){
			updatePainting(id: $id, englishTitle: $englishTitle, originalTitle: $originalTitle, year: $year, permanentResidence: $permanentResidence, currentOwner: $currentOwner, medium: $medium artistId: $artistId){
				id
				englishTitle
				originalTitle
				year
				permanentResidence
				currentOwner
				artist{
					id
					firstName
					lastName
					birthPlace
					birthDate
				}
			}
		}`,
}