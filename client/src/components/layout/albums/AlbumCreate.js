import React, { Component } from "react";
import { connect } from "react-redux";
import TextFormGroup from "../../textFormGroup/TextFormGroup";

export class AlbumCreate extends Component {
  render() {
    const { name } = this.props.auth.user;
    return (
      <div className="my-4">
        <p className="text-left">
          Wellcome <span className="text-success">{name}</span> to the Album
          creation page.<br></br> Choose The Name and Content for your album
          <br></br>
          Later you can edit the description and and content
        </p>
        <div className="row my-4">
          <div className="col-md-6">
            <TextFormGroup placeholder="Choose Name for Album" />
            <TextFormGroup placeholder="Some Description of Album" />
            <div className="custom-file">
              <input
                type="file"
                className="custom-file-input"
                id="customFileLang"
                lang="es"
              />
              <label className="custom-file-label" htmlFor="customFileLang">
                <p className="text-left"> Pick Image for Main Theme in Album</p>
              </label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumCreate);
