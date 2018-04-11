/**
 * Created by z on 4/9/18.
 */
import React, { Component } from 'react';
import ContinentOptions from './continentOptions.js';
import './FilterContinent.css';

class FilterContinent extends Component {
    constructor(props){
        super(props);
        this.state = {
            focus: false,
            search: ""
        };
        this.showOptions = this.showOptions.bind(this);
        this.hideOptions = this.hideOptions.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
    }
    showOptions(){
        this.setState({focus : true})
    }
    hideOptions(){
        this.setState({focus : false})
    }
    updateSearch(event){
        this.setState({search : event.target.value});
    }

    render() {
        return (
            <section className="ContentFilter">
                <h3>Step 1</h3>
                <p>Select a Continent</p>
                <section>
                    <input type = "text" onFocus = {this.showOptions} onChange = {this.updateSearch}></input>
                    {this.state.focus? <ContinentOptions /> : null }
                </section>
            </section>
        );
    }
}

export default FilterContinent;
