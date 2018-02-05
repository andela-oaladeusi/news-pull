import axios from 'axios';
import { RECEIVE_HEADLINES, REQUEST_HEADLINES, SET_CURRENT_CATEGORY } from './Types';

import Country from '../utils/Country';


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


export function fetchNewsHeadlines(category) {
  const country = Country.getCountry();
  console.log('action', country);
  let url = null;
  if(category) {
    url = `/top-headlines?country=${country}&category=${category}`;
  } else {
    url = `/top-headlines?country=${country}`;
  }
  return function(dispatch) {
    dispatch(requestHeadlines('loading'));
    dispatch({ type: SET_CURRENT_CATEGORY, newCategory: category })
    return axios.get(url)
      .then(
        res => res.data,
        err => console.log('An error has occured')
      )
      .then(json => dispatch(receiveHeadlines(json.articles))
    )
  }
}

