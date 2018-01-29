import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchGet } from '../actions/Home';

class Home extends Component {
  
  componentDidMount() {
    this.props.fetchGet();
  }

  render() {
    return (
      <div>
        { this.props.isFetching ? 'Still loading': this.props.data }
      </div>
    )
  }
}
const mapStateToProps = ({home}, ownProps) => {
  return {
    data: home.items,
    isFetching: home.isFetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGet: bindActionCreators(fetchGet, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
