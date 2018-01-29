import axios from 'axios';
import { REQUEST_GET, RECEIVE_GET } from './Types';

function requestGet(data) {
  return {
    type: REQUEST_GET,
    data
  }
}

function receiveGet(data) {
  return {
    type: RECEIVE_GET,
    data
  }
}

export function fetchGet() {
  return function (dispatch) {
    dispatch(requestGet('loading'));
    return axios.get('https://andela-dms.herokuapp.com/')
      .then(
        response => response.data,
        error => console.log('An error occurred.', error)
      )
      .then(json => dispatch(receiveGet(json.message))
    )
  }
}


