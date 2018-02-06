import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import Source from '../utils/Source';
import HeadLinesGrid from './shared/HeadLinesGrid';
import LoadingIcon from './shared/LoadingIcon';

import { searchNews } from '../actions/News';

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      dropdownOpen: false,
      show: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  
  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const query = params.get('q');
    this.setState({query}, () => { this.searchCall(query) })
  }
  
  searchCall(query) {
    if(query) {
      this.setState({ show: true })
      this.props.searchNews({
        type: 'everything',
        language: 'en',
        query,
        pageSize: 50,
        page: 1
      });
    }
  }

  onChange(e) {
    this.setState({query: e.target.value}, () => {
      this.props.history.push(`/search/?q=${this.state.query}`);
      this.searchCall(this.state.query);
    })
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/?q=${this.state.query}`);
    this.searchCall(this.state.query);
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
          <HeadLinesGrid articles={articles}/>
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
