import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sourceNews } from '../actions/News';
import NewsGrid from './shared/NewsGrid';
import LoadingIcon from './shared/LoadingIcon';

class SourcePage extends Component {
  constructor(props) {
    super(props);
    this.source = props.match.params.source;
    props.sourceNews({ source: this.source, page: 1 });
  }

  componentWillReceiveProps(nextProps) {
    const nextSource = nextProps.match.params.source;
    const currentSource = this.props.match.params.source;

    if(nextSource !== currentSource) {
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
