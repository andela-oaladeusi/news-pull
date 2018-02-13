import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { sourceNews } from '../actions';
import { NewsGrid, LoadingIcon, Pagination } from './shared';

class SourcePage extends Component {
  constructor(props) {
    super(props);
    this.source = props.match.params.source;
  }

  componentDidMount() {
    const currentPage = parseInt(this.getQueryObj(this.props.location.search).page, 10);
    if(currentPage) {
      this.props.sourceNews({ source: this.source, page: currentPage });
    } else {
      this.props.sourceNews({ source: this.source, page: 1 });
    }
  }
  
  getQueryObj(search) {
    return queryString.parse(search);
  }

  componentWillReceiveProps(nextProps) {
    const nextSource = nextProps.match.params.source;
    const currentSource = this.props.match.params.source;

    const currentPage = parseInt(this.getQueryObj(this.props.location.search).page, 10);
    const nextPage = parseInt(this.getQueryObj(nextProps.location.search).page, 10);

    if(nextPage && currentPage && currentPage !== nextPage) {
      this.props.sourceNews({ source: nextSource, page: nextPage });
    }

    if(nextSource !== currentSource) {
      this.source = nextSource;
      this.props.sourceNews({ source: nextSource, page: 1 });
    }
  }

  render() {
    const { articles, isFetching, isError } = this.props;
   return (
    <div className="container">
      { isError ? <div><p>An Error Occured</p></div> : articles.length < 1 || isFetching ?
        <div className="row my-4">
          <LoadingIcon />
        </div>
        :
      <div>
        <p>{this.source.toUpperCase()}</p>
        <NewsGrid articles={articles}/>
        <Pagination />
      </div>
      }
    </div>
   ) 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sourceNews: bindActionCreators(sourceNews, dispatch)
  }
}

const mapStateToProps = ({ news }) => {
  return {
    articles: news.newsItems,
    isFetching: news.isFetching,
    isError: news.isError
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourcePage);
