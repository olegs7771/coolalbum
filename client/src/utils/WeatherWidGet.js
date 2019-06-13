import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";

class WeatherWidGet extends Component {
  state = {
    weather: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      this.setState({
        weather: this.props.weather
      });
    }
  }

  render() {
    const { weather } = this.state;
    let weatherContent;
    let dayTime;
    let desc;
    if (weather.weather) {
      const { data1, data2, location, daytime } = weather.weather;
      console.log("daytime", daytime);
      console.log("Date.now()", Date.now());

      //description
      desc = <div>{data1.description}</div>;
      if (daytime.sunrise < Date.now() || daytime.sunset > Date.now()) {
        dayTime = (
          <div>
            <i className="  far  fa-sun  " />
          </div>
        );
      } else {
        dayTime = (
          <div>
            <i className="  far  fa-moon  " />
          </div>
        );
      }

      weatherContent = (
        <div className="row">
          <div className="col">
            <div className="text-success ">
              {location} {""}
              <span className="text-white">
                {" "}
                {Math.trunc(data2.temp)}
                {""}&#176;
              </span>
              <br />
              {/* {Show current time} */}
              <span className="text-white">
                {moment(Date.now()).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <div className="col">
            <div>
              {dayTime}
              {desc}
            </div>
          </div>
        </div>
      );
    } else {
      weatherContent = <div className="text-danger">getting data...</div>;
    }

    return <div className="text-white">{weatherContent}</div>;
  }
}

const mapStateToProps = state => ({
  weather: state.weather
});
export default connect(
  mapStateToProps,
  {}
)(WeatherWidGet);
