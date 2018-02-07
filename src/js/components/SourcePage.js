import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sourceNews } from '../actions/News';
import NewsGrid from './shared/NewsGrid';
import LoadingIcon from './shared/LoadingIcon';
import Pagination from './shared/Pagination';

class SourcePage extends Component {
  constructor(props) {
    super(props);
    this.source = props.match.params.source;
  }

  componentDidMount() {
    const currentQueries = new URLSearchParams(this.props.location.search);
    const currentPage = parseInt(currentQueries.get('page'), 10);
    if(currentPage) {
      this.props.sourceNews({ source: this.source, page: currentPage });
    } else {
      this.props.sourceNews({ source: this.source, page: 1 });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextSource = nextProps.match.params.source;
    const currentSource = this.props.match.params.source;

    const currentQueries = new URLSearchParams(this.props.location.search);
    const currentPage = parseInt(currentQueries.get('page'), 10);

    const nextQueries = new URLSearchParams(nextProps.location.search);
    const nextPage = parseInt(nextQueries.get('page'), 10);

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
