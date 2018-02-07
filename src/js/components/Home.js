import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Carousel from './shared/Carousel';
import LoadingIcon from './shared/LoadingIcon';
import NewsGrid from './shared/NewsGrid';

import { fetchNewsHeadlines } from '../actions/News';

class Home extends Component {

  componentDidMount() {
    const category = this.props.match.params.category
    this.props.fetchNewsHeadlines(category);
  }

  componentWillReceiveProps(nextProps) {
    const nextCategory = nextProps.match.params.category;
    const currentCategory = this.props.match.params.category;

    const nextCountry = nextProps.newCountry;
    const currentCountry = this.props.newCountry;

    if(nextCategory !== currentCategory) {
      this.props.fetchNewsHeadlines(nextCategory);
    } else if(nextCountry !== currentCountry) {
      this.props.fetchNewsHeadlines(currentCategory);
    }
  }

  render() {
    const { articles, isFetching, isError } = this.props;
    return (
      <div className="container second">
        { isError ? <div><p>An Error Occured</p></div> : articles.length < 1 || isFetching ?
          <div className="row my-4">
            <LoadingIcon />
          </div>
          :
          <div>
            <div className="row my-4">
              <Carousel article={articles[0]} />
            </div>
            <div className="row">
              <NewsGrid articles={articles}/>
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
    isFetching: news.isFetching,
    newCountry: home.newCountry,
    isError: news.isError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchNewsHeadlines: bindActionCreators(fetchNewsHeadlines, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
