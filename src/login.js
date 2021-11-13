import React, { useState, Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  withRouter
} from "react-router-dom";
//import {  } from "react-router";
import AuthService from "./services/auth.service";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: "",
      password: "",
      loading: false,
      message: ""
    };

    this.onChangeIdentifier = this.onChangeIdentifier.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  onChangeIdentifier(e) {
    this.setState({
      identifier: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin = (e) => {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    //this.form.validateAll();


    if (true) {
    //if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.identifier, this.state.password).then(
        (arg) => {
          console.log(this.props);
          this.props.history.push("/dashboard");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  /*
  const navigate = useNavigate();
  let tabActive = 1;

  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmitEy = (e) => {
      e.preventDefault();

      navigate("/dashboard/employer");
  };

  const handleSubmitEe = (e) => {
      e.preventDefault();

      navigate("/dashboard/employee");
  };*/

  render() {
    return (
      <div className="columns">
        <div className="column is-one-quarter">&nbsp;</div>
        <div className="column is-half">
          <h3 className="header title is-3 is-spaced">Login to your Dashboard</h3>
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
                    <input className="input" type="text" placeholder="Username" name="identifier" value={this.state.identifier} onChange={this.onChangeIdentifier}/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChangePassword}/>
                  </div>
                </div>
                <div className="field">&nbsp;</div>
                <div className="field">
                  <div className="control">
                    <input type="submit" className="button is-link" value="Login as Employer" onClick={this.handleLogin}/>
                  </div>
                </div>
              </form>
            </TabPanel>
            <TabPanel>
              <form>
                <div className="field">
                  <label className="label">Company name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="Username" name="username" value={this.state.identifier} onChange={this.onChangeIdentifier}/>
                  </div>
                </div>
                <div className="field">
                  <label className="label">Token</label>
                  <div className="control">
                    <input className="input" type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.onChangePassword}/>
                  </div>
                </div>
                <div className="field">&nbsp;</div>
                <div className="field">
                  <div className="control">
                    <input type="submit" className="button is-link" value="Login as Employee" onClick={this.handleLogin}/>
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

export default withRouter(Login)
