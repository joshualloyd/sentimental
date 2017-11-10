import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel,
  VictoryLegend,
  VictoryContainer
} from 'victory';

// const fakeData = [
//   { joy: 0.4, fear: 2, anger: 1, disgust: 0.4, sadness: 0.5 },
//   { joy: 0.2, fear: 0.1, anger: 0.2, disgust: 0.8, sadness: 0.3 }
// ];

// const LegendItem = (props) => <li key={props.target} className="list-item">{props.target.name}</li>;
const legendColors = [
  { color: 'gold' }, { color: 'orange' }, { color: 'tomato' }, { color: 'crimson' }, { color: 'firebrick' },
  { color: '#ff4775' }, { color: 'ff47d1' }, { color: '#d147ff' }, { color: '#7547ff' }, { color: '#4775ff' }
];
const chartColors = [
  "gold", "orange", "tomato", "crimson", "firebrick",
  "#ff4775", "ff47d1", "#d147ff", "#7547ff", "#4775ff"
];

const Legend = ({ targets }) => (
  <ul className="list">
    {targets.map((target, index) => <li key={index} style={legendColors[index]}>{target.name}</li>)}
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData([{}]),
      maxima: this.getMaxima([{}]),
      targets: []
    };
  }

  componentDidMount() {
    axios.get(`/analyses/${location.pathname.split('/')[4]}`)
      .then(response => {
        console.log('response', response);
        if (response.data.emotion.document) {
          response.data.emotion.targets.push({
            text: 'document',
            emotion: response.data.emotion.document.emotion
          });
        }
        this.setState({
          data: this.processData(response.data.emotion.targets.map((target) => {
            for (let value in target.emotion) {
              target.emotion[value] = target.emotion[value] * 100;
            }
            return target.emotion;
          })),
          maxima: this.getMaxima(response.data.emotion.targets.map((target) => {
            return target.emotion;
          })),
          targets: response.data.emotion.targets.map((target) => {
            let targetObj = { name: target.text };
            return targetObj;
          })
        });
        console.log('state', this.state);
      })
      .catch(err => console.log(err));
  }

  getMaxima(data) {
    // const groupedData = Object.keys(data[0]).reduce((memo, key) => {
    //   memo[key] = data.map((d) => d[key]);
    //   return memo;
    // }, {});
    // console.log('grouped data', groupedData);
    // return Object.keys(groupedData).reduce((memo, key) => {
    //   memo[key] = Math.max(...groupedData[key]);
    //   return memo;
    // }, {});
    return { joy: 100, fear: 100, anger: 100, disgust: 100, sadness: 100 }
  }

  listTargets() {

  }

  processData(data) {
    const maxByGroup = this.getMaxima(data);
    const makeDataArray = (d) => {
      return Object.keys(d).map((key) => {
        return { x: key, y: d[key] / maxByGroup[key] };
      });
    };
    return data.map((datum) => makeDataArray(datum));
  }

  render() {
    return (
      <div>
        <Legend targets={this.state.targets} />
        <VictoryChart polar
          theme={VictoryTheme.material}
          domain={{ y: [0, 1] }}
        >
          <VictoryGroup colorScale={chartColors}
            style={{ data: { fillOpacity: 0.2, strokeWidth: 2 } }}
          >
            {this.state.data.map((data, i) => {
              return <VictoryArea key={i} data={data} />;
            })}
          </VictoryGroup>
          {
            Object.keys(this.state.maxima).map((key, i) => {
              return (
                <VictoryPolarAxis key={i} dependentAxis
                  style={{
                    axisLabel: { padding: 10 },
                    axis: { stroke: "none" },
                    grid: { stroke: "grey", strokeWidth: 0.25, opacity: 0.5 }
                  }}
                  tickLabelComponent={
                    <VictoryLabel labelPlacement="vertical" />
                  }
                  labelPlacement="perpendicular"
                  axisValue={i + 1} label={key}
                  tickFormat={(t) => Math.ceil(t * this.state.maxima[key])}
                  tickValues={[0.25, 0.5, 0.75]}
                />
              );
            })
          }
          <VictoryPolarAxis
            labelPlacement="parallel"
            tickFormat={() => ""}
            style={{
              axis: { stroke: "none" },
              grid: { stroke: "grey", opacity: 0.5 }
            }}
          />

        </VictoryChart>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));