import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      count: 1,
      document: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    let documentId = location.pathname.split('/')[3];
    console.log('document id', documentId);
    let { value, document } = this.state;
    axios
      .post(`/analyses/document/${documentId}`, {
        value,
        document
      })
      .then(response => {
        // console.log('response from post', response.data.id);
        location.pathname = `/analyses/${response.data.id}`;
      })
      .catch(err => console.log(err));
  }

  addClick() {
    this.setState({ count: this.state.count + 1 })
  }

  removeClick(i) {
    let value = this.state.value.slice();
    value.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      value
    })
  }

  createUI() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div key={i}>
          <input type="text" value={this.state.value[i] || ''} onChange={this.handleChange.bind(this, i)} />
          <input type='button' value='remove' onClick={this.removeClick.bind(this, i)} />
        </div>
      )
    }
    return uiItems || null;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="document">Add Document to sentiment analysis results</label>
        <input type="checkbox" id="document" name="document" checked={this.state.emotion} onChange={this.handleInputChange} />
        <label>What are the words you would like to target</label>
        {this.createUI()}
        <input type='button' value='add more' onClick={this.addClick.bind(this)} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('sentimentform'));