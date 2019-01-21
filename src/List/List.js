import React, { Component } from 'react';
import Modal from '../Modal/Modal';
import defaultImg from '../default.jpg';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayModal: false,
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

    showModal (idx) {
        if (idx.className === 'modalBackground') {
            this.setState({
                displayModal: !this.state.displayModal,
                id: null
            });
        }

        if (typeof idx === 'number') {
            this.setState({
                displayModal: !this.state.displayModal,
                id: idx
            });
        }
    }

    createList () {
        const articles = this.props.articles;

        return articles.map(({description, source, title, author, urlToImage, publishedAt}, i) =>
        (
            <fieldset className="list" key={i} onClick={this.showModal.bind(this, i)}>
                <div className="contentCover">
                    <div className="listContent">
                        <h5 className="titleName">{title}</h5>
                        <div className="pubDate">{author ? author.slice(0, 5) === 'https' ? source.name : author.split(',')[0] : source.name} {publishedAt.slice(0,10)} {source.name}</div>
                        <p className="descript">{description ? description : null}</p>
                    </div>
                    <div className="listImg">
                        <img src={urlToImage === null || !urlToImage.length ? defaultImg : urlToImage} alt="" />
                    </div>
                </div>
            </fieldset>
        ));
    }

    createCard () {
        const articles = this.props.articles;

        return articles.map(({title, author, urlToImage, source}, i) =>
        (
            <fieldset className="card" key={i} onClick={this.showModal.bind(this, i)}>
                <div className="cardImg"><img src={urlToImage === null || !urlToImage.length ? defaultImg : urlToImage} alt="" /></div>
                <div className="cardContent">
                    <p className="titleName">{title}</p>
                    <div className="author">
                        <span>{author ? author.slice(0,5) === 'https' ? source.name : author.split(',')[0] : source.name}</span>
                        <div className="pub">{source.name}</div>
                    </div>
                </div>
            </fieldset>
        ));
    }

    render () {
        const { type, articles } = this.props;
        const { displayModal, id } = this.state;

        if (type === 'list' && !displayModal) {
            return (
                <div className="listContainer">
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createList()}
                </div>
            );

        } else if (type === 'card' && !displayModal) {
            return (
                <div className="cardContainer">
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createCard()}
                </div>
            );
        }

        if (displayModal && type === 'list') {
            return (
                <div className="listContainer">
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createList()}
                    {this.state.displayModal && <Modal idx={id} article={articles[id]} onClick={(e) => this.showModal(e.target)} />}
                </div>
            );

        } else if (displayModal && type === 'card') {
            return (
                <div className="cardContainer">
                    <div className="scrollUp" onClick={this.scrollUp}>
                        <i className="fas fa-arrow-alt-circle-up"></i>
                    </div>
                    {this.createCard()}
                    {this.state.displayModal && <Modal idx={id} article={articles[id]} onClick={(e) => this.showModal(e.target)} />}
                </div>
            );
        }
    }
}

export default List;
