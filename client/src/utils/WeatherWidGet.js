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
    let skyCon;
    if (weather.weather) {
      const { data1, data2, location, daytime } = weather.weather;
      // console.log("daytime", daytime);
      // console.log("Date.now()", Date.now());

      //description
      // <div>{data1.description}</div>;
      if (daytime.sunrise < Date.now() || daytime.sunset > Date.now()) {
        dayTime = true;
        // console.log("daytime", dayTime);
      } else {
        dayTime = false;
        // console.log("daytime", daytime);
      }
      // console.log("data1.description", data1.description);

      //sky condition (scattered clouds)
      if (data1.description === "scattered clouds" && dayTime) {
        skyCon = <i className="fas fa-cloud-sun" />;
      } else {
        skyCon = <i className="fas fa-cloud-moon" />;
      }

      //sky condition (	clear sky)
      if (data1.description === "clear sky" && dayTime) {
        skyCon = <i className="far fa-sun" />;
      } else {
        skyCon = <i className="fas fa-moon" />;
      }

      //sky condition (	few clouds)
      if (data1.description === "few clouds" && dayTime) {
        skyCon = <i className="fas fa-cloud" />;
      }
      if (data1.description === "few clouds") {
        skyCon = <i className="fas fa-cloud" />;
      }
      //sky condition (	rain)
      if (data1.description === "rain" && dayTime) {
        skyCon = <i className="fas fa-cloud-rain" />;
      }
      if (data1.description === "rain") {
        skyCon = <i className="fas fa-cloud-rain" />;
      }
      //sky condition (	thunderstorm)
      if (data1.description === "thunderstorm" && dayTime) {
        skyCon = <i className="fas fa-poo-storm" />;
      }
      if (data1.description === "thunderstorm") {
        skyCon = <i className="fas fa-poo-storm" />;
      }

      weatherContent = (
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="text-success ">
              {location} {""}
              <span className="text-white">
                {" "}
                {Math.trunc(data2.temp)}
                {""}&#176;
              </span>
              <span className="text-white">
                {""} {skyCon}
              </span>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            {/* {Show current time} */}
            <span className="text-white">
              {moment(Date.now()).format("DD/MM/YYYY")}
            </span>
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
