import express from 'express';
import path from 'path';
import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import { decodeUrl } from './src/js/utils/decodeEncode';


const app = express();
const PORT = process.env.PORT || 9080;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/v1/news/single/:urlId', fetchScrapeData);
app.get('/api/v1/news/sources/:sourceName', fetchSourceNews);
app.get('/api/v1/news/:type/search', fetchSearchResults);
app.get('/api/v1/news/headlines/', fetchHeadlines);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT);

console.log('app running on ', PORT);


function fetchHeadlines(req, res) {
  const country = req.query.country;
  const category = req.query.category;
  const pageSize = req.query.pageSize || 20;
  const page = req.query.page || 1;
  let url = null;

  if(category) {
    url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=${pageSize}&page=${page}`;
  }
    return axios({
        method: 'get',
        headers: {'X-Api-Key': '28f4078c0b944c5c8947a58651df6f1d'},
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

function fetchSearchResults(req, res) {
  const type = req.params.type || 'everything';
  const language = req.query.language || 'en';
  const q = req.query.q;
  const pageSize = req.query.pageSize || 20;
  const page = req.query.page || 1;
  const sortBy = req.query.sortBy || 'publishedAt,relevancy';

  const url = `https://newsapi.org/v2/${type}?language=${language}&q=${q}&pageSize=${pageSize}&page=${page}&sortBy=${sortBy}`;

  return axios({
    method: 'get',
    headers: {'X-Api-Key': '28f4078c0b944c5c8947a58651df6f1d'},
    url
  })
  .then((json) => {
    if(!json) {
      return res.status(400).send({ message: 'An error occured' });
    }
    return res.status(200).send(json.data);
  })
}

function fetchSourceNews(req, res) {
  const pageSize = req.query.pageSize || 20;
  const page = req.query.page || 1;
  const sortBy = req.query.sortBy || 'publishedAt';
  const source = req.query.sources;
  const language = req.query.language || 'en';

  const url = `https://newsapi.org/v2/everything?pageSize=${pageSize}&page=${page}&sources=${source}&language=${language}&sortBy=${sortBy}`;

  return axios({
      method: 'get',
      headers: {'X-Api-Key': '28f4078c0b944c5c8947a58651df6f1d'},
      url
    })
    .then((json) => {
      if(!json) {
        return res.status(400).send({ message: 'An error occured' });
      }
      return res.status(200).send(json.data);
    })
}

function fetchScrapeData(req, res) {
  const scrapeUrl = decodeUrl(req.params.urlId);
  const url = `https://mercury.postlight.com/parser?url=${scrapeUrl}`;

  return axios({
    method: 'get',
    url,
    headers: {'x-api-key': 't05c0F1GCEA0rIHDW8AQOIXTfTld4aIxQk2NwQuH'}
  })
  .then((json) => {
    if(!json) {
      return res.status(400).send({ message: 'An error occured' });
    } 
    return res.status(200).send(json.data);
  })
}
