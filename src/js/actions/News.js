import axios from 'axios';
import { RECEIVE_HEADLINES, REQUEST_HEADLINES } from './Types';


function requestHeadlines(status) {
  return {
    type: REQUEST_HEADLINES,
    isFetching: true,
    status
  }
}

function receiveHeadlines(data) {
  return {
    type: RECEIVE_HEADLINES,
    isFetching: false,
    data
  }
}


export function fetchNewsHeadlines() {
  return function(dispatch) {
    dispatch(requestHeadlines('loading'));
    return axios.get('/top-headlines?country=us')
      .then(
        res => res.data,
        err => console.log('An error has occured')
      )
      .then(json => dispatch(receiveHeadlines(json.articles))
    )
  }
}