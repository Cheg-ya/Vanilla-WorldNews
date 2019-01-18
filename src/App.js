import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Publisher from './Publisher';
import List from './List';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyAP61JZLVgxBPXjK3YZvSv_LNG5YCKZLMY",
  authDomain: "vanilla-world-news.firebaseapp.com",
  databaseURL: "https://vanilla-world-news.firebaseio.com",
  projectId: "vanilla-world-news",
  storageBucket: "vanilla-world-news.appspot.com",
  messagingSenderId: "583004942698"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    const today = new Date().toISOString().slice(0, 10);

    this.state = {
      login: false,
      isLoaded: false,
      allLoaded: false,
      displayPublisher: false,
      scrollRequst: false,
      err: null,
      publishers: [],
      languages: [],
      keyWords: '',
      selected: [{id: "27", source: "daily-mail"}],
      page: 1,
      requestResult: [],
      request: false,
      type: null,
      today,
      dateFrom: today,
      dateTo: today
    };

    this.handleCreate = this.handleCreate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount () {
    fetch('https://newsapi.org/v2/sources?apiKey=e81a0da4bcf14753a24f74bceadae963')
    .then(res => res.json())
    .then((result) => {
      let sourceList = [];
      let languageList = new Set();

      result.sources.forEach(v => {
        sourceList.push({
          name: v.name,
          id: v.id
        });

        languageList.add(v.language);
      });

      languageList = Array.from(languageList);

      this.setState({
        isLoaded: true,
        publishers: this.state.publishers.concat(sourceList),
        languages: this.state.languages.concat(languageList)
      });

    },
    (err) => {
      this.setState({
        isLoaded: true,
        err
      });
    });
  }

  sourceRequest (data) {
    if (!this.state.type) {
      this.setState({
        isLoaded: false
      });
    } else {
      this.setState({
        scrollRequst: true
      });
    }

    if (this.state.allLoaded) {
      return;
    }

    console.log(this.state.page);
    const query = `q=${this.state.keyWords}`;
    const page = `page=${this.state.page}`;
    let from;

    if (this.state.dateTo === this.state.dateFrom) {
      from = '';

    } else {
      from = `$from=${this.state.dateFrom}&to=${this.state.dateTo}`;
    }

    let sourceLine = [];
 
    data.forEach(({ source }) => {
      sourceLine.push(source);
    });

    sourceLine = `sources=${sourceLine.join(',')}`;

    let url = `https://newsapi.org/v2/everything?${query}${from}&${sourceLine}&sortBy=popularity&${page}&pagesize=30&apiKey=e81a0da4bcf14753a24f74bceadae963`;
  
    fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw new Error(res.statusText);
      
    })
    .then(result => {
      const articles = result.articles;
      const prevResult = this.state.requestResult;
      let type = this.state.type;

      if (!articles.length && !type) {
        throw new Error('Not Found Article');
      }

      if (!articles.length && type) {
        alert('No More Articles');
        this.setState({
          allLoaded: true
        });
      }
      
      if (!type) {
        type = 'list';
      }
  
      this.setState({
        isLoaded: true,
        request: true,
        scrollRequst: false,
        type,
        requestResult: prevResult.concat(articles)
      });

    }, (err) => {
      this.setState({
        isLoaded: true,
        err: err.message
      });

    }).catch(err => {
      this.setState({
        isLoaded: true,
        err: err.message,
      });
    });
  }

  handleCreate (data) {
    let item = this.state.selected;

    if (!item.length) {
      this.setState({
        selected: item.concat(data)
      });
    }

    for (let i = 0; i < item.length; i++) {
      if (item[i].source === data.source) {
        this.setState({
          selected: item.slice(0,i).concat(item.slice(i + 1))
        });
        console.log(item);
        return;
      }

      if(i === item.length - 1) {
        this.setState({
          selected: item.concat(data)
        });
        console.log(item);
      }
    }
  }

  handleKeywordChange (keyWords) {
    this.setState({
      keyWords
    });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.sourceRequest(this.state.selected);
  }

  pageReload () {
    setTimeout(function () {
      this.setState({
        err: null
      });
    }.bind(this), 2000);
  }

  displayer (targetName) {
    const target = this.state[targetName];

    this.setState({
      [targetName]: !target
    });
  }

  viewTypeChangeToggle (targetName) {
    if (targetName.className ==='toMain') {
      this.setState({
        type: null
      });

      return;
    }
  
    if (targetName.className === 'listType') {
      this.setState({
        type: 'list'
      });

    } else {
      this.setState({
        type: 'card'
      });
    }
    
  }

  handleDateChange (target) {
    if (isNaN(target.valueAsNumber)) {
      return;
    }

    const selectedDate = new Date(target.valueAsNumber).toISOString().slice(0, 10)

    this.setState({
      [target.id]: selectedDate
    });
  }

  scrollingRequest () {
    this.setState({
      page: this.state.page + 1
    });

    this.sourceRequest(this.state.selected);
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      this.setState({
        login: true
      });
    }).catch(err => {
      this.setState({
        err: err.message
      });
    });
  }

  render() {
    const { login, type, err, isLoaded, publishers, requestResult, request, scrollRequst, displayPublisher, selected} = this.state;
    const { dateFrom, dateTo, today} = this.state;
  
    if (!login) {
      const style = {
        height: '38vh'
      }

      return (
        <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div style={style}>
                <fieldset>
                  <legend>Login</legend>
                  <button className="btnLogin" onClick={this.googleLogin.bind(this)}>Click To Login</button>
                </fieldset>
              </div>
          </header>
        </div>
      );
    }
  
    if (err) {
      return (
        <div className="App">
          <header className="App-header">
              <div>Error Message: {err}</div>
              <img src={logo} className="App-logo" alt="logo" />
              <div>Please Try Again</div>
              {this.pageReload()}
          </header>
        </div>
      );
    }

    if (!isLoaded) {
      const style = {
        height: '38vh'
      }

      return (
        <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div style={style}>Page Loading</div>
          </header>
        </div>
      );
    }

    if (request && type) {
      return (
        <div className="App">
          <button className={type === 'list' ? "cardType" : "listType"} onClick={(e) => this.viewTypeChangeToggle(e.currentTarget)}>card</button>
          <button name={type === 'list' ? "listType" : "cardType"} className="toMain" onClick={(e) => this.viewTypeChangeToggle(e.currentTarget)}>Main</button>
          {request ? <List articles={requestResult} type={type === 'list' ? 'list' : 'card'} onChange={this.scrollingRequest.bind(this)} isLoading={scrollRequst}/> : null}
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <fieldset className="inputField">
            <legend>World News!</legend>
            <form className="formContainer" onSubmit={this.handleSubmit}>
              <div className="keywordBox">
                <input name="keyWords" className="searchBox" type="text" placeholder="Topic" onChange={(e) => this.handleKeywordChange(e.target.value)} />
              </div>
              <fieldset className="filter">
                <legend>Filter</legend>
                <div className="dateBox">
                  <div>From</div>
                  <input type="date" id="dateFrom" className="dateInput" value={dateFrom} onChange={(e) => this.handleDateChange(e.target)} />
                </div>
                <div className="dateBox">
                  <div>To</div>
                  <input type="date" id="dateTo" className="dateInput" value={dateTo} onChange={(e) => this.handleDateChange(e.target)} max={today} />
                </div>
                <div className="displayPublisher" onClick={(e) => this.displayer(e.currentTarget.className)}>
                  <span>Select Publisher</span>
                </div>
              </fieldset>
              <button className="submitButton" type="submit">Click to Search</button>
            </form>
          </fieldset>
          {displayPublisher ? <Publisher sources={publishers} selected={selected} onCreate={this.handleCreate} onClick={(e) => this.displayer(e.currentTarget.className)} /> : null}
        </header>
      </div>
    );
  }
}

export default App;
