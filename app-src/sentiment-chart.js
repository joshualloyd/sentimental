import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  VictoryStack,
  VictoryBar,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme
} from 'victory';

// const dataA = [
//   { x: "Personal Drones", y: 57, mylabel: "positive" },
//   { x: "Smart Thermostat", y: 40, mylabel: "positive" },
//   { x: "Television", y: 38, mylabel: "positive" },
//   { x: "Smartwatch", y: 37, mylabel: "negative" }
// ];

const width = 500;
const height = 500;
const padding = { top: 80, bottom: 80, left: 20, right: 20 };

const Legend = ({ targets }) => (
  <ul className="list">
    {targets.map((target, index) => <li key={index}>{target.x}</li>)}
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      targets: []
      // document: this.processDocument({})
    };
  }

  componentDidMount() {
    axios.get(`/analyses/${location.pathname.split('/')[4]}`)
      .then(response => {
        console.log('response', response);
        if (response.data.sentiment.document) {
          response.data.sentiment.targets.push({
            text: 'document',
            label: response.data.sentiment.document.label,
            score: response.data.sentiment.document.score
          });
        }
        this.setState({
          targets: this.processTargets(response.data.sentiment.targets)
          // document: this.processDocument(response.data.sentiment.document)
        });
        console.log('state', this.state);
      })
      .catch(err => console.log(err));
  }

  processTargets(targetsArray) {
    return targetsArray.map((target) => {
      let targetObj = {
        x: target.text,
        myLabel: target.label,
        y: target.score * 100
      };
      return targetObj;
    })
  }

  processDocument(documentObj) {
    return {
      x: "document",
      myLabel: documentObj.label,
      y: documentObj.score
    };
  }

  render() {
    return (
      <div>
        <Legend targets={this.state.targets} />
        <svg viewBox={`0 0 ${width} ${height}`}
          style={{ width: "100%", height: "auto" }}
        >
          <VictoryStack horizontal
            standalone={false}
            theme={VictoryTheme.material}
            domain={{ x: [-100, 100] }}
            padding={padding}
            height={height}
            width={width}
            style={{ data: { width: 20 }, labels: { fontSize: 11 } }}
          >
            <VictoryBar
              style={{
                data: {
                  fill: (d) => d.myLabel == 'positive' ? 'yellowgreen' : 'tomato',
                  stroke: (d) => d.myLabel == 'positive' ? 'yellowgreen' : 'tomato',
                  fillOpacity: 0.5,
                  strokeWidth: 3
                }
              }}
              data={this.state.targets}
              y={(d) => d.myLabel == 'positive' ? d.y : -d.y}
              labels={(d) => `${d.y}% ${d.x}`}
            />
          </VictoryStack>
          <VictoryAxis dependentAxis
            height={height}
            width={width}
            padding={padding}
            style={{
              axis: { stroke: "transparent" },
              ticks: { stroke: "transparent" },
              tickLabels: { fontSize: 11, fill: "black" }
            }}
            /*
              Use a custom tickLabelComponent with
              an absolutely positioned x value to position
              your tick labels in the center of the chart. The correct
              y values are still provided by VictoryAxis for each tick
            */
            tickLabelComponent={<VictoryLabel x={250} textAnchor="middle" />}
            tickValues={this.state.targets.map((point) => point.x).reverse()}
          />
        </svg>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));