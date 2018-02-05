import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Country from '../../utils/Country';
import { setNewCountry } from '../../actions/Home';

class CountryDropDown extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      setCountry: this.props.setCountry
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ setCountry: e.target.value });
    Country.setCountry(e.target.value);
    console.log(e.target.value);
    this.props.setNewCountry(e.target.value);
  }
  render() {
    return (
      <select className="form-control select-country" onChange={this.onChange} value={this.state.setCountry} >
        {Country.allCountry().map((country, index) => (
          <option value={country.id} key={index}>{country.name}</option>
        ))}
      </select>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setNewCountry: bindActionCreators(setNewCountry, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(CountryDropDown);
