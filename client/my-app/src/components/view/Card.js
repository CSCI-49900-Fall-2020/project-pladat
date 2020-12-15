import React from 'react';

import './styles/Card.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as allUserActions from '../../actions/UserActions';
import * as allStudentActions from '../../actions/StudentActions';
import * as allRecruiterActions from '../../actions/RecruiterActions';
import * as allEmployerActions from '../../actions/EmployerActions';


class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curUser: this.props.user.user,
            curUserType: this.props.user.user ? this.props.user.user.typeOfUser : null,
            curUserImages: this.handleImgPopulate(),
            curUserMaxImgNum: this.props.user.user ? this.props.user.user.maxNumImages : 6,

            cardType: this.props.cardType,
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props !== prevProps) {
            const { user } = this.props.user;

            if(prevProps.user.user !== user) {
                this.setState({
                    curUser: user,
                    curUserType: this.props.user.user ? this.props.user.user.typeOfUser : null,
                    curUserImages: this.handleImgPopulate(),
                    curUserMaxImgNum: this.props.user.user ? this.props.user.user.maxNumImages : 6,
                })
            }
        }
    }

    handleImgPopulate = () => {
        const curUserImgs = this.props.user.user ? this.props.user.user.images : [];
        const imgMax = this.props.user.user ? this.props.user.user.maxNumImages : 6;

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

    render() {
        return (
            <article id='card-article-wrapper'>
                <div id='card-carousel'>
                    {
                        this.state.cardType === 'user' ?

                        <div id='user-card-carousel-slideList' className='card-carousel-slideList'>
                            <figure className='card-carousel-slide carousel-slide1'></figure>
                            <figure className='card-carousel-slide carousel-slide2'></figure>
                            <figure className='card-carousel-slide carousel-slide3'></figure>
                            <figure className='card-carousel-slide carousel-slide4'></figure>
                        </div>

                        : ''
                    }
                    {
                        this.state.cardType === 'job' ?

                        <div id='job-card-carousel-slideList' className='card-carousel-slideList'>
                            <figure className='card-carousel-slide carousel-slide1'></figure>
                            <figure className='card-carousel-slide carousel-slide2'></figure>
                            <figure className='card-carousel-slide carousel-slide3'></figure>
                            <figure className='card-carousel-slide carousel-slide4'></figure>
                        </div>

                        : ''
                    }
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

// let slides = ['.slide1', '.slide2', '.slide3'];
// let curIdx = 0;
// let cur = slides[curIdx];

// function down() {
// 	if(idx < slides.length - 1) {
//   	idx+=1;
//   }
// }

// function up() {
// 	if(idx > 0) {
//   	idx-=1;
//   }
// }

// function smartDown() {
// 	if(curIdx < slides.length -1) {
//   slides.map((slide, idx) => {
//   	let offset = (idx*500)+((-1*curIdx*500)-500);
//   	document.querySelector(slide).style.top = `${offset}px`;
// 	});
//   curIdx++;
//   }
// }

// function smartUp() {
// 	if(curIdx > 0) {
//   slides.map((slide, idx) => {
//   	let offset = (idx*500)-((curIdx*500)-500);
//   	document.querySelector(slide).style.top = `${offset}px`;
// 	});
//   curIdx--;
//   }
// }

// document.querySelector('#downBtn').addEventListener("click", smartDown);

// document.querySelector('#upBtn').addEventListener("click", smartUp);
