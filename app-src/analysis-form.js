import React from 'react';
import ReactDOM from 'react-dom';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [], count: 1 };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(i, event) {
    let value = this.state.value.slice();
    value[i] = event.target.value;
    this.setState({ value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
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
        {this.createUI()}
        <input type='button' value='add more' onClick={this.addClick.bind(this)} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('analysisform'));