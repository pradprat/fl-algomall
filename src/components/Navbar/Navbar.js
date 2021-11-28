import React, { Component } from 'react'
import {MenuItems} from './Menuitems';
import logo from './assets/logo.jpg';
import './App.css';
import './index.css';

class Navbar extends Component {
    state = {clicked: false }
    handleClick = () => {
            this.setState({ clicked: !this.state.clicked })
        }

    render() {
        return (
            <nav className="NavbarItems">
                <div class="logo">
                    <img src={logo} alt="logo" />

                </div>

                <div class="magictime">
                    <ul>
                        {MenuItems.map((item, index) => {
                           return (
                               <li key={index} id={item.id}>
                                   <a href={item.url} target={item.target}>{item.title}
                                   </a>
                               </li>
                           )
                        })}
                 <button class="sec_btn">Connect Wallet</button>
                    </ul>
                </div>
                <div class="menu" onCLick={this.handleCLick}>
                    <div className={this.state.clicked ? 'hamburger hamburger--spin is-active' : 'hamburger hamburger--spin'}>
                        <div class="hamburger-box">
                            <div class="hamburger-inner"></div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navbar