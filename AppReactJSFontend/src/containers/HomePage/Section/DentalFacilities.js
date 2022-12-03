import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DentalFacilities.scss'

import Slider from "../../../../node_modules/react-slick";
import img_1 from '../../../assets/OutService/home.webp'


class DentalFacilities extends Component {


    render() {
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
            <div className='section-DentalFacilities'>
                <div className='df-container'>
                    <div className='df-header'>
                        <span>cơ sở trên toàn quốc</span>
                        <button>Xem thêm</button>
                    </div>
                    <Slider {...settings}>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Hà Giang</div>

                            <div className='info'>
                                <div className='name'>Cơ sở Hà Giang</div>
                                <div className='address'>Địa chỉ: 99, Tổ 2, P.Trần Phú, TP Hà Giang</div>
                                <div className='phone'>ĐT: 0999 999 999</div>
                                <div className='map'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span><a href=''> Xem vị trí trên bản đồ</a></span>
                                </div>
                            </div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Hà Nội</div>

                            <div className='info'>
                                <div className='name'>Cơ sở Hà Nội</div>
                                <div className='address'>Địa chỉ: Tòa A8,  Đại Học Phenikaa, Yên nghĩa, Hà Đông, TP Hà Nội</div>
                                <div className='phone'>ĐT: 0999 999 999</div>
                                <div className='map'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span><a href=''> Xem vị trí trên bản đồ</a></span>
                                </div>
                            </div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Thành phố Hồ Chí Minh</div>

                            <div className='info'>
                                <div className='name'>Cơ sở Hồ Chí Minh</div>
                                <div className='address'>Địa chỉ: Vinhomes Central Park, 208 Nguyễn Hữu Cảnh, Bình Thạch, TP Hồ Chí Minh</div>
                                <div className='phone'>ĐT: 0999 999 999</div>
                                <div className='map'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span><a href=''> Xem vị trí trên bản đồ</a></span>
                                </div>
                            </div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Nha Trang</div>

                            <div className='info'>
                                <div className='name'>Cơ sở Nha Trang</div>
                                <div className='address'>Địa chỉ: 9CC B, Chợ Đầm, TP. Nha Trang</div>
                                <div className='phone'>ĐT: 0999 999 999</div>
                                <div className='map'>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span><a href=''> Xem vị trí trên bản đồ</a></span>
                                </div>
                            </div>
                        </div>


                    </Slider>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DentalFacilities);
