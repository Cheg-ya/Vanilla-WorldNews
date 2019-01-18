import React, { Component } from 'react';

class Modal extends Component {
    componentDidMount () {
        window.document.body.style.overflow = 'hidden';
    }

    componentWillUnmount () {
        window.document.body.style.overflow = 'auto';
    }

    render() {
        const { article, idx } = this.props;
        const { source, title, author, urlToImage, publishedAt, url, description, content } = article;

        return (
            <div className="modalBackground">
                <fieldset className="modalContainer" id={idx}>
                    <legend>Detail View</legend>
                    <div className="modal">
                        <div>{title}</div>
                        <div>{author ? author.slice(0,5) === 'https' ? source.name : author : source.name}</div>
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
            </div>
        );
    }
}

export default Modal;
