import {
  LOGOUT,
  SIGNUPTOKEN,
  USEREMAIL,
  ISSIGNEDIN,
  USERID,
  GUESTUSER
} from '../actions/types';

const INITIAL_STATE = {
  isSignedIn: false,
  token: '',
  email: '',
  id: '',
  isGuestUser: false,
};


export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SIGNUPTOKEN:
      return {
        ...state,
        token: action.payload,
      }
    case USEREMAIL:
      return {
        ...state,
        email: action.payload,
      }
    case ISSIGNEDIN: {
      return {
        ...state,
        isSignedIn: action.payload
      }
    }
    case USERID: {
      return {
        ...state,
        id: action.payload
      }
    }
    case GUESTUSER: {
      return {
        ...state,
        isGuestUser: action.payload
      }
    }
    default:
      return state;
  }
}
