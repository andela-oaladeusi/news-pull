import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { searchNews } from '../../actions';

class SearchPopOver extends Component{
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      searchQuery: ''
    }
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      popoverOpen: false,
      searchQuery: e.target.value
    }, () => {
      this.makeSearch()
    });
  }

  makeSearch() {
    const payload = { 
      query: this.state.searchQuery,
      type: 'everything',
      pageSize: 21,
      page: 1,
      language: 'en'
    }
    this.props.searchNews(payload);
  }

  toggle() {
    this.setState({
      popoverOpen: false
    });
  }

  render() {
    return (
      [
        <form className="form-inline my-2 my-lg-0" key="1">
          <input id="SearchPopover" className="form-control mr-sm-2" onClick={this.toggle} onChange={this.onChange} type="text" placeholder="Search..." value={this.state.searchQuery}/>
        </form>,
        <div key="2">
          <Popover placement="bottom" isOpen={this.state.popoverOpen} target="SearchPopover" toggle={this.toggle} >
            <PopoverHeader>{`Search Results for ${this.state.searchQuery}`}</PopoverHeader>
            <PopoverBody>
              <div className="list-group">
                <div className="list-group-item list-group-item-action flex-column align-items-start">
                  <div className="d-flex justify-content-between">
                    <p className="mb-1">{this.props.articles.length > 2 ? this.props.articles[0].title : 'no article yet'}</p>
                    <small>3 days ago</small>
                  </div>
                  <small><a href="/" >read more...</a></small>
                </div>
              </div>
            </PopoverBody>
          </Popover>
      </div>
      ]
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    searchNews: bindActionCreators(searchNews, dispatch)
  }
}

const mapStateToProps = ({ news }) => {
  return {
    articles: news.newsItems,
    isFetching: news.isFetching
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPopOver);
