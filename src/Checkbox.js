import React, { Component } from 'react';

class Checkbox extends Component {
    render() {
      let { sourceId, label, onChange, idx, checked} = this.props;

      return (
        <div className="checkBox">
            <input type="checkbox"
              name={sourceId}
              id={idx}
              onChange={onChange}
              checked={checked}
            />
            <label>{label}</label>
        </div>
      );
    }
}

export default Checkbox;
