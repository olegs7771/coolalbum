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
      // console.log("sunrise", daytime.sunrise / 1000);
      // console.log("sunset", daytime.sunset / 1000);
      // console.log("Date.now()", Math.trunc(Date.now() / 1000) / 1000);

      //description
      // console.log("data1.description", data1.description);

      if (
        daytime.sunrise < Math.trunc(Date.now() / 1000) &&
        daytime.sunset > Math.trunc(Date.now() / 1000)
      ) {
        dayTime = true;
        // console.log("daytime", dayTime);
      }
      if (
        daytime.sunrise < Math.trunc(Date.now() / 1000) &&
        Math.trunc(Date.now() / 1000) > daytime.sunset
      ) {
        dayTime = false;
        // console.log("daytime", dayTime);
      }

      // console.log("data1.description", data1.description);

      //sky condition (scattered clouds)
      if (data1.description === "scattered clouds" && dayTime) {
        skyCon = <i className="fas fa-cloud-sun" />;
        // console.log("day");
      }
      if (data1.description === "scattered clouds" && dayTime === false) {
        skyCon = <i className="fas fa-cloud-moon" />;
      }

      //sky condition (	clear sky)
      if (data1.description === "clear sky" && dayTime) {
        skyCon = <i className="far fa-sun" />;
        console.log("1");
      }
      if (data1.description === "clear sky" && dayTime === false) {
        skyCon = <i className="fas fa-moon" />;
        console.log("2");
      }

      //sky condition (	few clouds)
      if (data1.description === "few clouds" && dayTime) {
        console.log("3");

        skyCon = <i className="fas fa-cloud" />;
      }
      if (data1.description === "few clouds" && dayTime === false) {
        console.log("4");

        skyCon = <i className="fas fa-cloud" />;
      }
      //sky condition (	rain)
      if (data1.description === "rain" && dayTime) {
        console.log("5");

        skyCon = <i className="fas fa-cloud-rain" />;
      }
      if (data1.description === "rain") {
        console.log("6");

        skyCon = <i className="fas fa-cloud-rain" />;
      }
      //sky condition (	thunderstorm)
      if (data1.description === "thunderstorm" && dayTime) {
        console.log("7");

        skyCon = <i className="fas fa-poo-storm" />;
      }
      if (data1.description === "thunderstorm") {
        console.log("8");

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
