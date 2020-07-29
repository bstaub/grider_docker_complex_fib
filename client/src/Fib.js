import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {

  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    await axios.post('/api/values', { 
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ')
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          Für den index {key} habe ich berechnet {this.state.values[key]}
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="value">Gib deinen Index ein</label>
          <input type="text" id="value"
              value={this.state.index}
              onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Abschicken</button>
        </form>

        <h3>Indexes welche ich gesehen habe:</h3>
        {this.renderSeenIndexes()}

        <h3>Kalkulierte Werte:</h3>
        {this.renderValues()}
      </div>
    )
  }
}

