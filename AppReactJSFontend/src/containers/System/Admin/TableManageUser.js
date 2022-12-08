import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';


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
            <div>
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

                                let textRole = ''
                                let textGender = ''
                                let textPosition = ''
                                if (item.roleId === 'R1') {
                                    textRole = 'Quản Trị Viên';
                                } else if (item.roleId === 'R2') {
                                    textRole = 'Bác sĩ'
                                } else {
                                    textRole = 'Bệnh nhân'
                                }


                                if (item.gender === 'M') {
                                    textGender = 'Nam';
                                } else if (item.gender === 'F') {
                                    textGender = 'Nữ'
                                } else {
                                    textGender = 'Khác'
                                }

                                if (item.positionId === 'P0') {
                                    textPosition = 'Bác sĩ'
                                } else if (item.positionId === 'P1') {
                                    textPosition = 'Thạc sĩ'
                                } else if (item.positionId === 'P2') {
                                    textPosition = 'Tiến sĩ'
                                } else if (item.positionId === 'P3') {
                                    textPosition = 'Phó giáo sư'
                                } else {
                                    textPosition = 'Giáo sư'
                                }

                                console.log(item)
                                return (
                                    <tr key={index} >
                                        <td className='text-center'>{item.email}</td>
                                        <td className='text-center'>{item.firstName}</td>
                                        <td className='text-center'>{item.lastName}</td>
                                        <td className='text-center'>{item.firstName + ' ' + item.lastName}</td>
                                        <td className='text-center'>{item.birthDay}</td>
                                        <td className='text-center'>{item.address}</td>
                                        <td className='text-center'>{textGender}</td>
                                        <td className='text-center'>{textRole}</td>
                                        <td className='text-center'>{item.phoneNumber}</td>
                                        <td className='text-center'>{textPosition}</td>
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

                <Pagination aria-label="Page navigation example" className='d-flex justify-content-end '>
                    <PaginationItem >
                        <PaginationLink className='fs-5 text-dark' previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className='fs-5 text-dark' href="#">
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className='fs-5 text-dark' href="#">
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className='fs-5 text-dark' href="#">
                            3
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink className='fs-5 text-dark' next href="#" />
                    </PaginationItem>
                </Pagination>

            </div>




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
