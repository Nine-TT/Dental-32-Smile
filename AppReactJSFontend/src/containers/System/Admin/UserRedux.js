import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import './UserRedux.scss'
import ModalUser from '.././ModalUser';
import Dropdown from 'react-bootstrap/Dropdown';


import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import TableManageUser from './TableManageUser';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImageURL: [],
            isOpen: false,
            messageValid: '',
            ischeck: '',
            isOpenModalUser: false,



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

            action: '',
            userEditId: '',
        }

        this.toggle = this.toggle.bind(this);
    }



    async componentDidMount() {
        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.getRoleStart();
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser,
        })
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }




    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux

            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux

            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : ''
            })
        }

        if (prevProps.listusers !== this.props.listusers) {
            let arrPositions = this.props.positionRedux
            let arrRoles = this.props.roleRedux
            let arrGenders = this.props.genderRedux
            this.setState({
                email: '',
                passWord: '',
                firstName: '',
                lastName: '',
                address: '',
                phoneNumber: '',
                birthDay: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImageURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }
    }




    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = ['email', 'passWord', 'firstName', 'lastName', 'phoneNumber', 'birthDay', 'address']
        for (let i = 0; i < arrCheck.length; i++) {

            if (!this.state[arrCheck[i]]) {
                isValid = false;
                this.state.ischeck = '1'
                alert('This input is required: ' + arrCheck[i])
                this.state.messageValid = 'Thiếu giá trị: ' + arrCheck[i];
                break;
            }
        }

        return isValid;

    }



    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let ObjectUrl = URL.createObjectURL(file);
            this.setState({
                previewImageURL: ObjectUrl,
                avatar: base64
            })
        }


    }

    openPreviewImage = () => {
        if (this.state.previewImageURL === '') {
            return;
        } else {
            this.setState({
                isOpen: true
            })
        }

    }

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
                positionId: this.state.position,
                avatar: this.state.avatar
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

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }

        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })

    }

    handleEditUserFromParent = (user) => {
        this.setState({
            modal: !this.state.modal
        });

        let imageBase64 = ' ';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64'.toString('binary'))
        }
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
            previewImageURL: imageBase64,
            action: CRUD_ACTIONS.EDIT,
            userEditId: user.id,
        }, console.log(this.state))



    }

    render() {
        let genders = this.state.genderArr;
        let roles = this.state.roleArr;
        let ischeck = this.state.ischeck;
        let messCheck = this.state.messageValid;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let { email, passWord, firstName, lastName, phoneNumber, birthDay, address,
            gender, position, role, avatar } = this.state;


        return (

            <div className='user-redux-container'>


                {/* <div className="title" >Quản lý người dùng</div> */}

                <div className='user-redux-body mt-5'>

                    <div className='container'>
                        <div className='row ' >


                            <div >
                                <Button className='btn-modal' color="primary" onClick={this.toggle}>Tạo mới</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg" style={{ maxWidth: '700px', width: '100%', marginTop: '100px' }}>
                                    <ModalHeader toggle={this.toggle} >THÔNG TIN NGƯỜI DÙNG</ModalHeader>
                                    <ModalBody className='row '>
                                        <div className='col-3'>
                                            <label for="validationServer01"><FormattedMessage id={"manage-user.email"} /></label>
                                            <input className='form-control ' id="validationServer01"
                                                type='email' placeholder='email' value={email}
                                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                                                required
                                            />

                                        </div>
                                        <div className='col-3'>
                                            <label for="validationCustom01"><FormattedMessage id={"manage-user.password"} /></label>
                                            <input className='form-control' type='password' id="validationCustom01" placeholder='password'
                                                value={passWord}
                                                onChange={(event) => { this.onChangeInput(event, 'passWord') }}
                                                disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
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
                                                            <option key={index} value={item.keyMap}>
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
                                                            <option key={index} value={item.keyMap}>
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
                                                            <option key={index} value={item.keyMap}>
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
                                            <button type="submit" className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                                onClick={() => this.handleSaveUser()}>
                                                <FormattedMessage id={"manage-user.save"} />
                                            </button>
                                        </div> */}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button className={this.state.action === CRUD_ACTIONS.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                            color="primary" onClick={() => this.handleSaveUser()}

                                        >
                                            Lưu
                                        </Button>{' '}
                                        <Button color="secondary" onClick={this.toggle}>Thoát</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>




                            <div className='col-12 container table-user  mt-5 mb-5' type="submit">
                                <TableManageUser
                                    handleEditUserFromParentKey={this.handleEditUserFromParent}
                                    action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>


                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }


            </div>
        )
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

        createNewUser: (data) => dispatch(actions.createNewUser(data)),

        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),

        editUser: (data) => dispatch(actions.editUser(data))
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
