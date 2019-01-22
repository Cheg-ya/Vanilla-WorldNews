import React, { Component } from 'react';
import Checkbox from './Checkbox';
import './Publisher.css';

class Publisher extends Component {
    isChecked (target) {
        const { selectedPubs } = this.props;

        if (selectedPubs.length >= 20) {
            if(selectedPubs.some(({ id }) => id === target.id)) {
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
        const { sources, selectedPubs } = this.props;

        return sources.map(({ id, name }, i) =>
        (
            <Checkbox
                sourceId={id}
                label={name}
                idx={i}
                key={i}
                onChange={(e) => this.isChecked(e.target)}
                checked={selectedPubs.length && (selectedPubs.some(v => +(v.id) === i)) ? true : false}
            />
        ));
    }

    render () {
        const { selectedPubs, onClick } = this.props;
        const displayer = onClick;

        return (
            <fieldset className="pubContainer">
                <legend>Publisher List {selectedPubs.length}/20</legend>
                <div className="displayPublisher" onClick={displayer}><i className="fas fa-times"></i></div>
                <div className="pubBox">
                    {this.createCheckBox()}
                </div>
            </fieldset>
        );
    }
}

export default Publisher;
