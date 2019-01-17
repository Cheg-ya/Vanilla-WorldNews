import React, { Component } from 'react';

class Card extends Component {
    createCard () {
        const data = this.props.data[0].articles;

        return data.map(({title, author, urlToImage, source}, i) => 
            (
            <fieldset className="card" key={i}>
                <div className="cardImg"><img src={urlToImage} alt="" /></div>
                <div className="titleName">{title}</div>
                <div className="author">{author.slice(0,5) === 'https' ? source.name : author}</div>
            </fieldset>
            ));
    }

    render () {
        return (
            <div className="cardContainer">
                {this.createCard()}
            </div>
        );
    }
}

export default Card;
