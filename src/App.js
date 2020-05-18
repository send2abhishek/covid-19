import React, { Component } from "react";
import Cards from "./components/cards/cards";
import Charts from "./components/charts/charts";
import CountryPicker from "./components/countryPicker/countryPicker";
import "./styles/app.css";
import { fetchData } from "./api/index";
import CronaImage from "./images/image.png";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      country: "",
    };
  }

  async componentDidMount() {
    const fetch = await fetchData();
    // console.log("response", fetch);
    this.setState({
      data: fetch,
    });
  }

  handleCountryChange = async (country) => {
    const fetch = await fetchData(country);
    this.setState({
      data: fetch,
      country: country,
    });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className="container">
        <img src={CronaImage} alt="covid-19" className="image" />
        <Cards data={data} />
        <CountryPicker change={(data) => this.handleCountryChange(data)} />
        <Charts data={data} country={country} />
      </div>
    );
  }
}

export default App;
