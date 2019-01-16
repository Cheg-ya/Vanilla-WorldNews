import React, { Component } from 'react';
import Checkbox from './Checkbox';

class Category extends Component {
    list = {
        data: ['All Categories', 'Business', 'Entertainment', 'Health', 'Sports', 'Science', 'Technology']
    }

    handleChange = (e) => {
        this.props.onCreate({Category: [e.target.label.toLowerCase()]});
    }

    createCheckBox = () => {
        return this.list.data.map((v, i) => (<Checkbox label={v} key={i} onChange={this.handleChange} />));
    }

    render() {
        return (
            <div className="categories">
                {this.createCheckBox()}
            </div>
        );
    }
}

export default Category;
