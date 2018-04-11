/**
 * Created by z on 4/11/18.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import SearchBox from './SearchBox.js';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SearchBox continents = {this.continentData} clickHandler = {this.continentClickHandler} enableCheckBox  = {false} step = {1} message = {"Select a Continent"} />, div);
    ReactDOM.unmountComponentAtNode(div);
});