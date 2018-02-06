import React from 'react';
import { Link } from 'react-router-dom';
import { encodeUrl } from '../../utils/decodeEncode';

const Carousel = ({ article }) => (
  <div className="row my-4">
    <div className="col-lg-8">
      <img className="img-fluid rounded first" src={article.urlToImage} alt=""/>
    </div>
    <div className="col-lg-4">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <Link className="btn btn-primary" to={`/news/${encodeUrl(article.url)}`}>Read More...</Link>
      <br />
      <small className="text-muted">Published Date: {article.publishedAt}</small><br/>
      <small className="text-muted">Source: {article.source.name}</small><br/>
    </div>
  </div>
)

export default Carousel;
