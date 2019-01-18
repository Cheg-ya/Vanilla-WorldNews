import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from './Modal';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: null
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll.bind(this));
    }

    onScroll() {
        const bottom = document.body.offsetHeight - window.innerHeight - window.scrollY;

        if (bottom < 1 || bottom === 0) {
            this.props.onChange();
        }
    }

    onClick (idx) {
        if (typeof idx !== 'number') {
            this.setState({
                modal: !this.state.modal,
                id: null
            });    
        }

        this.setState({
            modal: !this.state.modal,
            id: idx
        });
    }

    createList () {
        const articles = this.props.articles;

        return articles.map(({source, title, author, urlToImage, publishedAt}, i) =>
        (
            <fieldset className="list" key={i} onClick={this.onClick.bind(this, i)}>
                <div className="titleName">{title}</div>
                <div className="author">{author.slice(0,5) === 'https' ? source.name : author}</div>
                <div>{source.name} / {publishedAt}</div>
                {/* <div className="listImg"><img src={urlToImage} alt="" /></div> */}
            </fieldset>
        ));
    }

    createCard () {
        const articles = this.props.articles;

        return articles.map(({title, author, urlToImage, source}, i) => 
        (
            <fieldset className="card" key={i} onClick={this.onClick.bind(this, i)}>
                <div className="cardImg"><img src={urlToImage} alt="" /></div>
                <div className="titleName">{title}</div>
                <div className="author">{author.slice(0,5) === 'https' ? source.name : author}</div>
            </fieldset>
        ));
    }

    render () {
        const { type, articles } = this.props;
        const { modal, id } = this.state;

        if (type === 'list' && !modal) {
            return (
                <div className="listContainer">
                    {this.createList()}
                </div>
            );

        } else if (type === 'card' && !modal) {
            return (
                <div className="cardContainer">
                    {this.createCard()}
                </div>
            );
        }

        if (modal && type === 'list') {
            return (
                <div className="listContainer" onClick={this.onClick.bind(this)}>
                    {this.createList()}
                    {this.state.modal ? <Modal idx={id} article={articles[id]}/> : null}
                </div>
            );

        } else if (modal && type === 'card') {
            return (
                <div className="cardContainer">
                    {this.createCard()}
                    {this.state.modal ? <Modal idx={id} article={articles[id]}/> : null}
                </div>
            );
        }

        return (
            <div className="App">
              <header className="App-header">
                  <div>Unexpected Error Occurred</div>
                  <img src={logo} className="App-logo" alt="logo" />
                  <div>Please Try Again</div>
              </header>
            </div>
        );
    }
}

export default List;
