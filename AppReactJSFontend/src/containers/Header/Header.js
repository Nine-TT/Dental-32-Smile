import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, USER_ROLE } from '../../utils'
import _ from 'lodash';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            menuApp: []
        })
    }

    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.user.roleId;

            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu;
            }

            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu;
            }
        }

        this.setState({
            menuApp: menu
        })
        console.log('check login user role: ', userInfo)
    }

    render() {
        const { processLogout, userInfo, language } = this.props;

        return (
            <div className="header-container">
                <div className='logo-company'></div>
                {/* thanh navigator */}
                <div className="header-tabs-container">

                    <Navigator menus={this.state.menuApp} />
                </div>



                <div className="languages ">
                    <span className='welcome'>
                        {/* <FormattedMessage id={"homeheader.Welcome"} /> */}

                        {/* {userInfo.user ? userInfo.user.firstName + ' ' + userInfo.user.lastName : ''} */}
                        <Dropdown >
                            <i className="fas fa-user-circle fa-lg"></i>
                            <Dropdown.Toggle variant="Secondary" id="dropdown-basic" className='btn-user'>
                                {userInfo.user ? userInfo.user.firstName + ' ' + userInfo.user.lastName : ''}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Thông tin</Dropdown.Item>
                                <Dropdown.Item onClick={processLogout}>Đăng xuất</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </span>
                    {/* <span className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi '}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span className={language === LANGUAGES.EN ? "language-en active" : "language-en"}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span> */}
                    {/* nút logout */}

                    {/* <div className="btn btn-logout" onClick={processLogout} title="Đăng xuất">
                        <i className="fas fa-sign-out-alt"></i>
                    </div> */}
                </div>


            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
