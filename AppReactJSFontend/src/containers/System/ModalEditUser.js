
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./ModalEditUser.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form, Row, Col } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import _ from 'lodash';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
        }


    }




    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
                phoneNumber: user.phoneNumber,
            })
        }
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;

        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'firstName', 'lastName', 'address', 'phoneNumber'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === true) {
            // call apis edit
            this.props.editUser(this.state);
        }

    }


    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'ccc'}
                size="lg"
                centered
            >
                <ModalHeader toggle={() => { this.toggle() }} cssModule={{ 'modal-title': 'w-100 text-center' }}>Edit user</ModalHeader>
                <ModalBody>
                    <Form>
                        <Row >
                            <Col md={12}>
                                <FormGroup>
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        placeholder="Email"
                                        type="email"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'email') }}
                                        value={this.state.email}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="firstName">
                                        First name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First name"
                                        type="text"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'firstName') }}
                                        value={this.state.firstName}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="lastName">
                                        Last name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last name"
                                        type="text"
                                        onChange={(event) => { this.handleOnChangeInput(event, 'lastName') }}
                                        value={this.state.lastName}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label htmlFor="exampleAddress">
                                Address
                            </Label>
                            <Input
                                id="exampleAddress"
                                name="address"
                                placeholder="1234 Main St"
                                onChange={(event) => { this.handleOnChangeInput(event, 'address') }}
                                value={this.state.address}
                            />
                        </FormGroup>

                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label htmlFor="phoneNumber">
                                        Phone number
                                    </Label>
                                    <Input
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type='text'
                                        onChange={(event) => { this.handleOnChangeInput(event, 'phoneNumber') }}
                                        value={this.state.phoneNumber}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="gender">
                                        Sex
                                    </Label>
                                    <Input
                                        id="gender"
                                        name="gender"
                                        type="select"
                                        onChange={(event) => {this.handleOnChangeInput(event, 'gender')}}
                                        value = {this.state.gender}
                                    >
                                        <option selected value={1}>
                                            Male
                                        </option>
                                        <option value={0}>
                                            Female
                                        </option>
                                        <option >
                                            Other
                                        </option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label htmlFor="roleId">
                                        Role id
                                    </Label>
                                    <Input
                                        id="roleId"
                                        name="select"
                                        type="select"
                                        onChange={(event) => {this.handleOnChangeInput(event, 'roleid')}}
                                        value = {this.state.roleid}
                                    >
                                        <option value={R1}>
                                            R1
                                        </option>
                                        <option selected value={R2}>
                                            R2
                                        </option>
                                        <option value={R3}>
                                            R3
                                        </option>
                                    </Input>
                                </FormGroup>
                            </Col> */}
                        </Row>

                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary px-3"
                        onClick={() => { this.handleSaveUser() }}

                    >
                        Save
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);



