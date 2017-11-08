import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
  VictoryChart,
  VictoryTheme,
  VictoryGroup,
  VictoryArea,
  VictoryPolarAxis,
  VictoryLabel
} from 'victory';

// const characterData = [
//   { joy: 4, fear: 2, anger: 1, disgust: 4, sadness: 5 },
//   { joy: 2, fear: 1, anger: 2, disgust: 8, sadness: 3 }
// ];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.processData([{}]),
      maxima: this.getMaxima([{}])
    };
  }

  componentDidMount() {
    axios.get(`/analyses/${location.pathname.split('/')[3]}`)
      .then(response => {
        console.log('response', response);
        this.setState({
          data: this.processData(response.data.entities.map((entity) => {
            // let emotions = {};
            // for(let value in entity.emotion) {
            //   if()
            //   let newValue = value * 100;
            //   emo
            // }
            return entity.emotion;
          })),
          maxima: this.getMaxima(response.data.entities.map((entity) => {
            return entity.emotion;
          }))
        });
      })
      .catch(err => console.log(err));
  }

  getMaxima(data) {
    const groupedData = Object.keys(data[0]).reduce((memo, key) => {
      memo[key] = data.map((d) => d[key]);
      return memo;
    }, {});
    return Object.keys(groupedData).reduce((memo, key) => {
      memo[key] = Math.max(...groupedData[key]);
      return memo;
    }, {});
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
      <VictoryChart polar
        theme={VictoryTheme.material}
        domain={{ y: [0, 1] }}
      >
        <VictoryGroup colorScale={["gold", "orange", "tomato"]}
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
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));