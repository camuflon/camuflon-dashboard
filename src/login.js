import React, { useState, Component } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  withRouter,
} from "react-router-dom";
import AuthService from "./services/auth.service";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

class Login extends Component {
  state = {
    identifier: "",
    password: "",
    loading: false,
    message: "",
  };

  onChangeIdentifier = (e) => {
    this.setState({
      identifier: e.target.value,
    });
  };

  onChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });

    //this.form.validateAll();

    if (true) {
      //if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.identifier, this.state.password).then(
        (arg) => {
          this.props.navigate("/dashboard/employer");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage,
          });
        }
      );
    } else {
      this.setState({
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="columns">
        <div className="column is-one-quarter">&nbsp;</div>
        <div className="column is-half">
          <h3 className="header title is-3 is-spaced">
            Login to your Dashboard
          </h3>
          <Tabs>
            <TabList>
              <Tab>Employer</Tab>
              <Tab>Employee</Tab>
            </TabList>

            <TabPanel>
              <form>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Username"
                      name="identifier"
                      value={this.state.identifier}
                      onChange={this.onChangeIdentifier}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </div>
                </div>
                <div className="field">&nbsp;</div>
                <div className="field">
                  <div className="control">
                    <input
                      type="submit"
                      className="button is-link"
                      value="Login as Employer"
                      onClick={this.handleLogin}
                    />
                  </div>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              <form>
                <div className="field">
                  <label className="label">Company name</label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      placeholder="Company name"
                      name="companyname"
                      value={this.state.companyname}
                      onChange={this.onChangeIdentifier}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Token</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Token"
                      name="token"
                      value={this.state.token}
                      onChange={this.onChangePassword}
                    />
                  </div>
                </div>
                <div className="field">&nbsp;</div>
                <div className="field">
                  <div className="control">
                    <input
                      type="submit"
                      className="button is-link"
                      value="Login as Employee"
                      onClick={this.handleLogin}
                    />
                  </div>
                </div>
              </form>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  return <Login {...props} navigate={navigate} />;
}

export default WithNavigate;
