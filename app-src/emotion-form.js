import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: [],
      count: 1,
      document: false,
    };
    this.handleDocumentChange = this.handleDocumentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTargetChange(i, event) {
    let targets = this.state.targets.slice();
    targets[i] = event.target.value;
    this.setState({ targets });
  }

  handleDocumentChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
    let documentId = location.pathname.split('/')[3];
    console.log('document id', documentId);
    let { targets, document } = this.state;
    axios
      .post(`/analyses/emotion/document/${documentId}`, {
        targets,
        document
      })
      .then(response => {
        // console.log('response from post', response.data.id);
        location.pathname = `/analyses/chart/emotion/${response.data.id}`;
      })
      .catch(err => console.log(err));
  }

  addClick() {
    this.setState({ count: this.state.count + 1 })
  }

  removeClick(i) {
    let targets = this.state.targets.slice();
    targets.splice(i, 1);
    this.setState({
      count: this.state.count - 1,
      targets
    })
  }

  createUI() {
    let uiItems = [];
    for (let i = 0; i < this.state.count; i++) {
      uiItems.push(
        <div key={i}>
          <input type="text" className="form-control" value={this.state.targets[i] || ''} onChange={this.handleTargetChange.bind(this, i)} />
          <input type='button' value='remove' className="btn btn-danger" onClick={this.removeClick.bind(this, i)} />
        </div>
      )
    }
    return uiItems || null;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="document">Add Document to emotion analysis results</label>
          <input type="checkbox" className="form-control" id="document" name="document" checked={this.state.document} onChange={this.handleDocumentChange} />
        </div>
        <div className="form-group">
          <label>What are the words you would like to target</label>
          {this.createUI()}
        </div>
        <input type='button' className="btn btn-success" value='add more' onClick={this.addClick.bind(this)} />
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('emotionform'));