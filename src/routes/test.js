import React, { Component } from 'react';
import UserService from "../services/user.service";
import { Bar } from 'react-chartjs-2';

export default class Test extends Component {
  constructor(props) {
    super(props);

    this.user = UserService.getUser();

    this.state = {
      locations: [],
      beacons: [],
      statistics: [],
      isLoaded: false
    }
  }

  async componentDidMount() {
    const locations = (await UserService.getCompanyLocations()).data;
    this.setState({ locations });
    const beacons = (await UserService.getCompanyLocationsBeacons()).data;
    this.setState({
      beacons
    });
    const statistics = (await UserService.getCompanyStatistics()).data;
    this.setState({
      statistics: statistics,
      isLoaded: true
    });
    console.log(this.state)
  }

  renderBeacon(locationId) {
    let tmpBeacons = this.state.beacons.filter((beacon) => beacon.locationId === locationId);
    let beaconId = "";
    return tmpBeacons.map(beacon => {
      //console.log(beacon.beaconMinor);
      if (beaconId !== beacon.beaconId) {
        //console.log("inside");
        beaconId = beacon.beaconId;
        return (
          <li><a>{beaconId}</a></li>
        )
      }
    });
  }

  renderStatistics(locationId) {
    let locStatistic = this.state.statistics ? this.state.statistics.filter((singleLoc) => singleLoc.locationId === locationId) : undefined;
    //console.log(locStatistic);
    if (locStatistic !== undefined) {
      let locNameArr = this.state.locations.filter((singleLoc) => singleLoc._id === locationId);
      let locName = locNameArr[0].name;
      let statisticTimestamp = [];

      let values = [0, 0, 0, 0, 0, 0, 0];
      for (const s of locStatistic) {
        const t = new Date(s.timestamp);
        const day = t.getDay() - 1;
        values[day]++;
      }

      const average = values.reduce((acc, curr) => acc + curr, 0);
      const data = {
        labels: ['Monday', 'Tuesday', 'Wednsday', 'Thurdsay', 'Friday', 'Saturday', 'Sunday'],
        datasets: [
          {
            label: 'Minutes spent',
            data: values,
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

      /*locStatistic.map(statistic => {
        if(statistic !== undefined) {
          statisticTimestamp.push(statistic.timestamp);
        }
      });
      console.log(statisticTimestamp);*/

      //*****<div className="column"><Bar data={statisticTimestamp} /></div>

      return (
        <div className="singleLocation">
          <div className="columns">
            <div className="column">
              <h5 className="title is-5">{locName}</h5>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              Average time spent: {average} minutes in the last week
            </div>
          </div>
          <div className="columns">
            <Bar data={data} options={options} />
          </div>
          <div className="columns">
            <div className="column">
              <button className="button is-danger">Remove Room</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>Error, no statistics found!</div>
      )
    }

  }

  render() {
    const { isLoaded, locations } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <div className="columns">
            <div className="column">
              <h3 className="header title is-2 is-spaced">Hello {this.user.company.name}</h3>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <h4 className="header title is-4">Here you can manage and view the statistics of your rooms and beacons.</h4>
            </div>
          </div>
          <br />
          <div className="columns">
            <div className="column is-one-third">
              <aside className="menu">
                <ul className="menu-list">
                  {locations.map(location => (
                    <li key={location._id}>
                      <a>{location.name}</a>
                      <ul>
                        {
                          this.renderBeacon(location._id)
                        }
                      </ul>
                    </li>
                  ))}
                  <li><a>+ Add Room</a></li>
                </ul>
              </aside>
            </div>
            <div className="column">
              {locations.map(location => (
                this.renderStatistics(location._id)
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}
