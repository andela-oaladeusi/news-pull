import { SET_CURRENT_COUNTRY, SET_CURRENT_CATEGORY } from '../actions/Types';
import Country from '../utils/Country';

const initialState =
  {
    newCountry: Country.getCountry(),
    newCategory: ''
  }

const home = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_COUNTRY:
      return Object.assign({}, state, {
        newCountry: action.newCountry,
      })
    case SET_CURRENT_CATEGORY:
      return Object.assign({}, state, {
        newCategory: action.newCategory,
      })
    default:
      return state
  }
}

export default home;
