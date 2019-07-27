import React, { Component } from "react";
import BlueBG from "../../../img/bike1.jpg";

class Main extends Component {
  render() {
    const styles = {
      header: {
        backgroundImage: `url(${BlueBG})`,
        height: "100vh",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      },

      content: {
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.1)"
      }
    };

    return (
      <div style={styles.header}>
        <div style={styles.content}>
          <div className=" pt-4 ">
            <span className="text-white h4 ">Welcome to CoolAlbum</span>
          </div>
        </div>
      </div>
    );
  }
}
export default Main;
