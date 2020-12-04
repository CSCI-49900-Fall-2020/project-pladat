import { UserConstants, EmployerConstants, StudentConstants, RecruiterConstants } from '../constants';

const initialState = {
    isLoading: false,
    verifyingAuth: false,
    loggingInUser: false,
    loggedIn: false,
    hashedToStore: false,
    hashingToLocalStorage: false,
    removingFromLocalStorage: false,
    awaitingEmailVerification: false,
    isAuthenticated: false,
    userLoginVerified: false,
    userLoginVerificationFail: false,
    emailIsValidated: false,
    user: null,
    preliminaryInfo: null,
    authMessage: null,
    authError: [],
    errorsDidChange: false,
    authState: null,
    serverStatus: null
};

function user(state = initialState, action) {
    switch(action.type) {
        case UserConstants.USER_AWAITING_EMAIL_VERIFICATION:
            return {
                ...state,
                awaitingEmailVerification: true,
                preliminaryInfo: action.userInfo,
                authMessage: action.msg,
                authState: UserConstants.USER_AWAITING_EMAIL_VERIFICATION,
                authError: []
            };
        case UserConstants.USER_SIGNUP_FALIURE:
            return {
                ...state,
                authMessage: action.msg,
                // errorsDidChange: state.authError !== action.authErrors,
                authError: action.authErrors,
                authState: UserConstants.USER_SIGNUP_FALIURE
            };
        case UserConstants.USER_EMAIL_VERIFIED:
            return {
                ...state,
                authMessage: action.msg,
                user: action.validatedUser,
                authState: UserConstants.USER_EMAIL_VERIFIED,
                emailIsValidated: true,
                authError: [],
                awaitingEmailVerification: false
            };
        case UserConstants.USER_EMAIL_VERIFICATION_FALIURE:
            return {
                ...state,
                authMessage: action.msg,
                authError: action.msg,
                errorsDidChange: state.authError !== action.msg,
                authState: UserConstants.USER_EMAIL_VERIFICATION_FALIURE,
                emailIsValidated: false,
                awaitingEmailVerification: false
            };
        case UserConstants.LOADING_USER:
            return {
                ...state,
                isLoading: true,
                authState: UserConstants.LOADING_USER
            };
        case UserConstants.LOADING_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                emailIsValidated: false,
                loggingInUser: false,
                user: null,
                authState: UserConstants.LOADING_USER_FAILURE,
                authMessage: "Something went wrong; please refresh page."
            };
        case UserConstants.LOADING_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                loggingInUser: false,
                isAuthenticated: true,
                user: action.userInfo.data,
                authMessage: action.msg,
                authError: [],
                authState: UserConstants.LOADING_USER_SUCCESS,
                emailIsValidated: action.userInfo.data.isVerified,
                loggedIn: true
            }
        case UserConstants.USER_LOGGING_IN:
            return {
                ...state,
                loggingInUser: true,
                authMessage: action.msg,
                authState: UserConstants.USER_LOGGING_IN
            };
        case UserConstants.VERIFYING_USER_LOGIN:
            return {
                ...state,
                verifyingAuth: true,
                authState: UserConstants.VERIFYING_USER_LOGIN
            };
        case UserConstants.VERIFYING_USER_LOGIN_SUCCESS:
            return {
                ...state,
                verifyingAuth: false,
                authState: UserConstants.VERIFYING_USER_LOGIN_SUCCESS,
                isAuthenticated: action.isAuth,
                user: action.userInfo,
                authMessage: action.msg,
                emailIsValidated: action.userInfo.isVerified,
                userLoginVerified: true,
                userLoginVerificationFail: false,
                loggedIn: true,
                hashedToStore: true,
                authError: [],
                errorsDidChange: true,
            };
        case UserConstants.VERIFYING_USER_LOGIN_FAILURE:
            return {
                ...state,
                verifyingAuth: false,
                authState: UserConstants.VERIFYING_USER_LOGIN_FAILURE,
                authMessage: action.msg,
                isAuthenticated: action.isAuth,
                user: action.userInfo,
                userLoginVerified: false,
                userLoginVerificationFail: true
            }
        case UserConstants.HASHING_TO_STORAGE:
            return {
                ...state,
                hashingToLocalStorage: true
            };
        case UserConstants.HASHED_TO_STORAGE:
            return {
              ...state,
              hashingToLocalStorage: false,
              authState: UserConstants.HASHED_TO_STORAGE,
              isAuthenticated: true,
              authMessage: action.msg,
              hashedToStore: true,
              authError: [],
              errorsDidChange: true
            };
        case UserConstants.HASHING_TO_STORAGE_FAIL:
            return {
                ...state,
                hashingToLocalStorage: false,
                authState: UserConstants.HASHING_TO_STORAGE_FAIL,
                isAuthenticated: false,
                user: null

            }
        case UserConstants.USER_LOGGED_IN:
            return {
                ...state,
                loggingInUser: false,
                authMessage: action.msg,
                // isAuthenticated: true,
                emailIsValidated: action.userInfo.isVerified,
                user: action.userInfo,
                authState: UserConstants.USER_LOGGED_IN,
                authError: [],
                errorsDidChange: true,
                loggedIn: true
            };
        case UserConstants.USER_LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                loggingInUser: false,
                authError: action.msg,
                errorsDidChange: state.authError !== action.msg,
                authMessage: action.msg,
                user: null,
                authState: UserConstants.USER_LOGIN_FAILURE
            };
        case UserConstants.USER_LOGGING_OUT: 
            return {
                ...state,
                isLoading: true,
                authMessage: action.msg,
                authState: UserConstants.USER_LOGGING_OUT
            };
        case UserConstants.USER_LOGGED_OUT:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                authMessage: action.msg,
                user: null,
                authState: UserConstants.USER_LOGGED_OUT
            };
        case UserConstants.USER_LOGOUT_FAILURE:
            return {
                ...state,
                authMessage: action.msg,
                authError: action.msg,
                errorsDidChange: state.authError !== action.msg,
                authState: UserConstants.USER_LOGOUT_FAILURE
            };
        case UserConstants.USER_AWAITING_PASSWORD_RESET_VERIFICATION:
            return {
                ...state,
                authMessage: action.msg,
                preliminaryInfo: action.userInfo,
                authState: UserConstants.USER_AWAITING_PASSWORD_RESET_VERIFICATION
            };
        case UserConstants.USER_PASSWORD_RESET_FAILURE:
            return {
                ...state,
                authError: action.msg,
                errorsDidChange: state.authError !== action.msg,
                authMessage: action.msg,
                authState: UserConstants.USER_PASSWORD_RESET_FAILURE
            };
        case UserConstants.USER_PASSWORD_RESET_SUCCESS:
            return {
                ...state,
                authMessage: action.msg,
                preliminaryInfo: action.userInfo,
                authState: UserConstants.USER_PASSWORD_RESET_SUCCESS
            };
        case UserConstants.USER_AWAITING_TERMINATION:
            return {
                ...state,
                authMessage: action.msg,
                preliminaryInfo: action.userInfo,
                authState: UserConstants.USER_AWAITING_TERMINATION
            };
        case UserConstants.USER_TERMINATION_FAILURE:
            return {
                ...state,
                authMessage: action.msg,
                authError: action.msg,
                errorsDidChange: state.authError !== action.msg,
                authState: UserConstants.USER_TERMINATION_FAILURE
            };
        case UserConstants.USER_TERMINATION_SUCCESS:
            return {
                ...state,
                authMessage: action.msg,
                user: null,
                preliminaryInfo: null,
                isAuthenticated: false,
                authState: UserConstants.USER_TERMINATION_SUCCESS
            };
        case UserConstants.CLEAR_AUTH_ERRORS:
            return {
                ...state,
                authError: [],
                authMessage: null
            };
        case UserConstants.CLEAR_AUTH_STATE:
            return {
                ...state,
                authState: null
            };
        case UserConstants.GET_AUTH_ERRORS:
                // console.log('prev state err: ',state.authError);
                // console.log('next state err: ', action.errors);
            return {
                ...state,
                errorsDidChange: state.authError !== action.errors,
                authError: action.errors,
                authMessage: action.msg,
                authState: action.authState,
                serverStatus: action.status
            };

        //Update user when profileEdit
        case StudentConstants.STUDENT_PROFILE_EDIT_SUCCESS:
        case EmployerConstants.EDITING_EMPLOYER_PROFILE_SUCCESS:
        case RecruiterConstants.RECRUITER_PROFILE_EDIT_SUCCESS:
        case RecruiterConstants.VERIFY_AS_RECRUITER_EMAIL_SENT:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    } 
}

export default user;