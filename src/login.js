import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate
} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function Login() {
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
  };

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
                  <input className="input" type="text" placeholder="Username" name="username" value={state.username} onChange={handleChange}/>
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" type="password" placeholder="Password" name="password" value={state.password} onChange={handleChange}/>
                </div>
              </div>
              <div className="field">&nbsp;</div>
              <div className="field">
                <div className="control">
                  <input type="submit" className="button is-link" value="Login as Employer" onClick={handleSubmitEy}/>
                </div>
              </div>
            </form>
          </TabPanel>
          <TabPanel>
            <form>
              <div className="field">
                <label className="label">Company name</label>
                <div className="control">
                  <input className="input" type="text" placeholder="Username" name="username" value={state.username} onChange={handleChange}/>
                </div>
              </div>
              <div className="field">
                <label className="label">Token</label>
                <div className="control">
                  <input className="input" type="password" placeholder="Password" name="password" value={state.password} onChange={handleChange}/>
                </div>
              </div>
              <div className="field">&nbsp;</div>
              <div className="field">
                <div className="control">
                  <input type="submit" className="button is-link" value="Login as Employee" onClick={handleSubmitEy}/>
                </div>
              </div>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
}
