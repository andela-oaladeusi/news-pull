import React, { Component } from 'react';
import { withRouter } from 'react-router';
import queryString from 'query-string';
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 1, pagArray: [], cPage: 1 };
    this.queryObj = this.getQueryObj(this.props.location.search);
    this.setNewLinkWithPageValue = this.setNewLinkWithPageValue.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
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

  onChangePage(pageNumber) {
    this.setState({ page: pageNumber });
    this.props.history.push(this.setNewLinkWithPageValue(pageNumber));
  }

  render() {
    const { totalCount } = this.props;
    let totalPages = Math.ceil(totalCount/51);
    if (totalPages > 1000) {
      totalPages = 150;
    }
    return (
      <div className="row row align-items-center justify-content-center">
        <UltimatePagination 
         currentPage={this.state.page}
         totalPages={totalPages}
         boundaryPagesRange={2}
         hideEllipsis={false}
         hidePreviousAndNextPageLinks={true}
         hideFirstAndLastPageLinks={true}
         onChange={this.onChangePage}
       />
      </div>
    )
  }
}

export default withRouter(Pagination);
