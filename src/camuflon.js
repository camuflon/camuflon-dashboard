import React from 'react';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Link,
  useLocation,
  useNavigate,
  withRouter
} from "react-router-dom";
import AuthService from "./services/auth.service";

import Login from "./login";
import Dashboard from "./routes/dashboard";
import Employer from "./routes/employer";
import Employee from "./routes/employee";

import Bulma from 'bulma';
import './index.css';

export default class Camuflon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main-container">
        <BrowserRouter>
          <Nav />
          <main>
            <HomeImage />
            <section className="section">
              <div className="container">
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="dashboard" element={<Dashboard />}>
                      <Route path="employer" element={<Employer />}></Route>
                      <Route path="employee" element={<Employee />}></Route>
                    </Route>
                    <Route
                      path="*"
                      element={
                        <main style={{ padding: "1rem" }}>
                          <p>There's nothing here!</p>
                        </main>
                      }
                    ></Route>
                  </Routes>
              </div>
            </section>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}
/*export default function Camuflon() {

}*/

function Nav() {
  const location = useLocation();
  let addNavLinks;
  let endNavLinks;

  switch (location.pathname) {
    case "/dashboard/employer":
    case "/dashboard/employee":
      addNavLinks = <a className="navbar-item" href="/">Edit profile</a>
      endNavLinks = <div class="navbar-end">
                      <div class="navbar-item">
                        <div class="buttons">
                          <a class="button is-light" onClick={doLogout}>Logout</a>
                        </div>
                      </div>
                    </div>
      break;
    case "/login":

      break;
    default:
      endNavLinks = <div class="navbar-end">
                      <div class="navbar-item">
                        <div class="buttons">
                          <a class="button is-primary">
                            <strong>Sign up</strong>
                          </a>
                          <a class="button is-light" href="/login">Log in</a>
                        </div>
                      </div>
                    </div>
  }

  let navLinks = <div className="navbar-menu">
                    <a className="navbar-item" href="/">Home</a>
                    <a className="navbar-item" href="/">About</a>
                    <a className="navbar-item" href="/">Contact</a>
                    {addNavLinks}
                  </div>

  return(
    <nav className="navbar">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src={process.env.PUBLIC_URL + "/logo-small.jpg"} />
        </a>

        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      {navLinks}
      {endNavLinks}
    </nav>
  )
}

function Footer() {
  return(
    <footer className="footer">
      <div className="container">
        <div className="columns">
          <div className="column">Copyright &copy; 2021 Claudio Vigliarolo & Jaime Venturini for NOI Hackathon SFScon Edition</div>
        </div>
      </div>
    </footer>
  )
}

function doLogout() {
  AuthService.logout();
}

function Home() {
  return (
    <div className="container">hey</div>
  );
}

function HomeImage() {
  const location = useLocation();

  if(location.pathname === "/") {
    return(
      <div className="homeImage"><img src={process.env.PUBLIC_URL + "/img/header.jpg"} /></div>
    );
  } else {
    return(
      <span></span>
    );
  }
}
