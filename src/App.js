import React, { Component } from 'react';
import axios from 'axios'
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import IoIosSearchStrong from 'react-icons/lib/io/ios-search-strong';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
      food: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  getData() {
    let test = `http://food2fork.com/api/search?key=a113c92066b0caeee951686d8d921576&q=${this.state.food}`
    axios.get(test)
      .then(response => {
        this.setState({
          results: response.data.recipes
        });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  componentDidMount() {
    this.getData();
  }

  handleChange(event){
    this.setState({food: event.target.value}, this.getData);
  }

  renderGroup() {
    const objectResults = Object.values(this.state.results);
    let rows = [], cols = [];
    objectResults.map((result, index) => {
      cols.push(
        <div className="col-md-3" key={index}>
          <div className="card foodCard">
            <div className="foodCardImageWrap">
              <img src={result.image_url} alt="recipe image" className="card-img-top foodCardImage" />
            </div>
            <div className="card-body foodCardBody">
              <div className="card-title">{result.title}</div>
            </div>
          </div>
        </div>
      )
      if ((index+1) % 4 == 0) {
        rows.push(
            <div className="row foodRow" key={index}>{cols}</div>
        );
        cols = []
      }
    })
    return rows;
  }

  render() {
    return (
      <div className="mainContainer">
        <div className="searchForm">
          <input type="text"
            value={this.state.food}
            onChange={this.handleChange}
            className="searchInput" placeholder="Search Ingredients..." />
          <div className="searchIcon">
            <IoIosSearchStrong size={40} color="#e85454" />
          </div>
        </div>
        <div className="container-fluid">
          {this.renderGroup()}
        </div>
      </div>
    );
  }
}

export default App;
