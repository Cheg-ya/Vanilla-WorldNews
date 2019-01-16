import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Languages from './Language';
// import Category from './Category';
// import Country from './Country';
import Publisher from './Publisher';
import List from './List';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      displayPublisher: false,
      err: null,
      keyWords: '',
      publishers: [],
      languages: [],
      selected: [],
      request: false,
      requestResult: []
    };
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

  handleCreate = (data) => {
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

  handleChange = keyWords => { //키워드 입력
    this.setState({
      keyWords
    });
  }

  handleSubmit = e => { //submit
    debugger;
    e.preventDefault();
    this.sourceRequest(this.state.selected);
  }
  
  sourceRequest = (data) => {
    let query = this.state.keyWords;
    let sourceLine = [];

    data.forEach(({ source }) => {
      sourceLine.push(source);
    });

    sourceLine = sourceLine.join(',');

    let url = `https://newsapi.org/v2/everything?q=${query}&sources=${sourceLine}&sortBy=popularity&pagesize=30&apiKey=e81a0da4bcf14753a24f74bceadae963`;

    fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();

      } else {
        throw new Error(res.statusText);
      }
    })
    .then(result => {
      debugger;
      if (!result.articles.length) {
        throw new Error('Not found data');
      }

      this.setState({
        request: true,
        requestResult: this.state.requestResult.concat(result)
      });

    }, (err) => {
      this.setState({
        request: false,
        err: err.message
      });
    }).catch(err => {
      this.setState({
        err: err.message,
        request: false
      });
    });
  }

  pageReload = () => {
    setTimeout(() => {
      this.setState({
        err: null
      });
    }, 2000);
  }

  displayer = (targetName) => {
    const target = this.state[targetName];

    if (!target) {
      this.setState({
        [targetName]: true
      });

    } else {
      this.setState({
        [targetName]: false
      });
    }
  }

  render() {
    const { keyWords, err, isLoaded, publishers, requestResult, request, displayPublisher, selected} = this.state;

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
        height: '163px'
      }

      return (
        <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <div style={style}>Welcome to World News!</div>
          </header>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <fieldset className="inputField">
            <legend>World News!</legend>
            {/* start line */}
            <form className="formContainer" onSubmit={this.handleSubmit}>
              <div className="keywordBox">
                <label>KeyWords</label>
                <input name="keyWords" className="searchBox" type="text" placeholder="Topic" onChange={(e) => this.handleChange(e.target.value)} />
                {keyWords}
              </div>
              <div className="displayPublisher" onClick={(e) => this.displayer(e.currentTarget.className)}>
                <span>Select Publisher</span>
              </div>
              <input className="submitButton" type="submit" value="Click to Search" />
            </form>
          </fieldset>
          {displayPublisher ? <Publisher sources={publishers} selected={selected} onCreate={this.handleCreate} onClick={(e) => this.displayer(e.currentTarget.className)} /> : null}
        </header>
        {request ? <List data={requestResult} /> : null}
      </div>
    );
  }
}

export default App;

// <div className="checkBoxContiner">
//   {/* category 세부검색 */}
//   <div className="categoryBox hide" onClick={this.displayToggle}>
//     <label>Category</label>
//     <Category onCreate={this.handleCreate}/>
//   </div>
//   {/* language */}
//   <div className="languageBox hide" onClick={this.displayToggle}>
//     <label>Language</label>
//     <Languages sources={languages} onCreate={this.handleCreate} />
//   </div>
//   {/* country */}
//   <div className="countryBox hide" onClick={this.displayToggle}>
//     <label>Countries</label>
//     <Country onCreate={this.handleCreate} />
//   </div>
// </div>

// https://vanillacoding.slack.com/files/U4Y1084UW/FFF6MPC1K/-.js