import axios from 'axios';
import { decodeUrl } from '../utils/decodeEncode';
import { RECEIVE_HEADLINES, REQUEST_HEADLINES, SET_CURRENT_CATEGORY, ERROR_OCCURED } from './Types';

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

/**
 * `/everything?pageSize=50&sources=techcrunch&language=en` - get all techcrunch news
 * 
 */

export function fetchNewsHeadlines(category) {
  const country = Country.getCountry();
  let url = null;
  if(category) {
    url = `/top-headlines?country=${country}&category=${category}&pageSize=100`;
  } else {
    url = `/top-headlines?country=${country}&pageSize=100`;
  }
  return function(dispatch) {
    dispatch(requestHeadlines('loading'));
    dispatch({ type: SET_CURRENT_CATEGORY, newCategory: category })
    return axios({
        method: 'get',
        headers: {'X-Api-Key': '28f4078c0b944c5c8947a58651df6f1d'},
        url
      })
      .then(
        res => res.data,
        err => console.log('An error has occured')
      )
      .then((json) => {
        if(!json) {
          return dispatch({ type: ERROR_OCCURED })
        }
        return dispatch(receiveHeadlines(json.articles))
      }
    )
  }
}


export function searchNews(payload) {
  const url = `/${payload.type}?language=${payload.language}&q=${payload.query}&pageSize=${payload.pageSize}&${payload.page}&sortBy=publishedAt`;
  return function(dispatch) {
    dispatch(requestHeadlines('loading'));
    dispatch({ type: SET_CURRENT_CATEGORY, newCategory: '' })
    return axios({
        method: 'get',
        headers: {'X-Api-Key': '28f4078c0b944c5c8947a58651df6f1d'},
        url
      })
      .then(
        res => res.data,
        err => console.log('An error has occured')
      )
      .then((json) => {
        if(!json) {
          return dispatch({ type: ERROR_OCCURED })
        }
        return dispatch(receiveHeadlines(json.articles))
      })
  }
}

export function sourceNews(payload) {
  const url = `/everything?pageSize=50&page=${payload.page}&sources=${payload.source}&language=en&sortBy=publishedAt`;
  return function(dispatch) {
    dispatch(requestHeadlines('loading'));
    return axios({
        method: 'get',
        headers: {'X-Api-Key': '28f4078c0b944c5c8947a58651df6f1d'},
        url
      })
      .then(
        res => res.data,
        err => console.log('An error has occured')
      )
      .then((json) => {
        if(!json) {
          return dispatch({ type: ERROR_OCCURED })
        }
        return dispatch(receiveHeadlines(json.articles))
      })
  }
}

export function scrapeNew(text) {
  const scrapeUrl = decodeUrl(text);
  const url = `https://mercury.postlight.com/parser?url=${scrapeUrl}`;
  return function(dispatch) {
    dispatch({ type: 'FETCH_SCRAPE_NEW', data: {}, isFetching: true });
    return axios({
      method: 'get',
      url,
      headers: {'x-api-key': 't05c0F1GCEA0rIHDW8AQOIXTfTld4aIxQk2NwQuH'}
    })
      .then(
        res => res.data,
        err => console.log(' error occured ')
        )
      .then((json) => {
        if(!json) {
          return dispatch({ type: ERROR_OCCURED })
        } 
        return dispatch({ type: 'FETCH_SCRAPE_NEW', data: json, isFetching: false })
      })
  }
} 

