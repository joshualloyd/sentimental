import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emotion: false,
      sentiment: false,
      limit: 5,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + JSON.stringify(this.state));
    event.preventDefault();
    let documentId = location.pathname.split('/')[3];
    console.log('document id', documentId);
    let { emotion, sentiment, limit } = this.state;
    limit = parseInt(limit);
    axios
      .post(`/analyses/entities/document/${documentId}`, {
        emotion,
        sentiment,
        limit
      })
      .then(response => {
        // console.log('response from post', response.data.id);
        location.pathname = `/analyses/${response.data.id}`;
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="emotion"> Emotion</label>
        <input type="checkbox" id="emotion" name="emotion" checked={this.state.emotion} onChange={this.handleInputChange} />
        <label htmlFor="emotion">Sentiment</label>
        <input type="checkbox" id="sentiment" name="sentiment" checked={this.state.sentiment} onChange={this.handleInputChange} />
        <label htmlFor="limit" />
        <input type="number" id="limit" name="limit" placeholder="number" value={this.state.limit} onChange={this.handleInputChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('entitiesform'));