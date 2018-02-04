import axios from 'axios';

export default function setApiKey(newsApiKey) {
	axios.defaults.headers.common['X-Api-Key'] = newsApiKey;
  axios.defaults.baseURL = 'https://newsapi.org/v2';
};