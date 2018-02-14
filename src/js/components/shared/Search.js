import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import { ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';

import { Source } from '../../utils';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      dropdownOpen: false,
      show: false,
      filterBy: {
        id: 'all',
        name: 'All'
      }
    }
    this.queryObj = this.getQueryObj(props.location.search);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
    this.onClickFilter = this.onClickFilter.bind(this);
  }

  
  componentDidMount() {
    let currentQ = this.getQueryObj(this.props.location.search).q;
    if(currentQ && currentQ.trim().length !== 0) {
    this.setState({ query: currentQ });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextQ = this.getQueryObj(nextProps.location.search).q;
    const currentQ = this.getQueryObj(this.props.location.search).q
    if(currentQ !== nextQ) {
      this.setState({query: nextQ});
    }
  }

  getQueryObj(search) {
    return queryString.parse(search);
  }

  setNewLinkWithQValue(page) {
    this.queryObj['q'] = this.state.query;
    this.queryObj['page'] = page;
    this.queryObj['filterBy'] = this.state.filterBy.id;
    const newQueryString = queryString.stringify(this.queryObj);
    const { pathname } = this.props.location;
    return `${pathname}?${newQueryString}`;
  }

  onChange(e) { 
    this.setState({ query: e.target.value }, () => {
      this.props.history.push(this.setNewLinkWithQValue(1));
    });
  }

  onClickFilter(event) {
    this.setState({ filterBy: { id: event.target.value, name: event.target.innerText } }, () => {
      this.props.history.push(this.setNewLinkWithQValue(1));
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.history.push(this.setNewLinkWithQValue(1));
  }

  toggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <div className="container search-container">
        <div className="row search-box">
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <form>
              <div className="form-row">
                <div className="col-12 col-md-9 mb-2 mb-md-0 input-group">
                  <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret color="primary">
                      { this.state.filterBy.name }
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu">
                    { Source.allNewsSource().map((source, index) => (
                      <DropdownItem key={index} onClick={this.onClickFilter} value={source.id}>{source.name}</DropdownItem>
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
      </div>
    )
  }
}


export default withRouter(Search);
