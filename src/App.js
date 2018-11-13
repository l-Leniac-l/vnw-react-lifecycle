import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.characters = [];

    this.state = {
      characters: []
    };

    this.search = this.search.bind(this);
  }

  async componentDidMount() {
    let result = await axios.get("http://hp-api.herokuapp.com/api/characters");

    this.characters = result.data;

    this.setState({
      characters: this.characters
    });
  }

  renderCharacters() {
    return this.state.characters.map((item, index) => {
      return <p key={index}>{item.name}</p>;
    });
  }

  search(event) {
    event.preventDefault();

    let text = event.target.value;

    if (text === "") {
      this.setState({
        characters: this.characters
      });
      return;
    }

    let results = this.characters.filter(item => {
      return item.name.toLowerCase().includes(text.toLowerCase());
    });

    this.setState({
      characters: results
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <input
            type="text"
            style={{ width: "500px", height: "50px", fontSize: "24px" }}
            onChange={this.search}
          />
          {this.renderCharacters()}
        </header>
      </div>
    );
  }
}

export default App;
