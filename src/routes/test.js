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

  componentDidMount() {
    UserService.getCompanyLocations().then(
      resultLoc => {
        this.setState({
          locations: resultLoc.data,
        });
        UserService.getCompanyLocationsBeacons().then(
          resultBeac => {
            this.setState({
              beacons: resultBeac.data,
            });

            UserService.getCompanyStatistics().then(
              resultStat => {
                this.setState({
                  statistics: resultStat.data,
                  isLoaded: true
                });
                console.log(this.state);
              }
            )
          }
        )
      }
    );
  }

  renderBeacon(locationId) {
    let tmpBeacons = this.state.beacons.filter((beacon) => beacon.locationId === locationId);
    let beaconId = "";
    return tmpBeacons.map(beacon => {
        //console.log(beacon.beaconMinor);
        if(beaconId !== beacon.beaconId) {
          //console.log("inside");
          beaconId = beacon.beaconId;
          return(
            <li><a>{beaconId}</a></li>
          )
        }
    });
  }

  renderStatistics(locationId) {
    let locStatistic = this.state.statistics.filter((singleLoc) => singleLoc.locationId === locationId);
    //console.log(locStatistic);
    if(locStatistic !== undefined) {
      let locNameArr = this.state.locations.filter((singleLoc) => singleLoc._id === locationId);
      let locName = locNameArr[0].name;
      let statisticTimestamp = [];

      /*locStatistic.map(statistic => {
        if(statistic !== undefined) {
          statisticTimestamp.push(statistic.timestamp);
        }
      });
      console.log(statisticTimestamp);*/

      //*****<div className="column"><Bar data={statisticTimestamp} /></div>

      return(
        <div className="singleLocation">
          <div className="columns">
            <div className="column">
              <h5 className="title is-5">{locName}</h5>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              Average time spent: XXXX minutes in the last week
            </div>
          </div>
          <div className="columns">

            //Questa parte deve essere sistemata!!

            //*****

            //end
          </div>
          <div className="columns">
            <div className="column">
              <button className="button is-danger">Remove Room</button>
            </div>
          </div>
        </div>
      )
    } else {
      return(
        <div>Error, no statistics found!</div>
      )
    }

  }

  render() {
    const { isLoaded, locations } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return(
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
          <br/>
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
