import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';
import * as allStudentActions from '../../actions/StudentActions';
import * as allRecruiterActions from '../../actions/RecruiterActions';
import * as allEmployerActions from '../../actions/EmployerActions';


import './styles/Card.css';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slides: ['.carousel-slide1', '.carousel-slide2', '.carousel-slide3', '.carousel-slide4'],
            curSlideIdx: 0,

            cardType: this.props.cardType,
            isPreview: this.props.isPreview,
            cardData: this.props.cardData,
            
            curUser: this.props.cardData,
            curUserType: this.props.cardData ? this.props.cardData.typeOfUser : null,
            curUserImages: this.handleImgPopulate(),
            curUserMaxImgNum: this.props.user.user ? this.props.user.user.maxNumImages : 6,
        }
    }


    handleImgPopulate = () => {
        const curUserImgs = this.props.cardData ? this.props.cardData.images : [];
        const imgMax = this.props.cardData ? this.props.cardData.maxNumImages : 6;

        if(curUserImgs.length === imgMax) {
            return [...curUserImgs];
        }
        else if(curUserImgs.length > 0 && curUserImgs.length < imgMax) {
            let remains = imgMax - curUserImgs.length;
            let tempArr = [...curUserImgs];
            for(let i = 0; i < remains; i++) {
                tempArr.push(null);
            }
            return tempArr;
        }
        else {
            return [];
        }
    }

    downScroll = (event) => {
        event.preventDefault();
        if(this.state.curSlideIdx < this.state.slides.length -1) {
            this.state.slides.map((slide, idx) => {
                let offset = (idx*100)+((-1*this.state.curSlideIdx*100)-100);
                document.querySelector(slide).style.top = `${offset}%`;
            });
            this.setState({
                curSlideIdx: this.state.curSlideIdx+1
            })
        }
    }
    
    upScroll = (event) => {
        event.preventDefault();
        if(this.state.curSlideIdx > 0) {
            this.state.slides.map((slide, idx) => {
                let offset = (idx*100)-((this.state.curSlideIdx*100)-100);
                document.querySelector(slide).style.top = `${offset}%`;
            });
            this.setState({
                curSlideIdx: this.state.curSlideIdx-1
            })
        }
    }

    render() {
        return (
            <article id='card-article-wrapper'>
                <div id='card-carousel'>
                    {
                        this.state.cardType === 'user' ?

                        <div id='user-card-carousel-slideList' className='card-carousel-slideList'>
                            <div className={!this.state.curUserImages[0] ? 'card-carousel-slide carousel-slide1 carousel-noImg-slide': 'card-carousel-slide carousel-slide1'} style={this.state.curUserImages[0] ? {backgroundImage: `url(${this.state.curUserImages[0].url})`}: {}}>
                                <div className='carousel-user-slide1-info carousel-slideInfo'>
                                    <div className='carousel-info-container'>
                                        {
                                            this.state.curUserType === 'Student' ?

                                            <span className='slide1-info slide1-student-info'>
                                                <h1>{this.state.curUser.firstname}</h1>
                                                <h2>Education: {this.state.curUser.university.length > 1 ? this.state.curUser.university[0] + ', ' + this.state.curUser.university[1] : this.state.curUser.university[0]}</h2>
                                                <h2>Studying: {this.state.curUser.major.length > 1 ? this.state.curUser.major[0] + ', ' + this.state.curUser.major[1] : this.state.curUser.major[0]}</h2>
                                            </span>

                                            :''
                                        }
                                        {
                                            this.state.curUserType === 'Employer' ?

                                            <span className='slide1-info slide1-emp-info'>
                                                <h1>{this.state.curUser.companyName}</h1>
                                                <h2>{this.state.curUser.location}</h2>
                                            </span>

                                            :''
                                        }
                                        {
                                            this.state.curUserType === 'Recruiter' ?

                                            <span className='slide1-info slide1-rec-info'>
                                                <h1>{this.state.curUser.firstname}</h1>
                                                <h2>{this.state.curUser.jobTitle} at {this.state.curUser.companyName}</h2>
                                            </span>

                                            :''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={!this.state.curUserImages[1] ? 'card-carousel-slide carousel-slide2 carousel-noImg-slide': 'card-carousel-slide carousel-slide2'} style={this.state.curUserImages[1] ? {backgroundImage: `url(${this.state.curUserImages[1].url})`}: {}}>
                                <div className='carousel-user-slide2-info carousel-slideInfo'>
                                    <div className='carousel-info-container'>
                                        <span className='slide2-info'>
                                            <h1>"{this.state.curUser.shortDesc}"</h1>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className={!this.state.curUserImages[2] ? 'card-carousel-slide carousel-slide3 carousel-noImg-slide': 'card-carousel-slide carousel-slide3'} style={this.state.curUserImages[2] ? {backgroundImage: `url(${this.state.curUserImages[2].url})`}: {}}>
                                <div className='carousel-user-slide3-info carousel-slideInfo'>
                                    <div className='carousel-info-container'>
                                        {
                                            this.state.curUserType === 'Student' ?
                                            <div className='slide3-info'>
                                                <div className='slide3-info-group slide-info-group'>
                                                    <h2>Skills:</h2> {this.state.curUser.skills.map((skill, idx) => {
                                                        return <span className='slide-group-item'>{skill}</span>
                                                    })}
                                                </div>
                                                <div className='slide3-info-group slide-info-group'>
                                                    <h2>Experience:</h2> {this.state.curUser.generalExperience.map((exp, idx) => {
                                                        return <span className='slide-group-item'>{exp}</span>
                                                    })}
                                                </div>
                                            </div>

                                            : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={!this.state.curUserImages[3] ? 'card-carousel-slide carousel-slide4 carousel-noImg-slide': 'card-carousel-slide carousel-slide4'} style={this.state.curUserImages[3] ? {backgroundImage: `url(${this.state.curUserImages[3].url})`}: {}}>
                                <div className='carousel-user-slide4-info carousel-slideInfo'>
                                    <div className='carousel-info-container'>
                                        {
                                            this.state.curUserType === 'Student' ?
                                            <div className='slide4-info'>
                                                <div className='slide4-info-group slide-info-group'>
                                                    <h2>What I'm seeking in companies:</h2> {this.state.curUser.values.compVals.map((val, idx) => {
                                                        return <span className='slide-group-item'>{val}</span>
                                                    })}
                                                </div>
                                            </div>

                                            : ''
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        : ''
                    }
                    {
                        this.state.cardType === 'job' ?

                        <div id='job-card-carousel-slideList' className='card-carousel-slideList'>
                            <div className='card-carousel-slide carousel-slide1'></div>
                            <div className='card-carousel-slide carousel-slide2'></div>
                            <div className='card-carousel-slide carousel-slide3'></div>
                            <div className='card-carousel-slide carousel-slide4'></div>
                        </div>

                        : ''
                    }
                    {
                        this.state.cardType === 'job' ?

                        <div id='job-card-controlBtns' className='card-control'>
                            <span className='card-dislike-controlBtn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="18px" height="18px">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                                    </svg>
                                </span>
                            <div className='job-card-controlBtns-contaier'>
                                <span className='card-skip-controlBtn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/>
                                    </svg>
                                </span>
                                <span className='card-like-controlBtn'>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                        <path d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                    </svg>
                                </span>
                            </div>
                        </div>

                        : ''
                    }
                    <div className='carousel-nav-btns'>
                        <div className='carousel-nav-btnsContainer'>
                            <div className='carousel-nav-btn carousel-nav-btns-north' onClick={this.upScroll}>
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
                                    <rect fill="none" height="24" width="24"/>
                                    <path fill='#00a68a' d="M5,9l1.41,1.41L11,5.83V22H13V5.83l4.59,4.59L19,9l-7-7L5,9z"/>
                                </svg>
                            </div>
                            <div className='carousel-nav-btn carousel-nav-btns-south' onClick={this.downScroll}>
                                <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24">
                                    <rect fill="none" height="24" width="24"/>
                                    <path fill='#00a68a' d="M19,15l-1.41-1.41L13,18.17V2H11v16.17l-4.59-4.59L5,15l7,7L19,15z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        recruiters: state.recruiters,
        employers: state.employers,
        students: state.students
    }
}
        
const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            userActions: bindActionCreators(allUserActions, dispatch),
            recruiterActions: bindActionCreators(allRecruiterActions, dispatch),
            employerActions: bindActionCreators(allEmployerActions, dispatch),
            studentActions: bindActionCreators(allStudentActions, dispatch)
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);
