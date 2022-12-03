import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";


import * as actions from "../../store/actions";

import "./Login.scss";
import { handleLoginApi } from '../../services/userService';
import { userLoginSuccess } from "../../store/actions";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: '',
      Password: '',
      errMessage: ''
    }
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      Username: event.target.value
    })
  }

  handleOnChangePassword = (event) => {
    this.setState({
      Password: event.target.value
    })
  }

  handleLogin = async () => {
    this.setState({
      errMessage: ''
    })

    try {
      let data = await handleLoginApi(this.state.Username, this.state.Password)
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message
        })
      }

      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.userData)
        console.log('login success!')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message
          })
        }
      }

      console.log('Error ', error.response);
    }

  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      this.handleLogin();
    }
  }

  render() {
    return (
      <div className="login-background">
        <div className="login-container ">
          <div className="login-content row">
            <div className="col-12 text-center text-login">Login</div>
            <div className="col-12 form-group login-input">
              {/* <label>Username:</label> */}
              <i className="input-group-text col-1 fas fa-user icon-user"></i>
              <input
                type="text"
                className="form-control "
                placeholder="Username"
                value={this.state.Username}
                onChange={(event) => { this.handleOnChangeUsername(event) }}
              />
            </div>
            <div className="col-12 form-group login-input">
              {/* <label>Password:</label> */}
              <i className="input-group-text col-1 fa fa-lock center icon-password"></i>
              <input
                type="password"
                className="form-control "
                placeholder="Password"
                value={this.state.Password}
                onChange={(event) => { this.handleOnChangePassword(event) }}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />
            </div>
            <div className="col-12" style={{ color: 'red' }}>
              {this.state.errMessage}
            </div>
            <div className="d-grid gap-2 col-12 mx-auto login-btn">
              <button className="btn btn-primary " type="button" onClick={() => { this.handleLogin() }}>Login</button>
            </div>
            <div className="col-12 pt-2">
              <p className="text-center"><a href="#" className="btn">Forgot password?</a></p>
            </div>
            <div className="text-center">
              <span >Or login with</span>
            </div>
            <div className=" text-center social-login">
              <i className="fab fa-facebook-f text-primary icon-fa"></i>
              <i className="fab fa-google text-danger icon-fa"></i>
              <i className="fab fa-twitter text-primary icon-fa"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};



const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
