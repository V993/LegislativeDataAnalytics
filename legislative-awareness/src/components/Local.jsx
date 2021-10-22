import { Component } from "react";
import axios from "axios";
import "./style.css";

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      address: "",
      found: false,
    };
  }

  handleInputChange = (event) => {
    this.setState({ address: event.target.value });
  };

  handleSearchClick = async () => {
    let address = this.state.address;
    let key = "AIzaSyDGm2WMjPhv1Ddn9C3ML24u_HtTcT4l6B4"; // Google Cloud API key
    let linkToAPI =
      "https://www.googleapis.com/civicinfo/v2/representatives?key=" +
      key +
      "&address=" +
      address;

    try {
      let response = await axios.get(linkToAPI);
      this.setState({ apiData: response.data, found: true });
    } catch (error) {
      if (error.response) {
        /*
         * The request was made and the server responded with a
         * status code that falls out of the range of 2xx
         */
        this.setState({ found: false });
        console.log(`Error: Not Found - ${error.response.data}`); // Not Found
        console.log(`Error: ${error.response.status}`); // 404
      }
    }
  };

  makeList = () => {
    let officials = this.state.apiData.officials;
    let offices = this.state.apiData.offices;
    let result = [];

    // Combine into one object
    offices.forEach((obj, index) => {
      let indices = obj["officialIndices"];
      indices.forEach((index, idx) => {
        let temp = {};
        temp["name"] = officials[index]["name"];
        temp["office"] = obj["name"];
        temp["address"] = officials[index]["address"];
        temp["phones"] = officials[index]["phones"];
        temp["urls"] = officials[index]["urls"];
        temp["channels"] = officials[index]["channels"];
        temp["photoUrl"] = officials[index]["photoUrl"];
        temp["party"] = officials[index]["party"];
        result.push(temp);
      });
    });

    // Remove president & VP
    for (let i = 0; i < result.length; ++i) {
      if (result[i].office.includes("President")) result.shift();
    }

    let list = result.map((official, index) => {
      return (
        <>
          <ul key={index}>
            <img
              className={"rep-image"}
              alt={official.name}
              src={
                official.photoUrl
                  ? official.photoUrl
                  : "https://www.pinclipart.com/picdir/middle/169-1692839_default-avatar-transparent-clipart.png"
              }
            />
            <div>
              {official.name} ({official.party && official.party.charAt(0)})
            </div>
            <div>{official.office}</div>
            <li>
              Address:{" "}
              {official.address &&
                official.address.map((address) => (
                  <span>
                    {address.line1}, {address.city}, {address.state}{" "}
                    {address.zip}
                  </span>
                ))}
            </li>
            <li>
              Phone:{" "}
              {official.phones &&
                official.phones.map((number) => <span>{number}</span>)}
            </li>
            <li>
              Website:{" "}
              <ul>
                {official.urls &&
                  official.urls.map((website) => <li>{website}</li>)}
              </ul>
            </li>
            <li>
              Social media:{" "}
              <ul>
                {official.channels &&
                  official.channels.map((channel) => (
                    <li>
                      {channel.type}: {channel.id}
                    </li>
                  ))}
              </ul>
            </li>
          </ul>
        </>
      );
    });
    return list;
  };

  render() {
    return (
      <div className="container">
        <div className="search">
          <h1>Find Your Representatives</h1>
          <p>
            Enter an address followed by a zipcode to learn about your
            representatives. Discover valuable information in their profile such
            as their beliefs and bills voted on or simply find out how to
            contact them.
          </p>
          <input
            type="text"
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="695 Park Ave 10065"
          />
          <button onClick={this.handleSearchClick}>Search</button>
        </div>
        {this.state.found ? (
          <div>
            <h1>{this.state.apiData.name}</h1>
            <h4>Your Representatives</h4>
            <small>
              Your address:{" "}
              <strong>
                {this.state.apiData.normalizedInput.line1},{" "}
                {this.state.apiData.normalizedInput.city},{" "}
                {this.state.apiData.normalizedInput.state}
              </strong>
              .
            </small>
            <ul>{this.makeList()}</ul>
          </div>
        ) : (
          <h4>No results</h4>
        )}
      </div>
    );
  }
}

export default Local;
