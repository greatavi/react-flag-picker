/**
 * Created by z on 4/9/18.
 */
import React, { Component } from 'react';
import './../App.css';

class ContinentOptions extends Component {
    constructor(props){
        super(props);
        this.state = {
            continents : ["Africa", "America", "Asia", "Europe", "Oceania"]
        }
        this.logging = this.logging.bind(this);
    }
    logging(){
        console.log("logging");
    }
    render() {
        return this.state.continents.map((continent)=>{
            return <option key = {continent}  className = "continent-option" onClick = {this.logging}>{continent}</option>
        })
    }
}

export default ContinentOptions;
