import React, { Component } from 'react';
import { connect } from 'react-redux';
import './OutstandingService.scss'
import { FormattedMessage } from 'react-intl';

import Slider from "../../../../node_modules/react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img_1 from '../../../assets/OutService/rang_tham_my.webp'


function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />

    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}


class OutstandingService extends Component {



    render() {

        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            cssEase: "linear"
        };


        return (
            <div className='section-OutstandingService'>
                <div className='os-container'>
                    <div className='os-header'>
                        <span>Dịch vụ nổi bật</span>
                        <button>Xem thêm</button>
                    </div>
                    <Slider {...settings}>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Răng thẩm mỹ</div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Răng Sứ</div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Tẩy trắng răng</div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Niềng răng</div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Răng trẻ em</div>
                        </div>
                        <div className='img-custom'>
                            <img src={img_1} width={'100%'} />
                            <div>Răng thẩm mỹ</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingService);
