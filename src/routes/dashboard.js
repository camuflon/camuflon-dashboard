import React, { Component } from 'react';
import { Outlet } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (!user) {
      AuthService.logout();
      alert("Not logged in!");
    }
  }

  render() {
    return (
      <Outlet />
    );
  }
}
