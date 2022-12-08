import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './PageNotFound.scss'
import Marquee from "react-fast-marquee";

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
                <div className="error-wrapper">
                    <div className='Marquee' >
                        <Marquee gradientWidth={0} speed={100} >
                            <div className='h2 text-uppercase text-danger fw-bold'>
                                Tính năng đang trong quá trình phát triển - xin cảm ơn!
                            </div>
                        </Marquee>
                    </div>
                    <div className="error-container">

                        <div className="error">
                            <div className="error-title">
                                Error
                            </div>
                            <div className="error-number">
                                404
                            </div>
                            <div className="error-description">
                                Sorry, The page you were looking for doesn't exist
                            </div>
                            <div className="error-or">
                                <div className="or-line"></div>
                                <div className="or">Search</div>
                            </div>
                            <div className="error-textbox">
                                <input type="text" className="form-control text-light" autofocus="" />
                            </div>
                            <div className="error-or">
                                <div className="or-line"></div>
                                <div className="or">Or</div>
                            </div>
                            <ul className="error-actions">
                                <li>
                                    <a href="">
                                        <i className="pe-7s-left-arrow" data-toggle="tooltip" title="" data-original-title="BACK"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="pe-7s-home" data-toggle="tooltip" title="" data-original-title="HOME"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="pe-7s-mail" data-toggle="tooltip" title="" data-original-title="CONTACT US"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
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
