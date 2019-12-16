import { apollo } from '../configureStore.js'
import { gql } from 'apollo-boost'
import queries from "./queries.js"


// ===============================================
// basic update of store without updating database:
// ===============================================
export const updateStore = (chicken) => (dispatch) => {
	dispatch({
		type: "UPDATE_STORE",
		payload: Object.assign({}, chicken),
	});
}


// ===============================================
// ===== update database, then store: ============
// ===============================================
export const getPaintings = (dispatch) => {
	console.log('getting all paintings...')
	return apollo.query({query: queries.getPaintings})
		.then(response => {
			console.log('getAll response: ', response.data)
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, response.data),
			});
		});
}

export const getPainting = (vars) => (dispatch) => {
	return apollo.query({ query: queries.getPainting, variables: vars })
		.then(response => {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, response.data),
			});
		});
}

export const addPainting = (data, paintings) => (dispatch) => {
	return apollo.mutate({mutation: queries.addPainting, variables: data })
		.then(response => {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, {paintings: [...paintings, response.data]}),
			});
		});
}

export const modifyPainting = (data, paintings) => (dispatch) => {
	return apollo.mutate({mutation: queries.updatePainting, variables: data })
		.then(response => {
			console.log('modify response', response.data)
			const index = paintings.filter((p, i) => {
				if (p.id === data.id) return i
			})[0];
			let ptns = [...paintings]
			ptns[index] = response.data.updatePainting;
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, {paintings: ptns}),
			});
			setTimeout(() => getPaintings(dispatch), 500);
		});
}

export const getArtists = (dispatch) => {
	return apollo.query({query: queries.getArtists})
		.then(response => {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, response.data),
			});
		});
}