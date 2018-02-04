import { REQUEST_HEADLINES, RECEIVE_HEADLINES } from '../actions/Types';

const initialState = {
  isFetching: false,
  newsItems: []
}

const news = (state = initialState, action) => {
  switch(action.type) {
    case REQUEST_HEADLINES:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_HEADLINES:
      return Object.assign({}, state, {
        isFetching: false,
        newsItems: action.data
      })
    default:
      return state;
  }

}

export default news;