import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import { LANGUAGES } from '../../../utils'
import './DetailDoctor.scss'
import { getDetailInforDoctor } from '../../../services/userService'
import { ShareSocial } from 'react-share-social'
import Footter from '../../HomePage/Section/Footter';


class DetailDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
        }
    }

    async componentDidMount() {
        console.log('fdjsagfdjhsfj')
        if (this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDetailInforDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailDoctor: res.data
                })
            }
        }

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    render() {
        console.log('check state: ', this.state)
        let { detailDoctor } = this.state;
        let { language } = this.props;
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }

        return (
            <>
                <HomeHeader isShowBanner={false} />
                <div className='dentist-infor-container'>
                    <div className='intro-dentist'>
                        <div className='content-left'
                            style={{ backgroundImage: `url(${detailDoctor && detailDoctor.image ? detailDoctor.image : ''})` }}
                        >

                        </div>
                        <div className='content-right'>
                            <div className='up'>
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down w-75'>
                                {
                                    detailDoctor.Markdown && detailDoctor.Markdown.description
                                    && <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                                }
                            </div>
                            <div className='social-fb'>

                                <span>Like</span>
                                <span>Share</span>
                            </div>
                        </div>
                    </div>

                    <div className='calendar'>

                    </div>

                    <div className='detail-dentist'>
                        {
                            detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML
                            && <div dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHTML }}>


                            </div>
                        }
                    </div>

                    <div className='comment'>

                    </div>
                </div>
                <Footter />
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
