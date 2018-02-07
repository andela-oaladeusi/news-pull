import { REQUEST_HEADLINES, RECEIVE_HEADLINES, FETCH_SCRAPE_NEW, ERROR_OCCURED } from '../actions/Types';

const initialState = {
  isFetching: false,
  newsItems: [],
  scrapeItem: {},
  isError: false,
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
    case FETCH_SCRAPE_NEW:
      return Object.assign({}, state, {
        isFetching: action.isFetching,
        scrapeItem: action.data
      })
    case ERROR_OCCURED:
      return Object.assign({}, state, {
        isError: true
      })
    default:
      return state;
  }

}

export default news;