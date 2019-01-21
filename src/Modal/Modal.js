import React, { Component } from 'react';
import defaultImg from '../default.jpg';
import './Modal.css';

class Modal extends Component {
    componentDidMount () {
        window.document.body.style.overflow = 'hidden';
    }

    componentWillUnmount () {
        window.document.body.style.overflow = 'auto';
    }

    render() {
        const { article, idx, onClick } = this.props;
        const { source, title, author, urlToImage, publishedAt, url, description, content } = article;

        return (
            <div className="modalBackground" onClick={onClick}>
                <fieldset className="modalContainer" id={idx}>
                    <div className="modal">
                        <a className="imgCover" href={url}>
                            <img className="modalImg" src={urlToImage === null || !urlToImage.length ? defaultImg : urlToImage} alt="" />
                        </a>
                        <div className="modalContent">
                            <h5 className="title">{title}</h5>
                            <h5 className="author">{author ? author.slice(0,5) === 'https' ? source.name : author.split(',')[0] : source.name}</h5>
                            <p className="decript">{description ? description : null}</p>
                            <p className="content">{content ? content.split('[')[0] : null}</p>
                            <div className="date">
                                <div className="pub">{source.name}</div>
                                <div className="date">{publishedAt.slice(0, 10)}</div>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </div>
        );
    }
}

export default Modal;
