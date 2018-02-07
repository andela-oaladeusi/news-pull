import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
    this.queryObj = this.getQueryObj(this.props.location.search);
    this.setNewLinkWithPageValue = this.setNewLinkWithPageValue.bind(this);
  }

  componentDidMount() {
    this.queryObj = this.getQueryObj(this.props.location.search);
    const page = parseInt(this.queryObj.page, 10);
    if(page) {
      this.setState({ page });
    }
  }

  componentWillReceiveProps(nextProps) {
    const nextQueryObj = this.getQueryObj(nextProps.location.search);
    const page = parseInt(nextQueryObj.page, 10);
    if(page && page !== this.state.page) {
      this.setState({ page });
      this.queryObj = nextQueryObj;
    }
  }

  getQueryObj(search) {
    return queryString.parse(search);
  }

  setNewLinkWithPageValue(value) {
    this.queryObj.page = value;
    const newQueryString = queryString.stringify(this.queryObj);
    const { pathname } = this.props.location;
    return `${pathname}?${newQueryString}`;
  }

  render() {
    const pages = [1, 2, 3, 4, 5];
    return (
      <div className="row row align-items-center justify-content-center">
        <nav aria-label="...">
          <ul className="pagination">
            <li className={this.state.page > 1 ? "page-item" : "page-item disabled"}>
              <Link className="page-link" to={this.setNewLinkWithPageValue(this.state.page-1)} tabIndex="-1">Previous</Link>
            </li>
            { pages.map((page, index) => (
              <li className={ page === this.state.page ? "page-item active" : "page-item"} key={index}>
                <Link className="page-link" to={this.setNewLinkWithPageValue(page)}>{page}<span className="sr-only">(current)</span></Link>
              </li>
            )) }
            <li className={this.state.page >= pages.length ? "page-item disabled" : "page-item"}>
              <Link className="page-link" to={this.setNewLinkWithPageValue(this.state.page+1)}>Next</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default withRouter(Pagination);
