import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import queryString from 'query-string';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, pagArray: [] };
    this.queryObj = this.getQueryObj(this.props.location.search);
    this.setNewLinkWithPageValue = this.setNewLinkWithPageValue.bind(this);
  }

  componentDidMount() {
    this.queryObj = this.getQueryObj(this.props.location.search);
    const page = parseInt(this.queryObj.page, 10);
    if(page) {
      this.setState({ page });
    }
    this.setState({ pagArray: this.paginationCount(this.props) });
  }

  componentWillReceiveProps(nextProps) {
    const currentTotalCount = this.props.totalCount;
    const nextTotalCount = nextProps.totalCount;
    const nextPageSize = nextProps.pageSize;
    const currentPageSize = this.props.pageSize;

    if(currentTotalCount !==  nextTotalCount) {
      this.setState({ pagArray: this.paginationCount(nextProps) })
    }

    if(currentPageSize !== nextPageSize) {
      this.setState({ pagArray: this.paginationCount(nextProps) })
    }

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

  paginationCount(value) {
    let pagArray = [];
    const { totalCount, pageSize } = value;
    const count = Math.round(totalCount/pageSize);
    for (let i = 1; i <= count; i++) {
      pagArray.push(i);
    }
    return pagArray;
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
