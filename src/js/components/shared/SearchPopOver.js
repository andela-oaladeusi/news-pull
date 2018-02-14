import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';

import { searchNewsPopOver } from '../../actions';
import { encodeUrl } from '../../utils';

class SearchPopOver extends Component{
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
      searchQuery: ''
    }
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      popoverOpen: true,
      searchQuery: e.target.value
    }, () => {
      this.makeSearch()
    });
  }

  makeSearch() {
    if(this.state.searchQuery.trim() !== '') {
      const payload = { 
        query: this.state.searchQuery.trim(),
        type: 'everything',
        pageSize: 40,
        page: 1,
        language: 'en',
      }
      this.props.searchNewsPopOver(payload);
    }
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  onClickViewMore() {
    this.props.history.push(`/sources?q=${this.state.searchQuery}&page=1`);
    this.setState({ popoverOpen: !this.state.popoverOpen });
  }

  render() {
    const { articles } = this.props;
    return (
      [
        <form className="form-inline my-2 my-lg-0" key="1">
          <input id="SearchPopover" className="form-control mr-sm-2" onClick={this.toggle} onChange={this.onChange} type="text" placeholder="Search..." value={this.state.searchQuery}/>
        </form>,
        <div key="2">
          { articles && articles.length > 2 ?
            <Popover placement="bottom" isOpen={this.state.searchQuery.trim() === '' ? false : this.state.popoverOpen} target="SearchPopover" toggle={this.toggle}>
              <PopoverHeader>{`Search Results for ${this.state.searchQuery}`}</PopoverHeader>
              <PopoverBody>
                <ul className="list-group list-group-flush">
                  { articles.map((article, index) => (
                    <li key={index} className="list-group-item">
                      <p>{article.title} ...<Link to={`/news/${encodeUrl(article.url)}`}>Read more</Link></p>
                      <small>{`Source: ${article.source.name}`}</small>
                    </li>))
                  }
                </ul>
                <button className="btn btn-outline-secondary btn-block" onClick={this.onClickViewMore}>View More Result</button>
              </PopoverBody>
            </Popover>
          :
          null
        }
      </div>
      ]
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    searchNewsPopOver: bindActionCreators(searchNewsPopOver, dispatch)
  }
}

const mapStateToProps = ({ news }) => {
  return {
    articles: news.newsPopOver,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPopOver));
