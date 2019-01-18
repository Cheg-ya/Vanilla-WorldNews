import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    const { onChange, sourceId, label, idx, checked} = this.props;

    return (
      <label className="checkBox">
        <input type="checkbox"
        name={sourceId}
        id={idx}
        checked={checked}
        onChange={onChange}
      />{label}</label>
    );
  }
}

export default Checkbox;
