import React, { Component } from 'react';
import UserService from "../services/user.service";
import { Bar } from 'react-chartjs-2';

const data = {
  labels: ['Monday', 'Tuesday', 'Wednsday', 'Thurdsay', 'Friday', 'Saturday', 'Sunday'],
  datasets: [
    {
      label: 'Minutes spent',
      data: [123, 115, 135, 95, 80, 100, 5],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(86, 27, 126, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(86, 27, 126, 1)'
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

export default class Employer extends Component {
  constructor(props) {
    super(props);

    this.user = UserService.getUser();
    this.state = {
      locations: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    UserService.getCompanyLocations().then(
      result => {
        /*this.setState({
          locations: result.data,
          isLoaded: true
        });*/
        console.log(this.state);
      }
    );
  }

  render() {
    const { isLoaded, locations } = this.state;
    console.log(locations);

    return (
      <div>
        <div className="columns">
          <div className="column">
            <h3 className="header title is-2 is-spaced">Hello {this.user.company.name}!</h3>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h4 className="header title is-4">Here you can manage and view the statistics of your rooms and beacons.</h4>
          </div>
        </div>
        <br/>
        <div className="columns">
          <div className="column is-one-third">
            <AsideMenu />
            /*{locations.map((location,index) => {
              return <li>{location}</li>
            })}*/
          </div>
          <div className="column">
            <ListRooms/>
          </div>
        </div>

      </div>
    );
  }
}

export function AsideMenu() {
  //Get all Majors and minors
  //console.log(this.state);

  return(
    <aside className="menu">
      <ul className="menu-list">
        <li>
          <a className="is-active">Room #1</a>
          <ul>
            <li><a>Beacon 2</a></li>
            <li><a>Beacon 3</a></li>
            <li><a>Beacon 4</a></li>
            <li><a>+ Add beacon</a></li>
          </ul>
        </li>
        <li>
          <a>Room #2</a>
          <ul>
            <li><a>Beacon 2</a></li>
            <li><a>Beacon 3</a></li>
            <li><a>Beacon 4</a></li>
            <li><a>+ Add beacon</a></li>
          </ul>
        </li>
        <li>
          <a>Room #3</a>
          <ul>
            <li><a>Beacon 2</a></li>
            <li><a>Beacon 3</a></li>
            <li><a>+ Add beacon</a></li>
          </ul>
        </li>
        <li><a>+ Add Room</a></li>
      </ul>
    </aside>
  );
}

export function ListRooms() {
  return(
    <div>
      <div className="columns">
        <div className="column">
          <h5 className="title is-5">Room #1</h5>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          Average time spent: 115 minutes in the last week
        </div>
      </div>
      <div className="columns">
        <div className="column"><Bar data={data} options={options} /></div>
      </div>
      <div className="columns">
        <div className="column">
          <button className="button is-danger">Remove Room</button>
        </div>
      </div>
    </div>
  )
}

export function ListBeacons(roomId) {

}
