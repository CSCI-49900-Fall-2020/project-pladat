import React, { Component } from 'react';
import Header from './Header'
import Cards from './Cards'
import Buttons from './Buttons'

import "./styles/MainPage.css"

class MainPage extends Component {
    render() {
        return (
        <div className="main-page-wrapper">

            {/* Header */}
            <Header />

            {/* Tinder Cards */}
            <Cards />

            {/* Buttons Below Tinder Cards */}
            <Buttons />

            {/* Chat Screen */}
            {/* Individual Chat Screen */}

        </div>
        )
    }
}

export default MainPage;