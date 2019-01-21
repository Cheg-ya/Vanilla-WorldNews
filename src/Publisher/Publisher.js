import React, { Component } from 'react';
import Checkbox from './Checkbox';
import './Publisher.css';

class Publisher extends Component {
    isChecked (target) {
        const { selected } = this.props;

        if (selected.length >= 20) {
            if(selected.some(({ id }) => id === target.id)) {
                this.props.onCreate({
                    id: target.id,
                    source: target.name
                });

                target.checked = false;

                return;
            }

            target.checked = false;
            return alert('FULL!');
        }

        this.props.onCreate({
            id: target.id,
            source: target.name
        });
    }

    createCheckBox () {
        const { sources, selected } = this.props;

        return sources.map(({ id, name }, i) =>
        (
            <Checkbox
                sourceId={id}
                label={name}
                idx={i}
                key={i}
                onChange={(e) => this.isChecked(e.target)}
                checked={selected.length && (selected.some(v => +(v.id) === i)) ? true : false}
            />
        ));
    }

    render () {
        const { selected, onClick } = this.props;
        const displayer = onClick;

        return (
            <fieldset className="pubContainer">
                <legend>Publisher List {selected.length}/20</legend>
                <div className="displayPublisher" onClick={displayer}><i className="fas fa-times"></i></div>
                <div className="pubBox">
                    {this.createCheckBox()}
                </div>
            </fieldset>
        );
    }
}

export default Publisher;
