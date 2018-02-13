import axios from 'axios';

import config from '../config';
import { decodeUrl } from '../util';

class Scrape {
  static fetchScrapeData(req, res) {
    const scrapeUrl = decodeUrl(req.params.urlId);
    const url = `${config.MECURY_API_BASE_URL}/parser?url=${scrapeUrl}`;

    return axios({
      method: 'get',
      url,
      headers: {'x-api-key': config.MECURY_API_TOKEN}
    })
    .then((json) => {
      if(!json) {
        return res.status(400).send({ message: 'An error occured' });
      } 
      return res.status(200).send(json.data);
    })
  }
}

export default Scrape;
