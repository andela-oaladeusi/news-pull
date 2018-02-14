import axios from 'axios';

import config from '../config';

class FetchNews {

  static fetchHeadlines(req, res) {
    const country = req.query.country;
    const category = req.query.category;
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    let url = null;

    if(category) {
      url = `${config.NEWS_API_BASE_URL}/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}`;
    } else {
      url = `${config.NEWS_API_BASE_URL}/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}`;
    }
      return axios({
          method: 'get',
          headers: {'X-Api-Key': config.NEWS_API_TOKEN},
          url
        })
        .then((json) => {
          if(!json) {
            return res.status(400).send({ message: 'An error occured' });
          }
          return res.status(200).send(json.data);
        }
      )
  }

  static fetchSearchResults(req, res) {
    const type = req.params.type || 'everything';
    const language = req.query.language || 'en';
    const q = req.query.q;
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    const sortBy = req.query.sortBy || 'publishedAt,relevancy';

    const url = `${config.NEWS_API_BASE_URL}/${type}?language=${language}&q=${q}&pageSize=${pageSize}&page=${page}&sortBy=${sortBy}`;

    return axios({
      method: 'get',
      headers: {'X-Api-Key': config.NEWS_API_TOKEN},
      url
    })
    .then((json) => {
      if(!json) {
        return res.status(400).send({ message: 'An error occured' });
      }
      return res.status(200).send(json.data);
    })
  }

  static fetchSourceNews(req, res) {
    const pageSize = req.query.pageSize || 20;
    const page = req.query.page || 1;
    const sortBy = req.query.sortBy || 'publishedAt';
    const source = req.query.sources;
    const language = req.query.language || 'en';
    const q = req.query.q;

    let url = `${config.NEWS_API_BASE_URL}/everything?pageSize=${pageSize}&page=${page}&sources=${source}&language=${language}&sortBy=${sortBy}`;

    if(q) {
      url = `${url}&q=${q}`;
    }

    return axios({
        method: 'get',
        headers: {'X-Api-Key': config.NEWS_API_TOKEN},
        url
      })
      .then((json) => {
        if(!json) {
          return res.status(400).send({ message: 'An error occured' });
        }
        return res.status(200).send(json.data);
      })
  }
}

export default FetchNews;
