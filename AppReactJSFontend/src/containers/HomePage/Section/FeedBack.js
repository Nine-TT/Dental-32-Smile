import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FeedBack.scss'
import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';


class FeedBack extends Component {


    render() {

        return (
            <div className='feed-container'>
                <div>
                    <MDBCarousel showControls showIndicators className='container-feed'>
                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={1}
                            src='https://mdbootstrap.com/img/new/slides/041.jpg'
                            alt='...'
                        >
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </MDBCarouselItem>
                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={2}
                            src='https://mdbootstrap.com/img/new/slides/042.jpg'
                            alt='...'
                        >
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </MDBCarouselItem>
                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={3}
                            src='https://mdbootstrap.com/img/new/slides/043.jpg'
                            alt='...'
                        >
                            <h5>Third slide label</h5>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </MDBCarouselItem>
                    </MDBCarousel>
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

export default connect(mapStateToProps, mapDispatchToProps)(FeedBack);
