import dotenv from 'dotenv';

dotenv.config({ silence: true });

const config = {
  NEWS_API_TOKEN: process.env.NEWS_API_TOKEN,
  NEWS_API_BASE_URL: process.env.NEWS_API_BASE_URL,
  MECURY_API_TOKEN: process.env.MERCURY_API_TOKEN,
  MECURY_API_BASE_URL: process.env.MECURY_API_BASE_URL
}

export default config;
