import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ModalUser.scss"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';
import { emitter } from '../../utils/emitter'

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../utils';
import * as actions from '../../store/actions';
import '../System/Admin/UserRedux.scss'

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class ModalUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageURL: [],
            isOpen: false,
            messageValid: '',


            email: '',
            passWord: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            birthDay: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action: ''
        }

        this.listenToEmitter();

    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState = ({
                email: '',
                passWord: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: ''
            })
        })
    }


    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }

        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                email: '',
                passWord: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                birthDay: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }


    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'passWord', 'firstName', 'lastName', 'phoneNumber', 'birthDay', 'address']
        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i])
                break;
            }
        }

        return isValid;

    }

    handleOnchangeImage = (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageURL: ObjectUrl,
                avatar: file
            })
        }


    }

    // openPreviewImage = () => {
    //     if (this.state.previewImageURL === '') {
    //         return;
    //     } else {
    //         this.setState({
    //             isOpen: true
    //         })
    //     }

    // }


    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        let { action } = this.state;
        if (action === CRUD_ACTIONS.CREATE) {
            //fire redux create user

            this.props.createNewUser({
                email: this.state.email,
                passWord: this.state.passWord,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDay: this.state.birthDay,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position
            })
        } else {
            // edit user
            this.props.editUser({
                id: this.state.userEditId,
                email: this.state.email,
                passWord: this.state.passWord,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                birthDay: this.state.birthDay,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }


    }

    handleEditUserFromParent = (user) => {
        console.log(user)
        this.setState({
            email: user.email,
            passWord: 'haspass',
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phoneNumber,
            birthDay: user.birthDay,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: '',
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id

        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let { email, passWord, firstName, lastName, phoneNumber, birthDay, address,
            gender, position, role, avatar } = this.state;
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'ccc'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }} cssModule={{ 'modal-title': 'w-100 text-center' }}>Add new user</ModalHeader>
                <ModalBody>
                    <div className='row ' >
                        <div className='col-12 my-3'><FormattedMessage id={"manage-user.add"} /></div>
                        <div className='col-3'>
                            <label for="validationServer01"><FormattedMessage id={"manage-user.email"} /></label>
                            <input className='form-control ' id="validationServer01"
                                type='email' placeholder='email' value={email}
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                            />

                        </div>
                        <div className='col-3'>
                            <label for="validationCustom01"><FormattedMessage id={"manage-user.password"} /></label>
                            <input className='form-control' type='password' id="validationCustom01" placeholder='password'
                                value={passWord}
                                onChange={(event) => { this.onChangeInput(event, 'passWord') }}
                            />

                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id={"manage-user.firstname"} /></label>
                            <input className='form-control' type='text' placeholder='first name'
                                value={firstName}
                                onChange={(event) => { this.onChangeInput(event, 'firstName') }}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id={"manage-user.lastname"} /></label>
                            <input className='form-control' type='text' placeholder='last name'
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                            />
                        </div>
                        <div className='col-3 mt-2'>
                            <label><FormattedMessage id={"manage-user.phonenumber"} /></label>
                            <input className='form-control' type='text' placeholder='phone'
                                value={phoneNumber}
                                onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }}
                            />
                        </div>
                        <div className='col-3 mt-2'>
                            <label><FormattedMessage id={"manage-user.birthday"} /></label>
                            <input className='form-control' type='date'
                                value={birthDay}
                                onChange={(event) => { this.onChangeInput(event, 'birthDay') }}
                            />
                        </div>
                        <div className='col-6 mt-2'>
                            <label><FormattedMessage id={"manage-user.address"} /></label>
                            <input className='form-control' type='text' placeholder='address'
                                value={address}
                                onChange={(event) => { this.onChangeInput(event, 'address') }}
                            />
                        </div>
                        <div className='col-3 mt-2'>
                            <label><FormattedMessage id={"manage-user.gender"} /></label>
                            <select className="form-control "
                                value={gender}
                                onChange={(event) => { this.onChangeInput(event, 'gender') }}
                            >
                                {genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                        <div className='col-3 mt-2'>
                            <label><FormattedMessage id={"manage-user.position"} /></label>
                            <select className="form-control"
                                value={position}
                                onChange={(event) => { this.onChangeInput(event, 'position') }}
                            >
                                {positions && positions.length > 0
                                    && positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        );
                                    })
                                }

                            </select>
                        </div>

                        <div className='col-3 mt-2'>
                            <label><FormattedMessage id={"manage-user.role"} /></label>
                            <select className="form-control"
                                value={role}
                                onChange={(event) => { this.onChangeInput(event, 'role') }}
                            >
                                {roles && roles.length > 0
                                    && roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVI : item.valueEN}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-3 mt-2'>
                            <label><FormattedMessage id={"manage-user.image"} /></label>
                            <div className='d-flex'>
                                <input type='file' id='previewImg' hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='upload' htmlFor='previewImg'><i className="fas fa-cloud-upload-alt"></i></label>
                                <div className='priview-img'
                                    style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                    onClick={() => this.openPreviewImage()}
                                >
                                </div>
                            </div>
                        </div>


                        {/* <div className='col-12 mt-3'>
                            <button type="submit" className="btn btn-primary" onClick={() => this.handleSaveUser()}>
                                <FormattedMessage id={"manage-user.save"} />
                            </button>
                        </div> */}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-3"
                        onClick={() => { this.handleSaveUser() }}

                    >
                        Add
                    </Button>{' '}
                    <Button color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listusers: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),

        getPositionStart: () => dispatch(actions.fetchPositionStart()),

        getRoleStart: () => dispatch(actions.fetchRoleStart()),

        createNewUser: (data) => dispatch(actions.createNewUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);



