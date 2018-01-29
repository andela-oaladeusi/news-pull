import { REQUEST_GET, RECEIVE_GET } from '../actions/Types';

const initialState =
  {
    isFetching: false,
    items: []
  }

const home = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_GET:
      return Object.assign({}, state, {
        isFetching: true,
      })
    case RECEIVE_GET:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.data,
      })
    default:
      return state
  }
}

export default home;
