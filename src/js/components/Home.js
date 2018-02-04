import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Carousel from './shared/Carousel';
import LoadingIcon from './shared/LoadingIcon';
import NewsGrid from './shared/NewsGrid';

import { fetchNewsHeadlines } from '../actions/News';

class Home extends Component {

  componentDidMount() {
    this.props.fetchNewsHeadlines();
  }

  render() {
    const { articles, isFetching } = this.props;
    return (
      <div className="container second">
        { articles.length < 1 ?
          <div className="row my-4">
            <LoadingIcon />
          </div>
          :
          <div>
            <div className="row my-4">
              <Carousel articles={articles} isFetching={isFetching}/>
            </div>
            <div className="row">
              <NewsGrid />
            </div>
          </div>
        }
      </div>
    )
  }
}
const mapStateToProps = ({home, news}, ownProps) => {
  return {
    articles: news.newsItems,
    isFetching: news.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsHeadlines: bindActionCreators(fetchNewsHeadlines, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
