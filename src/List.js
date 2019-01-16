import React, { Component } from 'react';

class List extends Component {
    createList = () => {
        const data = this.props.data[0].articles;

        return data.map(({source, title, author, publishedAt}, i) => 
            (
            <div className="list">
                <h2 className="titleName">{title}</h2>
                <div className="author">{author}</div>
                <div>{source.id} / {publishedAt}</div>
            </div>
            ));
    }

    render() {
        // const article = this.props.data[0].articles;
        return (
            <main className="App-main">
                {this.createList()}
            </main>
        );
    }
}

export default List;