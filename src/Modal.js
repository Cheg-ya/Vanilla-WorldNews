import React, { Component } from 'react';

class Modal extends Component {
    render() {
        const { article, idx } = this.props;
        const { source, title, author, urlToImage, publishedAt, url, description, content } = article;

        return (
            <fieldset className="modalContainer" id={idx}>
                <legend>Detail View</legend>
                <div className="modal">
                    <div>{title}</div>
                    <div>{author.slice(0,5) === 'https' ? source.name : author}</div>
                    <div>{publishedAt}</div>
                    <div>
                        <img src={urlToImage} alt="" />
                    </div>
                    <div>{description}</div>
                    <div>{content}</div>
                    <div>{url}</div>
                    <div>{source.name}</div>
                </div>
            </fieldset>
        );
    }
}

export default Modal;