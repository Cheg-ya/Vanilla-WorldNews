import React, { Component } from 'react';
import Checkbox from './Checkbox';

class Languages extends Component {
    handleChange = () => {
        this.props.onCreate({});
    }

    createCheckBox = () => {
        return this.props.sources.map((v, i) => (<Checkbox label={v} key={i} onChange={this.handleChange} />));
    }

    render () {
        return (
            <div className="languages">
                {this.createCheckBox()}
            </div>
        );
    }
}

export default Languages;
