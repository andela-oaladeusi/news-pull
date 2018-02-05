import React from 'react';

const HeadLinesGrid = ({ articles }) => {
  return(
    <div className="row">
      {articles.map((article, index) => (
        <div className="col-lg-4 col-sm-6 headlines-items" key={index}>
          <div className="card h-100">
            <a href={article.url} target="_blank"><img className="card-img-top headlines-img" src={article.urlToImage} alt=""/></a>
            <div className="card-body">
              <h4 className="card-title">
                <a href={article.url} target="_blank">{article.title}</a>
              </h4>
              <p className="card-text">{article.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeadLinesGrid;
