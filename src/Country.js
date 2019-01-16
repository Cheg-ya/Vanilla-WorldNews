import React, { Component } from 'react';
import Checkbox from './Checkbox';

class Country extends Component {
    list = {
        selected: [],
        data: ['All Countries', 'ae', 'ar', 'at', 'au', 'be', 'bg', 'br', 'ca', 'ch', 'cn', 'co', 'cu', 'cz', 'de', 'eg', 'fr', 'gb',
         'gr', 'hk', 'hu', 'id', 'ie', 'il', 'in', 'it', 'jp', 'kr', 'lt', 'lv', 'ma', 'mx', 'my', 'ng', 'nl', 'no', 'nz', 'ph', 'pl',
          'pt', 'ro', 'rs', 'ru', 'sa', 'se', 'sg', 'si', 'sk', 'th', 'tr', 'tw', 'ua', 'us', 've', 'za']
    }

    handleChange = () => {
        console.log(this.props.onCreate);
        this.props.onCreate({});
    }

    createCheckBox = () => {
        return this.list.data.map((v, i) => (<Checkbox label={v} key={i} onChange={this.handleChange} />));
    }

    render () {
        return (
            <div className="countries">
                {this.createCheckBox()}
            </div>
        );
    }
}

export default Country;
