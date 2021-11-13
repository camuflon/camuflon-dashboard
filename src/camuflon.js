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
import Test from "./routes/test";

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
                      <Route path="test" element={<Test />}></Route>
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
    <div className="container">
      <div className="columns">
        <div className="column"><h1 className="header title is-1 is-centered">Welcome</h1></div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="block">
            This is the official website of the project <strong>Camuflon</strong>!
          </div>
        </div>
      </div><br/><br/>
      <div className="columns">
        <div className="column">
          <h3 className="header title is-3 has-text-primary">What is Camuflon?</h3>
          <div className="block">
            <i>«È un grosso scimmione pacifico dalle movenze delicate. Ha un folto pelo argentato, lungo, sottile e setoso, che gli copre i tristi occhi neri. Ha la capacità di rendersi invisibile [...]»</i> <br/>- Cit. Harry Potter<br/><br/>
            The idea behind Camuflon is to <strong>improve the management of time</strong> in the office. This is done through an interpretation of so called <strong>beacons</strong>, small Bluetooth radio transimitter
            which can be installed in any office. <br/>
            Our smartphones comunicate with this beacons in order to - <strong>privately</strong> - register the time spent in each office or local, in order to provide
            the employer <strong>anonimous statistics</strong> where his employees spend most of the time. So he may improve the use of certain spaces.<br/>
            On the other hand, employees can check my themslef where they spent most of their time - maybe realizing they're too much time at the coffee machine?<br/><br/>
            To summarize, the project consists of three different modules:<br/>
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="box modulesBox">
            <img src={process.env.PUBLIC_URL + "/img/dashboard.jpg"} /><br/>
            <h5 className="title is-5">Employer and employee dashboard</h5>
          </div>
        </div>
        <div className="column">
          <div className="box modulesBox">
            <img src={process.env.PUBLIC_URL + "/img/mobile.png"} /><br/>
            <h5 className="title is-5">Employer and employee mobile app</h5>
          </div>
        </div>
        <div className="column">
          <div className="box modulesBox">
            <img src={process.env.PUBLIC_URL + "/img/backend.png"} /><br/>
            <h5 className="title is-5">Backend</h5>
          </div>
        </div>
      </div><br/><br/>
      <div className="columns">
        <div className="column"><h3 className="header title is-3 has-text-primary">Who are the team members?</h3></div>
      </div>
      <div className="columns">
        <div className="column presentationImgWrapper">
          <div className="box">
            <img src={process.env.PUBLIC_URL + "/img/Jaime-Venturini_1.jpeg"} className="presentationImg"/><br/>
            <span>Jaime Venturini</span>
          </div>
        </div>
        <div className="column presentationImgWrapper">
          <div className="box">
            <img src={process.env.PUBLIC_URL + "/img/Claudio-Vigliarolo_2.jpeg"} className="presentationImg"/><br/>
            <span>Claudio Vigliarolo</span>
          </div>
        </div>
      </div>
    </div>
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
