import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Disqus from 'disqus-react';

import '../../css/newssinglepage.css';
import { scrapeNew } from '../actions';
import { LoadingIcon } from './shared';

class SingleNewPage extends Component {
  
  componentDidMount() {
    const url = this.props.match.params.url;
    this.props.scrapeNew(url);
  }
  
  render() {
    const { scrapeItem, isFetching, isError } = this.props;
    const disqusShortname = 'newshouse-1';
    const disqusConfig = {
        url: `http://newshouse.herokuapp.com${this.props.location.pathname}`,
        identifier: this.props.location.pathname.key,
        title: scrapeItem.title ? scrapeItem.title : null,
    };
    return (
      <div className="container single-news-page-container">
        {
          isError ? <div><p>An Error Occured</p></div> : scrapeItem.title && !isFetching ?
            <div className="row">
              <div className="col-lg-8">
                <h1 className="mt-4">{scrapeItem.title ? scrapeItem.title : 'Post Title'}</h1>
                <p className="lead">
                  {'Source:  '}
                  <Link target="_blank" to={scrapeItem.url}>{scrapeItem.domain}</Link>
                </p>
                <hr />
                <img
                  className="img-fluid rounded"
                  src={scrapeItem.lead_image_url}
                  alt=""
                />
                <hr />
                <p className="lead news-content-body" dangerouslySetInnerHTML={{__html: scrapeItem.content}}>
                </p> 
                <hr />
                <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
              </div>
            </div>
          :
          <LoadingIcon />
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    scrapeNew: bindActionCreators(scrapeNew, dispatch)
  }
}

const mapStateToProps = ({ news }) => {
  return {
    scrapeItem: news.scrapeItem,
    isFetching: news.isFetching,
    isError: news.isError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleNewPage);
