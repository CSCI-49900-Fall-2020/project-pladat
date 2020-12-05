import React from 'react';

import ButtonLoader from '../uiComponents/ButtonLoader';

import './styles/ProfileEdit.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link, Redirect, Switch, Route } from 'react-router-dom';


import * as allUserActions from '../../actions/UserActions';
import * as allStudentActions from '../../actions/StudentActions';
import * as allRecruiterActions from '../../actions/RecruiterActions';
import * as allEmployerActions from '../../actions/EmployerActions';


class ProfileEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            curUser: this.props.user.user,
            curUserType: this.props.user.user ? this.props.user.user.typeOfUser : null,
            // curUserImages: this.props.user.user ? this.props.user.user.images: [],
            curUserImages: this.handleImgPopulate(),
            curUserMaxImgNum: this.props.user.user ? this.props.user.user.maxNumImages : 6,
            toggleImgAdd: false,
            upLoadedFileName: null,
            upLoadedFile: null,

            uploadingImgToDB: false,

            profileEditFields: null
        }

        this.handleAddImg = this.handleAddImg.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props.user.user !== nextProps.user.user) || (this.props.user !== nextProps.user) || (this.state !== nextState) || (JSON.stringify(nextProps.user.user) !== JSON.stringify(this.props.user.user)) || (JSON.stringify(nextProps.user) !== JSON.stringify(this.props.user));
    }

    componentDidUpdate(prevProps) {
        if(prevProps !== this.props) {
            const { defaultEditSuccess, imagesUpdated, user, uploadingImg } = this.props.user;

            if(defaultEditSuccess) {
                this.setState({
                    curUser: user,
                    curUserType: user.typeOfUser,
                    curUserMaxImgNum: user.maxNumImages,
                    curUserImages: this.handleImgPopulate()
                })
            }

            if(uploadingImg) {
                this.setState({ uploadingImgToDB: true })
            }
            else {
                this.setState({ uploadingImgToDB: false })
            }

            if(imagesUpdated) {
                // let inp = document.querySelector('#ProfileEdit-imgFileInput');
                // inp.value = inp.defaultValue;
                this.setState({
                    toggleImgAdd: false
                })
            }
        }
    }

    componentDidMount() {
        // let authedUserType = this.props.user.user.typeOfUser;

        // switch(authedUserType) {
        //     case 'Student':
        //         const {  } = this.props.user
        //         return;
        //     case 'Recruiter':
        //         return;
        //     case 'Employer':
        //         return;
        // }

        this.setState({
            profileEditFields: this.props.user.editFields
        })
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

    handleAddImg = (event) => {
        event.preventDefault();
        this.setState({
            toggleImgAdd: true
        })
    }

    handleRemoveImg = (event) => {
        event.preventDefault();

        let targetParent = event.target.parentNode;

        let publicKey = targetParent.dataset.imgpubkey;
        let deleteIndex = targetParent.dataset.imgidx;

        console.log(deleteIndex, publicKey);

        this.props.actions.userActions.deleteImage(deleteIndex, publicKey);

    }

    handleGetImgFromUser = (event) => {
        event.preventDefault();
        
        const file = event.target.files[0];
        const fileName = file ? file.name : null;

        this.setState({
            upLoadedFile: file,
            upLoadedFileName: fileName
        })
      
    }

    handleUploadImg = (event) => {
        event.preventDefault();

        let formData = new FormData();
        let file = this.state.upLoadedFile;
        formData.append('file', file);

        // console.log(file);

        this.props.actions.userActions.upLoadImage(formData);
    }

    render() {
        return (
            <div id="ProfileEdit-wrapper">
                <div className='ProfileEdit-imageContainer ProfileEdit-cut'>
                    {
                        this.state.curUserImages.length > 0 ?

                        this.state.curUserImages.map((imgData, idx) => {
                            let elem = imgData ? 

                            (<div style={{backgroundImage: `url(${imgData.url})`, backgroundBlendMode:'overlay'}} data-imgidx={idx} data-imgurl={imgData.secure_url} data-imgpubkey={imgData.public_id} key={idx} className={'ProfileEdit-img ProfileEdit-img-hasImg ' + 'ProfileEdit-imgItem'+(idx+1)}>
                                {/* <img className='ProfileEdit-img-accImg' src={imgData.url}/> */}
                                <span className='ProfileEdit-addImgBtn' title={imgData ? 'Replace Image' : 'Add Image'}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" preserveAspectRatio='xMidYMid meet' >
                                        <path d="M0 0h24v24H0V0z" fill="none"/>
                                        <path fill="#666666" d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/>
                                    </svg>
                                </span>

                                <span onClick={this.handleRemoveImg} className='ProfileEdit-img-removeImgBtn'>&#10006;</span>
                            </div>)

                            : 
                            
                            (<div key={idx+1} data-imgidx={idx} className={'ProfileEdit-img ' + 'ProfileEdit-imgItem'+(idx+1)} onClick={this.handleAddImg}>
                            <span className='ProfileEdit-addImgBtn' title='Add Image'>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" preserveAspectRatio='xMidYMid meet' >
                                    <path d="M0 0h24v24H0V0z" fill="none"/>
                                    <path fill="#666666" d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/>
                                </svg>
                            </span>
                        </div>);
                            return elem;
                        })

                        :

                        [1,2,3,4,5,6].map((num, idx) => {
                            return (
                                <div key={num} data-imgidx={idx} className={'ProfileEdit-img ' + 'ProfileEdit-imgItem' + num} onClick={this.handleAddImg}>
                                    <span className='ProfileEdit-addImgBtn' title='Add Image'>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" preserveAspectRatio='xMidYMid meet' >
                                            <path d="M0 0h24v24H0V0z" fill="none"/>
                                            <path fill="#666666" d="M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"/>
                                        </svg>
                                    </span>
                                </div>
                            )
                        })
                    }

                </div>

                {
                    this.state.toggleImgAdd ?

                    <div className='ProfileEdit-cut ProfileEdit-addImgDialogue'>
                        <form>
                            <input id='ProfileEdit-imgFileInput' type='file' name='imgInput' accept="image/png, image/jpeg, image/jpg" onChange={this.handleGetImgFromUser}/>
                { this.state.upLoadedFile && this.state.upLoadedFileName ? <button id='ProfileEdit-uploadImgBtn' onClick={this.handleUploadImg}>{this.state.uploadingImgToDB ? <ButtonLoader/> : 'Upload image'}</button> : '' }
                        </form>
                    </div>

                    :

                    ''
                }

                
                    <div className='ProfileEdit-previewProfileBtn ProfileEdit-cut'>
                        <Link to='/s/me/preview_profile'>
                            <h2>Preview profile</h2>
                        </Link>
                    </div>

                <div className='ProfileEdit-inputs ProfileEdit-cut'>
                    {
                        this.state.curUserType === 'Student' && this.state.profileEditFields ?

                        <div className='ProfileEdit-inputs-student ProfileEdit-inputsContainer'>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                {this.state.profileEditFields.university.map((uni, idx) => {
                                    return <span>{uni} <span>&#10006;</span> </span>
                                })}
                                <input type='text' placeholder='Enter a college / university'/>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                {this.state.profileEditFields.major.map((maj, idx) => {
                                    return <span>{maj} <span>&#10006;</span> </span>
                                })}
                                <input type='text' placeholder='Enter a major'/>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                Graduation Date: {this.state.profileEditFields.graduationDate}
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                {this.state.profileEditFields.generalExperience.map((gexp, idx) => {
                                    return <span>{gexp} <span>&#10006;</span> </span>
                                })}
                                <input type='text' placeholder='Enter you skill background'/>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                {this.state.profileEditFields.preferredRoles.map((pr, idx) => {
                                    return <span>{pr} <span>&#10006;</span> </span>
                                })}
                                <input type='text' placeholder='What roles interest you'/>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                <textarea>{this.state.profileEditFields.shortDesc}</textarea>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                <input type='text' placeholder="Link to you resume"/>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                            <input type='text' placeholder="Comma separated string of links to any socials, or relevant sites"/>
                            </div>
                            <div className='ProfileEdit-input-group ProfileEdit-student-uni'>
                                <input type='text' placeholder="Values"/>
                            </div>
                        </div>

                        : ""
                    }
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);