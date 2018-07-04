import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { LoadingIcon, NewsGrid } from './shared';
import { fetchNewsHeadlines } from '../actions';
import { Country } from '../utils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { country: 'Nigeria' }
  }

  componentDidMount() {
    const category = this.props.match.params.category
    this.setCountryState(this.props.newCountry);
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
      this.setCountryState(nextCountry);
      this.props.fetchNewsHeadlines(currentCategory);
    }
  }

  setCountryState(newCountry) {
    const countries = Country.allCountry();
    for (let i = 0; i < countries.length; i++) {
      if (countries[i].id === newCountry) {
        this.setState({ country: countries[i].name });
      }
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
            <br/>
            <p>{this.state.country} News Headlines</p>
            <hr/>
            {/*<div className="row my-4">
              <Carousel article={articles[0]} />
            </div>*/}
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
