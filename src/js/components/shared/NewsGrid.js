import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'moment';
import { TwitterShareButton } from 'react-share';
import { UncontrolledTooltip } from 'reactstrap';

import { encodeUrl } from '../../utils';
import defaultImage from '../../../img/default.png';

const NewsGrid = ({ articles }) => {
  return(
    <div className="row">
      {articles.map((article, index) => article.url ?
      (
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
              <small className="text-muted">
                <div>
                  <UncontrolledTooltip placement="right" target={`shareTooltip-${index}`}>
                    Click to share on twitter
                  </UncontrolledTooltip>
                  <div>
                    <TwitterShareButton
                    url={article.url}
                    title={article.title}
                    via='olawalequest'
                    hashtags={['NewsHomeNg']}>
                      <i className='fa fa-twitter'
                        style={{ color: '#0FAEED', fontSize: '24px', lineHeight: '40px' }}
                        id={`shareTooltip-${index}`}
                      />
                    </TwitterShareButton>
                  </div>
                </div>
              </small>
            </div>
          </div>
        </div>
      )
      : null
      )}
    </div>
  )
}

export default NewsGrid;
