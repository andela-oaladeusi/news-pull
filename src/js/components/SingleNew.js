import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import '../../css/newssinglepage.css';
import { scrapeNew } from '../actions/News';
import LoadingIcon from './shared/LoadingIcon';

class SingleNew extends Component {
  
  componentDidMount() {
    console.log(this.props);
    const url = this.props.location.pathname.replace('/news/', '');
    this.props.scrapeNew(url);
  }
  
  render() {
    const { scrapeItem, isFetching } = this.props;
    return (
      <div className="container single-news-page-container">
        {
          scrapeItem.title && !isFetching ?
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
    isFetching: news.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleNew);
