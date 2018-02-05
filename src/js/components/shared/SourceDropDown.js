import React, { Component } from 'react';
import Source from '../../utils/Source';

class SourceDropDown extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      setSource: 'cnn'
    }
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ setSource: e.target.value });
  }
  render() {
    return (
      <select className="form-control select-country" onChange={this.onChange} value={this.state.setSource} >
        {Source.allNewsSource().map((source, index) => (
          <option value={source.id} key={index}>{source.name}</option>
        ))}
      </select>
    )
  }
}


export default SourceDropDown;
