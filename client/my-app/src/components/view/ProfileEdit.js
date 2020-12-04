import React from 'react';

import './styles/ProfileEdit.css';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
            curUserImages: this.props.user.user ? this.props.user.user.images: [],
            curUserMaxImgNum: this.props.user.user ? this.props.user.user.maxNumImages : 5
        }
    }

    render() {
        return (
            <div id="ProfileEdit-wrapper">
                <div className='ProfileEdit-imageContainer ProfileEdit-cut'>
                    {
                        this.state.curUserImages.length > 0 ?

                        this.state.curUserImages.map((imgLink, idx) => {
                            return (
                                <div data-imgidx={idx} ref={imgLink} className={'ProfileEdit-img ' + 'ProfileEdit-imgItem'+(idx+1)}>
                                    <img src={imgLink}/>
                                </div>
                            )
                        })

                        :

                        [1,2,3,4,5,6].map((num, idx) => {
                            return (
                                <div data-imgidx={idx} className={'ProfileEdit-img ' + 'ProfileEdit-imgItem'+num}>
                                    <span title='Add Image'>
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

                <div className='ProfileEdit-previewProfileBtn ProfileEdit-cut'>

                </div>

                <div className='ProfileEdit-inputs ProfileEdit-cut'>

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