import React from 'react';

const Carousel = ({ article }) => (
  <div className="row my-4">
    <div className="col-lg-8">
      <img className="img-fluid rounded first" src={article.urlToImage} alt=""/>
    </div>
    <div className="col-lg-4">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a className="btn btn-primary" target="_blank" href={article.url}>Read More...</a>
      <p>Author: {article.author}</p>
      <p>Published Date{article.publishedAt}</p>
      <p>Source: {article.source.name}</p>
    </div>
  </div>
)

export default Carousel;
