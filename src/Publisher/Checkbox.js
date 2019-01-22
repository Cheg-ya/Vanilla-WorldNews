import React, { Component } from 'react';

class Checkbox extends Component {
  render() {
    const {onChange, sourceId, label, idx, checked} = this.props;
    const isChecked = onChange;

    return (
      <label className="checkBox">
        <input type="checkbox"
        name={sourceId}
        id={idx}
        checked={checked}
        onChange={isChecked}
      />{label}</label>
    );
  }
}

export default Checkbox;
