import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import OutstandingService from './Section/OutstandingService'
import DentalFacilities from './Section/DentalFacilities'
import Dentist from './Section/Dentist'
import FeedBack from './Section/FeedBack';
import Footter from './Section/Footter';
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class HomePage extends Component {

    render() {

        return (
            <div>
                <HomeHeader isShowBanner={true}/>
                <OutstandingService />
                <DentalFacilities />
                <Dentist />
                <FeedBack />
                <Footter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
