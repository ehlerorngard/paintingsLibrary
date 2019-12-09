import { apollo } from '../configureStore.js'
import queries from "./queries.js"


// ===============================================
// basic update of store without updating database:
// ===============================================
export const updateStore = (chicken) => (dispatch) => {
	console.log("updateStore", chicken)
	dispatch({
		type: "UPDATE_STORE",
		payload: Object.assign({}, chicken),
	});
}


// ===============================================
// ===== update database, then store: ============
// ===============================================
export const getPaintings = (dispatch) => {
	return apollo.query({query: queries.getPaintings})
		.then(response => {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, response.data),
			});
		});
}

export const getPainting = (id) => (dispatch) => {
	return apollo.query({query: queries.getPainting(id)})
		.then(response => {
			dispatch({
				type: "UPDATE_STORE",
				payload: Object.assign({}, response.data),
			});
		});
}