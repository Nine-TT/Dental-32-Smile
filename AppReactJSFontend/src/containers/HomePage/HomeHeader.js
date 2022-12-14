import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import Marquee from "react-fast-marquee";
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions'
import { withRouter } from 'react-router';
import Dropdown from 'react-bootstrap/Dropdown';


class HomeHeader extends Component {

    changeLanguage = (language) => {
        // fire redux event: actions
        this.props.changeLanguageAppRedux(language)
    }

    returnToHome = () => {
        this.props.history.push(`/home`)
    }

    goLogin = () => {
        this.props.history.push('/login')
    }

    Page404 = () => {
        this.props.history.push('/404')
    }

    CosmeticDentistry = () => {
        this.props.history.push('/Cosmetic-dentistry')
    }

    CosmeticTeeth = () => {
        this.props.history.push('/Cosmetic-teeth')
    }

    render() {
        let language = this.props.lang;
        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <Dropdown className='d-flex align-items-center'>
                                <Dropdown.Toggle variant="none" id="dropdown-basic" className='d-flex text-light align-items-center'>
                                    <i className="fas fa-bars"></i>
                                </Dropdown.Toggle>

                                <Dropdown.Menu >
                                    <Dropdown.Item onClick={() => this.goLogin()} >Đăng nhập</Dropdown.Item>

                                </Dropdown.Menu>
                            </Dropdown>

                            <div className='header-logo' onClick={() => this.returnToHome()}></div>
                        </div>

                        <div className='center-content'>

                        </div>



                        <div className='right-content'>
                            <div className='search'>
                                <input className='input-search'></input>
                                <i className="fas fa-search"></i>
                            </div>
                            {/* <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div> */}
                            <div className='hotline'><i className="fas fa-headphones"> Hotline: 0888 686 868</i></div>
                        </div>
                    </div>
                </div>



                {
                    this.props.isShowBanner === true &&
                    <div>
                        <div className='home-header-banner'>
                            <div className='Marquee' >
                                <Marquee gradientWidth={0} speed={100} >
                                    <div className='company-name'>
                                        {/* DENTAL 32 SMILE - HỆ THỐNG NHA KHOA 4.0 UY TÍN SỐ 1 VIỆT NAM     */}
                                        <FormattedMessage id={"homeheader.Title-dental"} />
                                    </div>
                                </Marquee>
                            </div>
                        </div>

                        <div className='Menu'>
                            <div className='menu-container'>
                                <div className='option_1 ' onClick={() => this.CosmeticDentistry()}>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homeheader.Cosmetic-dentistry"} /></div>
                                </div>

                                <div className='option_1' onClick={() => this.CosmeticTeeth()}>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homeheader.Children's-teeth"} /></div>
                                </div>

                                <div className='option_1' onClick={() => this.Page404()}>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homeheader.Implant"} /></div>
                                </div>

                                <div className='option_1'>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homeheader.Tooth-extraction"} /></div>
                                </div>

                                <div className='option_1'>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homeheader.Orthodontic"} /></div>
                                </div>

                                <div className='option_1'>
                                    <div className='option-icon'>
                                        <i className="fas fa-user-md"></i>
                                    </div>
                                    <div className='option-title'><FormattedMessage id={"homeheader.Other-services"} /></div>
                                </div>
                            </div>
                        </div>
                    </div>


                }



            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
