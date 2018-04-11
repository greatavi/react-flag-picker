/**
 * Created by z on 4/9/18.
 */
import React, { Component } from 'react';
import './SelectedOption.css';


var SelectedOption = (props)=>{
    return (
        <div className = "option-selected">
            {props.option? <h3>You Selected</h3> : null}
            <h3 className = "selected-option">{props.option}</h3>
        </div>
        )
};



export default SelectedOption;


