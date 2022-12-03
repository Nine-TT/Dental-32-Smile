import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Footter.scss'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';


class Footter extends Component {


    render() {

        return (
            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted' style={{ backgroundColor: '#f5f5f5' }}>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Kết nối với chúng tôi trên các mạng xã hội:</span>
                    </div>

                    <div>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon color='secondary' fab icon='facebook-f' />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon color='secondary' fab icon='twitter' />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon color='secondary' fab icon='google' />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon color='secondary' fab icon='instagram' />
                        </a>
                    </div>
                </section>

                <section className='' >
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4' >
                                    <MDBIcon color='info' icon='gem' className='me-3' />
                                    DENTAL 32 SMILE
                                </h6>
                                <p>
                                    Nha khoa thông minh 4.0 - Thêm những khoảnh khắc tươi cười vào cuộc sống của bạn
                                </p>
                            </MDBCol>

                            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Dịch vụ nha khoa</h6>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Răng thẩm mỹ
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Niềng răng
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Nhổ răng khôn
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Răng sứ
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Cơ sở</h6>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Hà Nội
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Hà Giang
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Đà Nẵng
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset text-decoration-none'>
                                        Hồ Chí Minh
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Liên hệ</h6>
                                <p>
                                    <MDBIcon color='secondary' icon='home' className='me-2' />
                                    Tòa A6, Đại học Phenikaa, Hà Đông
                                </p>
                                <p>
                                    <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                    dental32smile.vn@gmail.com
                                </p>
                                <p>
                                    <MDBIcon color='secondary' icon='phone' className='me-3' /> + 84 234 567 88
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2022 Copyright:
                    <a className='text-reset fw-bold' href='https://github.com/Nine-TT'>
                        Nine-TT
                    </a>
                </div>
            </MDBFooter>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footter);
