/**
 * Created by z on 4/10/18.
 */

import React, { Component } from 'react';
import './SelectedFlags.css';


const SelectedFlags = (props)=>{
    const flagData = props.flags;
        return (
            <section className="selected-flags">
                <h4>{props.message}</h4>
                <div className = "flag-items">
                    {flagData.map((flag, index)=> {
                        return (
                        <div  key = {index} className = "flag-item">
                            <div>{flag}</div>

                        </div>
                        )
                    })}
                </div>
            </section>
        );
};

export default SelectedFlags;


