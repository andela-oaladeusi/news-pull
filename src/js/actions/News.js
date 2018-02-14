import axios from 'axios';

import { RECEIVE_NEWS, REQUEST_NEWS, SET_CURRENT_CATEGORY, ERROR_OCCURED } from './Types';
import { Country } from '../utils';


function requestNews(status) {
  return {
    type: REQUEST_NEWS,
    isFetching: true,
    status
  }
}

function receiveNews(result) {
  return {
    type: RECEIVE_NEWS,
    isFetching: false,
    data: result.articles,
    totalCount: result.totalResults
  }
}

export function fetchNewsHeadlines(category) {
  const country = Country.getCountry();
  let url = null;
  if(category) {
    url = `/api/v1/news/headlines/?country=${country}&category=${category}&pageSize=100`;
  } else {
    url = `/api/v1/news/headlines/?country=${country}&pageSize=100`;
  }
  return function(dispatch) {
    dispatch(requestNews('loading'));
    dispatch({ type: SET_CURRENT_CATEGORY, newCategory: category })
    return axios({
        method: 'get',
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
        return dispatch(receiveNews(json))
      }
    )
  }
}


export function searchNews(payload) {
  const url = `/api/v1/news/${payload.type}/search?language=${payload.language}&q=${payload.query}&pageSize=${payload.pageSize}&page=${payload.page}&sortBy=publishedAt`;
  return function(dispatch) {
    dispatch(requestNews('loading'));
    dispatch({ type: SET_CURRENT_CATEGORY, newCategory: '' })
    return axios({
        method: 'get',
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
        return dispatch(receiveNews(json))
      })
  }
}

export function searchNewsPopOver(payload) {
  const url = `/api/v1/news/${payload.type}/search?language=${payload.language}&q=${payload.query}&pageSize=${payload.pageSize}&page=${payload.page}&sortBy=publishedAt`;
  return function(dispatch) {
    return axios({
        method: 'get',
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
        return dispatch({ type: 'RECEIVE_POPOVER', data: json });
      })
  }
}

export function sourceNews(payload) {
  const { page, filterBy, q } = payload;
  let url = `/api/v1/news/sources?pageSize=21&language=en&sortBy=publishedAt&page=${page}`;
  if(filterBy && filterBy !== 'all') {
    url = `${url}&sources=${filterBy}`;
  }
  if(q) {
    url = `${url}&q=${q}`;
  }
  return function(dispatch) {
    dispatch(requestNews('loading'));
    return axios({
        method: 'get',
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

        return dispatch(receiveNews(json))
      })
  }
}

export function scrapeNew(urlId) {
  const url = `/api/v1/news/single/${urlId}`;
  return function(dispatch) {
    dispatch({ type: 'FETCH_SCRAPE_NEW', data: {}, isFetching: true });
    return axios({
      method: 'get',
      url,
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

