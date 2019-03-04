// import React, { Component } from "react";
// import FacebookLogin from "react-facebook-login";
// class Facebook_auth_btn extends Component {
//   state = {
//     fbValidated: false,
//     email: "",
//     name: "",
//     picture: ""
//   };

//   handleLogout = () => {
//     this.setState({
//       fbValidated: false
//     });
//   };

//   responseFacebook = response => {
//     console.log(response);
//     this.setState({
//       fbValidated: true,
//       email: response.email,
//       name: response.name,
//       picture: response.picture.data.url
//     });
//   };

//   render() {
//     const { fbValidated, email, name, picture } = this.state;
//     let fbContent;
//     if (fbValidated) {
//       fbContent = (
//         <div className="card card-body my-3">
//           <div className="row">
//             <div className="col-md-4">
//               <span className="h4">{name}</span>
//               <br />
//               <span className="h5">{email}</span>
//             </div>
//             <div className="col-md-1">
//               <img src={picture} alt="" />
//             </div>
//             <div className="col-md-1">
//               <button className="btn btn-primary" onClick={this.handleLogout}>
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       );
//     } else {
//       fbContent = (
//         <FacebookLogin
//           appId="991632717694701"
//           autoLoad={true}
//           fields="name,email,picture"
//           onClick={this.componentClicked}
//           callback={this.responseFacebook}
//           cssClass="my-facebook-button-class"
//           icon="fa-facebook mr-1"
//         />
//       );
//     }

//     return <div className="py-3">{fbContent}</div>;
//   }
// }
// export default Facebook_auth_btn;
