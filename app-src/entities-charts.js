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

// const LegendItem = (props) => <li key={props.entity} className="list-item">{props.entity.name}</li>;

const Legend = ({ entities }) => (
  <ul className="list">
    {entities.map((entity, index) => <li key={index}>{entity.name}</li>)}
  </ul>
);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData([{}]),
      maxima: this.getMaxima([{}]),
      entities: []
    };
  }

  componentDidMount() {
    axios.get(`/analyses/${location.pathname.split('/')[4]}`)
      .then(response => {
        console.log('response', response);
        this.setState({
          data: this.processData(response.data.entities.map((entity) => {
            for (let value in entity.emotion) {
              entity.emotion[value] = entity.emotion[value] * 100;
            }
            return entity.emotion;
          })),
          maxima: this.getMaxima(response.data.entities.map((entity) => {
            return entity.emotion;
          })),
          entities: response.data.entities.map((entity) => {
            let entityObj = { name: entity.text };
            return entityObj;
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

  listEntities() {

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
        <Legend entities={this.state.entities} />
        <VictoryChart polar
          theme={VictoryTheme.material}
          domain={{ y: [0, 1] }}
        >
          <VictoryGroup colorScale={["gold", "orange", "tomato", "crimson", "firebrick"]}
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