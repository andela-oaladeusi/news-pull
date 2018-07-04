import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

import { Source } from '../utils';
import { NewsGrid, LoadingIcon, Pagination } from './shared';

import { searchNews } from '../actions';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      dropdownOpen: false,
      show: false
    }
    this.queryObj = this.getQueryObj(props.location.search);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  
  componentDidMount() {
    let currentQ = this.getQueryObj(this.props.location.search).q;
    if(currentQ && currentQ.trim().length !== 0) {
    const currentPage = this.getQueryObj(this.props.location.search).page || 1;
    this.setState({ query: currentQ }, () => { this.searchCall(currentPage) })
    }
  }

  componentWillReceiveProps(nextProps) {
    const currentPage = parseInt(this.getQueryObj(this.props.location.search).page, 10) || 1;
    const currentQ = this.getQueryObj(this.props.location.search).q;

    const nextPage = parseInt(this.getQueryObj(nextProps.location.search).page, 10) || currentPage;
    const nextQ = this.getQueryObj(nextProps.location.search).q;

    if(nextPage !== currentPage && nextQ !== currentQ) {
      this.searchCall(nextPage);
    } else if(nextQ !== currentQ) {
      this.searchCall(nextPage);
    }
     else if(nextPage !== currentPage) {
      this.searchCall(nextPage);
    }
  }

  getQueryObj(search) {
    return queryString.parse(search);
  }

  setNewLinkWithQValue(page) {
    this.queryObj['q'] = this.state.query;
    this.queryObj['page'] = page;
    const newQueryString = queryString.stringify(this.queryObj);
    const { pathname } = this.props.location;
    return `${pathname}?${newQueryString}`;
  }
  
  searchCall(page=1) {
    if(this.state.query.trim().length !== 0) {
      this.setState({ show: true });
      this.props.searchNews({
        type: 'everything',
        language: 'en',
        query: this.state.query,
        pageSize: 21,
        page
      });
    }
  }



  onChange(e) {
    this.setState({ query: e.target.value }, () => {
      this.props.history.push(this.setNewLinkWithQValue(1));
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ query: e.target.value }, () => {
      this.props.history.push(this.setNewLinkWithQValue(1));
    });
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    const { articles, isFetching } = this.props;
    return (
      <div className="container search-container">
        <div className="row search-box">
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div className="form-row">
                <div className="col-12 col-md-9 mb-2 mb-md-0 input-group">
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret color="primary">
                      Filter by
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu">
                    { Source.allNewsSource().map((source, index) => (
                      <DropdownItem key={index}>{source.name}</DropdownItem>
                    )) }
                    </DropdownMenu>
                  </ButtonDropdown>
                  <input onChange={this.onChange} type="text" className="form-control" placeholder="Enter search queries here..." value={this.state.query}/>
                  <span className="input-group-btn">
                    <button className="btn btn-primary" type="button" onClick={this.onSubmit}><i className="fa fa-search fa-7x"></i></button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr/>
        { !this.state.show ? null : articles.length < 1 || isFetching ?
          <div className="row my-4">
            <LoadingIcon />
          </div>
          :
        <div>
          <p>SEARCH RESULTS </p>
          <NewsGrid articles={articles}/>
          <Pagination />
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
    newCountry: home.newCountry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchNews: bindActionCreators(searchNews, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
