import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { encodeUrl } from '../../utils/decodeEncode';
import defaultImage from '../../../img/default.png';

const HeadLinesGrid = ({ articles }) => {
  return(
    <div className="row">
      {articles.map((article, index) => (
        <div className="col-lg-4 col-sm-6 headlines-items" key={index}>
          <div className="card h-100">
            <Link to={`/news/${encodeUrl(article.url)}`}><img className="card-img-top headlines-img" src={article.urlToImage? article.urlToImage : defaultImage} alt=""/></Link>
            <div className="card-body">
              <h4 className="card-title">
                <Link to={`/news/${encodeUrl(article.url)}`}>{article.title}</Link>
              </h4>
              <p className="card-text">{article.description}...<Link to={`/news/${encodeUrl(article.url)}`}>more</Link></p>
            </div>
            <div className="card-footer">
              <small className="text-muted">PublishedAt: {Moment(article.publishedAt).toString()}</small><br/>
              <small className="text-muted">Source: {article.source.name}</small><br/>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HeadLinesGrid;
