import React, { Component } from 'react';

class List extends Component {
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        if (document.body.offsetHeight - window.innerHeight - window.scrollY <= 1) {
            this.props.onChange();
        }
    }

    createList () {
        const data = this.props.data;

        return data.map(({source, title, author, publishedAt}, i) =>
        (
            <fieldset className="list" key={i}>
                <div className="titleName">{title}</div>
                <div className="author">{author.slice(0,5) === 'https' ? source.name : author}</div>
                <div>{source.name} / {publishedAt}</div>
            </fieldset>
        ));
    }

    createCard () {
        const data = this.props.data;

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
        const { type } = this.props;

        if (type === 'list') {
            return (
                <div className="listContainer">
                    {this.createList()}
                </div>
            );
        } else {
            return (
                <div className="cardContainer">
                    {this.createCard()}
                </div>
            );
        }
    }
}

export default List;
