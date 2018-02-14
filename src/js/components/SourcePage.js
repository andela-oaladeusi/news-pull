import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { sourceNews } from '../actions';
import { NewsGrid, LoadingIcon, Pagination, Search } from './shared';

class SourcePage extends Component {
  constructor(props) {
    super(props);
    this.source = 'All';
  }

  componentDidMount() {
    const search = this.props.location.search;
    const currentPage = parseInt(this.getQueryObj(search).page, 10) || 1;
    const currentQ = this.getQueryObj(search).q || '';
    const currentFilter = this.getQueryObj(search).filterBy || 'all';
    const payload = { page: currentPage, q: currentQ, filterBy: currentFilter };
    this.makeCall(payload);
  }

  makeCall(payload) {
    this.props.sourceNews(payload);
  }
  
  getQueryObj(search) {
    return queryString.parse(search);
  }

  componentWillReceiveProps(nextProps) {
    const currentPage = parseInt(this.getQueryObj(this.props.location.search).page, 10);
    const nextPage = parseInt(this.getQueryObj(nextProps.location.search).page, 10) || 1;

    const currentQ = this.getQueryObj(this.props.location.search).q
    const nextQ = this.getQueryObj(nextProps.location.search).q

    const currentFilterBy = this.getQueryObj(this.props.location.search).filterBy
    const nextFilterBy = this.getQueryObj(nextProps.location.search).filterBy

    const search = { page: nextPage, q: nextQ, filterBy: nextFilterBy };

    if(nextPage && currentPage && currentPage !== nextPage) {
      this.makeCall(search);
    }
    if(nextQ !== currentQ) {
      this.makeCall(search);
    }
    if(nextFilterBy !== currentFilterBy) {
      this.makeCall(search);
    }
  }

  render() {
    const { articles, isFetching, isError, totalCount } = this.props;
   return (
    <div className="container search-container">
      <Search />
      { isError ? <div><p>An Error Occured</p></div> : articles.length < 1 || isFetching ?
        <div className="row my-4">
          <LoadingIcon />
        </div>
        :
      <div>
        <p>{this.source.toUpperCase()}</p>
        <NewsGrid articles={articles}/>
        <Pagination totalCount={totalCount} pageSize={20}/>
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
    isError: news.isError,
    totalCount: news.itemsCount
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SourcePage);
