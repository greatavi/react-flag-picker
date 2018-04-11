import React, { Component } from 'react';
import './App.css';
import FilterContinent from './components/FilterContinent.js';
import Header from './components/Header.js';
import SearchBox from './components/SearchBox.js';
import SelectedOption from './components/SelectedOption.js';
import SelectedFlags from './components/SelectedFlags.js';

class App extends Component {

  constructor(props){
    super(props);
    this.data = [
      {
        "continent": "Africa",
        "countries": [
          {
            "name": "Nigeria",
            "flag": "🇳🇬"
          },
          {
            "name": "Ethiopia",
            "flag": "🇪🇹"
          },
          {
            "name": "Egypt",
            "flag": "🇪🇬"
          },
          {
            "name": "DR Congo",
            "flag": "🇨🇩"
          },
          {
            "name": "South Africa",
            "flag": "🇿🇦"
          }
        ]
      },
      {
        "continent": "America",
        "countries": [
          {
            "name": "USA",
            "flag": "🇺🇸"
          },
          {
            "name": "Brazil",
            "flag": "🇧🇷"
          },
          {
            "name": "Mexico",
            "flag": "🇲🇽"
          },
          {
            "name": "Colombia",
            "flag": "🇨🇴"
          },
          {
            "name": "Argentina",
            "flag": "🇦🇷"
          }
        ]
      },
      {
        "continent": "Asia",
        "countries": [
          {
            "name": "China",
            "flag": "🇨🇳"
          },
          {
            "name": "India",
            "flag": "🇮🇳"
          },
          {
            "name": "Indonesia",
            "flag": "🇮🇩"
          },
          {
            "name": "Pakistan",
            "flag": "🇵🇰"
          },
          {
            "name": "Bangladesh",
            "flag": "🇧🇩"
          }
        ]
      },
      {
        "continent": "Europe",
        "countries": [
          {
            "name": "Russia",
            "flag": "🇷🇺"
          },
          {
            "name": "Germany",
            "flag": "🇩🇪"
          },
          {
            "name": "UK",
            "flag": "🇬🇧"
          },
          {
            "name": "France",
            "flag": "🇫🇷"
          },
          {
            "name": "Italy",
            "flag": "🇮🇹"
          }
        ]
      },
      {
        "continent": "Oceania",
        "countries": [
          {
            "name": "Australia",
            "flag": "🇦🇺"
          },
          {
            "name": "Papua New Guinea",
            "flag": "🇵🇬"
          },
          {
            "name": "New Zealand",
            "flag": "🇳🇿"
          },
          {
            "name": "Fiji",
            "flag": "🇫🇯"
          },
          {
            "name": "Solomon Islands",
            "flag": "🇸🇧"
          }
        ]
      }
    ];

    this.state = {
      selectedContinent : "",
      selectedFlags: [],
      showSearch: false,
      selectedContinentData: {},
      selectedContinentCountries :[],
      refresh: false
    };


    this.continentData = this.data.map((obj)=>obj.continent);

    //Function binding
    this.getCountries = this.getCountries.bind(this);
    this.getCountryComponent = this.getCountryComponent.bind(this);
    this.getFlagDisplayComponent = this.getFlagDisplayComponent.bind(this);
    this.getFlag = this.getFlag.bind(this);

    //handler binding
    this.continentClickHandler = this.continentClickHandler.bind(this);
    this.flagSelectHandler = this.flagSelectHandler.bind(this);
  };


  /********** Event Handlers start **********/

  // updates the state of selectedContinent, selectedContinentData, selectedContinentCountries and selectedFlags
  // toggles refresh and

  continentClickHandler(event){
    console.log("inside continentClickHandler()");

    console.log("before setting ", this.state.selectedContinent, this.state.selectedFlags, this.state.selectedContinentCountries, this.state.selectedContinentData);
    var updatedRefresh = !this.state.refresh;
    this.setState({
      selectedContinent : event.target.value,
      selectedContinentCountries: this.getCountries(event.target.value),
      selectedContinentData: this.getContinentData(event.target.value),
      selectedFlags: [],
      refresh: updatedRefresh
    });
  }

  //Handles when a country is selected and updates the selected flags
  flagSelectHandler(event){
    // if the checkbox is checked
    var countryName = event.target.name;
    var flag = this.getFlag(countryName);

    console.log("flagSelectHandler countryName:", countryName);
    console.log("flagSelectHandler flag:", flag);
    var newFlags = this.state.selectedFlags;
    if(event.target.checked){
      this.setState({
        selectedFlags: [...this.state.selectedFlags, flag]
      })
    }else{
      // get the flag of the country using contryName and remove it from existing flags
      const index = newFlags.indexOf(flag);
      newFlags.splice(index, 1);
      this.setState({selectedFlags:newFlags});
    }
  }

  clearFlagHandler(event){
    console.log("clearing the button", this.state.selectedFlags);
    var updatedRefresh = !this.state.refresh;
    this.setState({selectedFlags:[], refresh:updatedRefresh});
  }

  /********** Event Handlers end **********/


  /********** Functions start **********/

  //Returns continentData json Object
  getContinentData(selectedContinent){
    var continentData = this.data.find((x) => x.continent.toLowerCase() === selectedContinent.toLowerCase());
    console.log("getContinentData:",continentData.countries );
    if(continentData!=null && continentData!==""){
      return continentData.countries;
    }
    return {};
  }

  getFlag(countryName){
    var country = this.state.selectedContinentData.find(l => l.name.toLowerCase() === countryName.toLowerCase());
    if(country!=null && country!==undefined){
      return country.flag;
    }
  }

  getCountries(selectedContinent) {
    var selectedCountries = [];
    if(selectedContinent !== "") {
      for (let i = 0; i < this.data.length; i++) {
        if (this.data[i].continent.toLowerCase() === selectedContinent.trim().toLowerCase()) {
          for(let j=0;j<this.data[i].countries.length;j++){
            selectedCountries.push(this.data[i].countries[j].name);
          }
        }
      }
    }
    return selectedCountries;
  }
  /********** Functions end **********/




  /****** Conditional Components start ******/

  getCountryComponent(){
    if(this.state.selectedContinent!=""){
      return (
          <SearchBox continents = {this.state.selectedContinentCountries} selectHandler={this.flagSelectHandler} enableCheckBox  = {true} step = {2} message = {"Now, Select a Country"} refresh={this.state.refresh}/>
      );
    }
    return "";
  }

  getFlagDisplayComponent(){
    if(this.clearButton != undefined) {
      console.log("clearButton", this.clearButton);
      this.clearButton.style.display = "block";
    }
    if(this.state.selectedFlags!=null && this.state.selectedFlags.length!==0){

      return (<SelectedFlags flags= {this.state.selectedFlags } message = {"Selected flags"}/>);
    }
    return "";
  }



  /** Conditional Components end **/

  /** life cycle methods **/
  componentDidUpdate(){
    console.log("After setting again",this.state.selectedContinent,  this.state.selectedFlags, this.state.selectedContinentCountries, this.state.selectedContinentData, this.state.refresh);
  }

  render() {
    return (
        <div className="App">
          <Header />
          <section className = "flex-container">
            <section className = "left">
              <SearchBox continents = {this.continentData} clickHandler = {this.continentClickHandler} enableCheckBox  = {false} step = {1} message = {"Select a Continent"} />
              <SelectedOption option = {this.state.selectedContinent}/>
            </section>
            <section className = "middle">
              {this.getCountryComponent()}
            </section>
            <section>
              {this.getFlagDisplayComponent()}
              <div><button className = {this.state.selectedFlags.length==0? "hide-clear-btn": "show-clear-btn"} onClick={this.clearFlagHandler.bind(this)}> clear </button></div>
            </section>
          </section>
        </div>
    );
  }
}

export default App;