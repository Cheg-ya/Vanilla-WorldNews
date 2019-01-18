import React, { Component } from 'react';
import logo from './logo.svg';
import Modal from './Modal';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dispalyModal: false,
            id: null
        };
    }

    componentDidMount() {
        window.addEventListener('scroll', this.infiniteScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.infiniteScroll.bind(this));
    }

    scrollUp() {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    }

    infiniteScroll() {
        const bottom = document.body.offsetHeight - window.innerHeight - window.scrollY;
        const isLoading = this.props.isLoading;

        if ((bottom < 1 || bottom === 0) && !isLoading) {
            this.props.onChange();
        }
    }

    onClick (idx) {
        debugger;
        if (idx.className === 'listContainer' || idx.className === 'cardContainer') {
            this.setState({
                dispalyModal: !this.state.dispalyModal,
                id: null
            });    
        }

        if (typeof idx === 'number') {
            this.setState({
                dispalyModal: !this.state.dispalyModal,
                id: idx
            });
        }
    }

    createList () {
        const articles = this.props.articles;

        return articles.map(({source, title, author, urlToImage, publishedAt}, i) =>
        (
            <fieldset className="list" key={i} onClick={this.onClick.bind(this, i)}>
                <div className="titleName">{title}</div>
                <div className="author">{author ? author.slice(0,5) === 'https' ? source.name : author : source.name}</div>
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
                <div className="author">{author ? author.slice(0,5) === 'https' ? source.name : author : source.name}</div>
            </fieldset>
        ));
    }

    render () {
        const { type, articles } = this.props;
        const { dispalyModal, id } = this.state;

        if (type === 'list' && !dispalyModal) {
            return (
                <div className="listContainer">
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createList()}
                </div>
            );

        } else if (type === 'card' && !dispalyModal) {
            return (
                <div className="cardContainer">
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createCard()}
                </div>
            );
        }

        if (dispalyModal && type === 'list') {
            return (
                <div className="listContainer" onClick={(e) => this.onClick(e.target)}>
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createList()}
                    {this.state.dispalyModal ? <Modal idx={id} article={articles[id]}/> : null}
                </div>
            );

        } else if (dispalyModal && type === 'card') {
            return (
                <div className="cardContainer" onClick={(e) => this.onClick(e.target)}>
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createCard()}
                    {this.state.dispalyModal ? <Modal idx={id} article={articles[id]}/> : null}
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
