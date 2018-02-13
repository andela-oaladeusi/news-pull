import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressLogging from 'express-logging';
import logger from 'logops';
import cors from 'cors';
import dotenv from 'dotenv';

import { decodeUrl } from './util';
import { FetchNews, Scrape } from './controllers';

dotenv.config({ silence: true });

const app = express();
const PORT = process.env.PORT || 9080;

app.use(cors());
app.use(expressLogging(logger));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/v1/news/single/:urlId', Scrape.fetchScrapeData);
app.get('/api/v1/news/sources/:sourceName', FetchNews.fetchSourceNews);
app.get('/api/v1/news/:type/search', FetchNews.fetchSearchResults);
app.get('/api/v1/news/headlines/', FetchNews.fetchHeadlines);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/', 'index.html'));
  });
}

app.listen(PORT);

console.log('app running on ', PORT);
