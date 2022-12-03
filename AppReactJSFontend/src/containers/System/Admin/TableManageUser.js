import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';



class TableManageUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
            isOpenModalUser: false,
            userRedux: [],
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listusers !== this.props.listusers) {
            this.setState({
                userRedux: this.props.listusers
            })
        }
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


    handleDelete = (user) => {
        this.props.deleteUser(user.id);
    }

    handleEditUser = (user) => {
        this.props.handleEditUserFromParentKey(user)
    }


    render() {
        let arrUsers = this.state.userRedux;

        return (
            <table id="customers" className='container '>
                <tbody>
                    <tr>
                        <th className='text-center'>Email</th>
                        <th className='text-center'>Họ đệm</th>
                        <th className='text-center'>Tên</th>
                        <th className='text-center'>Họ & tên</th>
                        <th className='text-center'>Năm sinh</th>
                        <th className='text-center'>Địa chỉ</th>
                        <th className='text-center'>Giới tính</th>
                        <th className='text-center'>Vai trò</th>
                        <th className='text-center'>Điện thoại</th>
                        <th className='text-center'>Chức danh</th>
                        <th className='w-5'></th>
                    </tr>

                    {
                        arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index} >
                                    <td className='text-center'>{item.email}</td>
                                    <td className='text-center'>{item.firstName}</td>
                                    <td className='text-center'>{item.lastName}</td>
                                    <td className='text-center'>{item.firstName + ' ' + item.lastName}</td>
                                    <td className='text-center'>{item.birthDay}</td>
                                    <td className='text-center'>{item.address}</td>
                                    <td className='text-center'>{item.gender}</td>
                                    <td className='text-center'>{item.roleId}</td>
                                    <td className='text-center'>{item.phoneNumber}</td>
                                    <td className='text-center'>{item.positionId}</td>
                                    <td className='w-5'>
                                        <button className='btn-edit' onClick={() => { this.handleEditUser(item) }}><i className="fas fa-edit"></i></button>

                                        <button className='btn-delete' onClick={() => { this.handleDelete(item) }}><i className="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }


                </tbody>
            </table >

        );
    }

}

const mapStateToProps = state => {
    return {
        listusers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
