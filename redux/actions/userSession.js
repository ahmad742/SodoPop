//auth actions...
import {
  ISSIGNEDIN,
  LOGOUT,
  SIGNUPTOKEN,
  USEREMAIL,
  USERID,
  GUESTUSER
} from './types';

export const logoutUser = () => ({
  type: LOGOUT
})

export const signuptoken = (token) => ({
  type: SIGNUPTOKEN,
  payload:token
});
export const useremail = (email) => ({
  type: USEREMAIL,
  payload:email
});
export const userid = (id) => ({
  type: USERID,
  payload:id
});
export const enabbleSignIn=(payload)=>({
  type: ISSIGNEDIN,
  payload:payload
});
export const GuestUser = (payload) => ({
  type: GUESTUSER,
  payload: payload
})

