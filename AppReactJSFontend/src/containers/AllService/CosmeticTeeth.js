import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import Footter from '../HomePage/Section/Footter';
import './CosmeticDentistry.scss';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }


    render() {
        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='container-CD'>
                    <div className='top mt-3'>
                        <div className='h4 fw-bold'>Răng trẻ em</div>
                    </div>
                </div>
                <Footter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
