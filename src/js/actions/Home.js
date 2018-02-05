import { SET_CURRENT_COUNTRY, SET_CURRENT_CATEGORY } from './Types';

export function setNewCountry(country) {
	return dispatch => {
		dispatch({ type: SET_CURRENT_COUNTRY, newCountry: country });
	}
}

export function setNewCategory(category) {
	return dispatch => {
		dispatch({ type: SET_CURRENT_CATEGORY, newCategory: category });
	}
}

