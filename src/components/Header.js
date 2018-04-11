/**
 * Created by z on 4/9/18.
 */
import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <h1>Flag Picker</h1>
                <h2>This app will help you to learn flags around the world in 3 steps</h2>
            </header>
        );
    }
}

export default Header;