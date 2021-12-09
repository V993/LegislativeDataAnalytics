import { Component } from "react";
import axios from "axios";
import { SocialIcon } from "react-social-icons";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import PlacesAutocomplete from "react-places-autocomplete";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#648a64",
  "&:hover": {
    backgroundColor: "#1b5e20",
  },
  backgroundImage:
    "linear-gradient( rgba(138, 182, 169, 0.5), rgba(255, 255, 255, 0) )",
  width: "16.2rem",
  marginTop: "0.5rem",
}));

class Local extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiData: {},
      address: "",
      found: false,
    };
  }

  handleChange = (address) => this.setState({ address });

  handleSubmit = async (e) => {
    e.preventDefault();
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
        this.setState({ found: false });
        console.log(`Error: Not Found - ${error.response.data}`); // Not Found
        console.log(`Error: ${error.response.status}`); // 404
      }
    }
  };

  handleSelect = async () => {
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
        <div className="box">
          <ul className="" key={index}>
            <div className="split">
              <img
                // className="rep-image"
                alt={official.name}
                src={official.photoUrl ? official.photoUrl : "bobbobberson.jpg"}
              />
              <div className="splitItem">
                <Typography variant="h4" component="div" gutterBottom>
                  {official.name} ({official.party && official.party.charAt(0)})
                  <Typography variant="h5" component="div" gutterBottom>
                    {official.office}
                  </Typography>
                </Typography>
              </div>
            </div>
            <br></br>
            <Typography variant="body1" component="div" gutterBottom>
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
                  official.phones.map((number) => (
                    <a href={`tel:${number}`}>{number}</a>
                  ))}
              </li>
              <li>
                Website:{" "}
                <ul>
                  {official.urls &&
                    official.urls.map((website) => (
                      <li>
                        <a href={website}>{website}</a>
                      </li>
                    ))}
                </ul>
              </li>
              <li>
                Social media:{" "}
                <ul className="social-media">
                  {official.channels &&
                    official.channels.map((channel) => (
                      <li>
                        <SocialIcon
                          url={
                            "https://" +
                            channel.type.toString().toLowerCase() +
                            ".com/" +
                            channel.id.toString().toLowerCase()
                          }
                        />
                      </li>
                    ))}
                </ul>
              </li>
            </Typography>
          </ul>
          <br></br>
          <br></br>
        </div>
      );
    });
    return list;
  };

  render() {
    return (
      <div>
        <div className="split">
          {/* First Half: */}
          <div className="splitItem Smol">
            <h1 className="headerText">Find Your Representatives</h1>
            <Typography
              variant="body1"
              className="descriptionText"
              component="div"
              gutterBottom
            >
              Enter an address followed by a zipcode to learn about your
              representatives. Discover valuable information in their profile
              such as their beliefs and bills voted on or simply find out how to
              contact them.
            </Typography>
            <br></br>

            <form onSubmit={this.handleSubmit}>
              <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
              >
                {({
                  getInputProps,
                  suggestions,
                  getSuggestionItemProps,
                  loading,
                }) => (
                  <div className="descriptionText">
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "location-search-input searchbar input",
                      })}
                    />
                    <div className="autocomplete-dropdown-container">
                      {loading && <CircularProgress />}
                      {suggestions.map((suggestion) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? { backgroundColor: "#fafafa", cursor: "pointer" }
                          : { backgroundColor: "#ffffff", cursor: "pointer" };
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </PlacesAutocomplete>
              <div className="descriptionText">
                <ColorButton type="submit" variant="contained" color="success">
                  Search
                </ColorButton>
              </div>
            </form>
          </div>

          {/* Second Half: */}

          <div className="splitItem Beeg">
            <div className="">
              {this.state.found ? (
                <div>
                  <h1 id="top">{this.state.apiData.name}</h1>
                  <Typography variant="h6" component="div" gutterBottom>
                    Your Representatives:
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    Searched address:{" "}
                    <strong>
                      {this.state.apiData.normalizedInput.line1},{" "}
                      {this.state.apiData.normalizedInput.city},{" "}
                      {this.state.apiData.normalizedInput.state}
                    </strong>
                    .
                  </Typography>
                  <br></br>
                  <br></br>

                  <ul className="list">{this.makeList()}</ul>

                  <br></br>
                  <br></br>

                  <a href="#top" className="smolButton">
                    Top
                  </a>
                </div>
              ) : (
                <>
                  <h1>{this.state.apiData.name}</h1>
                  <Typography variant="h6" component="div" gutterBottom>
                    Your Representatives:
                  </Typography>
                  <Typography variant="body2" component="div" gutterBottom>
                    Searched address:
                  </Typography>
                  <br></br>
                  <div className="box">
                    <div className=""></div>
                    <div className="split">
                      <img alt="Rep" src="bobbobberson.jpg" />
                      <div className="splitItem">
                        <Typography variant="h4" component="div" gutterBottom>
                          Bob Bobberson (D)
                          <Typography variant="h5" component="div" gutterBottom>
                            Representative of Representation
                          </Typography>
                        </Typography>
                      </div>
                    </div>
                    <br></br>
                    <Typography variant="body1" component="div" gutterBottom>
                      <li>Address: Main St, Somewhere, NY </li>
                      <li>Phone: (XXX) XXX-XXXX </li>
                      <li>Website: chasethemoney.com </li>
                      <li>
                        Social Media: Bob Bobberson is off the grid and hiding
                        from federal representatives. If you see him, please
                        contact the appropriate authorities.
                      </li>
                    </Typography>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Local;
