import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Dentist.scss'

import Slider from "../../../../node_modules/react-slick";

import * as actions from '../../../store/actions'
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router';


// function SampleNextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", background: "red" }}
//             onClick={onClick}
//         />

//     );
// }

// function SamplePrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", background: "green" }}
//             onClick={onClick}
//         />
//     );
// }


class Dentist extends Component {


    constructor(props) {
        super(props)
        this.state = {
            arrDoctors: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
            this.setState({
                arrDoctors: this.props.topDoctorsRedux
            })
        }
    }

    componentDidMount() {
        this.props.loadDoctor();
    }

    handlViewDetailDoctor(doctor) {
        console.log('views dentis: ', doctor)
        this.props.history.push(`/dentist-infor/${doctor.id}`)
    }

    render() {
        let settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,

        };
        let { language } = this.props;

        console.log('chech props: ', this.props.topDoctorsRedux)
        let arrDoctors = this.state.arrDoctors;
        return (
            <div className='section-Dentist'>
                <div className='os-container'>
                    <div className='os-header'>
                        <span>Đội ngũ nha sĩ hàng đầu</span>
                        <button>Xem thêm</button>
                    </div>
                    <Slider {...settings}>

                        {
                            arrDoctors && arrDoctors.length > 0
                            && arrDoctors.map((item, index) => {
                                let imageBase64 = ''
                                if (item.image) {
                                    imageBase64 = new Buffer(item.image, 'base64'.toString('binary'))
                                }
                                let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                return (
                                    <div className='img-custom' key={index} onClick={() => this.handlViewDetailDoctor(item)}>

                                        <div className='avatar' style={{ backgroundImage: `url(${imageBase64})` }}>
                                            {/* <img src={`${imageBase64}`} width={'100%'} /> */}

                                        </div>
                                        <div>
                                            <div className='name'>
                                                {language === LANGUAGES.VI ? nameVi : nameEn}
                                            </div>
                                            <div className='school'>
                                                Đại học Y khoa Stanford (Mỹ)
                                            </div>
                                        </div>

                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctorsRedux: state.admin.doctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadDoctor: () => dispatch(actions.fetchDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dentist));
