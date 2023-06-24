import {
  postRequest,
  getRequest,
  postWithFormRequest,
  postWithSimpleFormRequest
} from '../index';

export const SignUpApi = payload => postWithFormRequest(`/signup`, payload);
export const OTP_Verification_API = payload => postWithFormRequest(`/otpVerification`, payload);
export const Resend_OTP_API = payload => postWithFormRequest(`/resendOtp`, payload);
export const Login_Api = payload => postWithFormRequest(`/login`, payload);
export const Edit_Profile_API = payload => postWithFormRequest(`/editprofile`, payload);
export const Update_Profile_API = payload => postWithFormRequest(`/updateprofile`, payload);
export const Change_Password_API = payload => postWithFormRequest(`/updatepassword`, payload);
export const Forgot_Password_API = payload => postWithFormRequest(`/forgetpassword`, payload);
export const Contact_US_API = payload => postWithFormRequest(`/contactus`, payload);
export const Search_Friend_API = payload => postWithFormRequest(`/searchFriend`, payload);
export const Send_Friend_Request_API = payload => postWithFormRequest(`/sendFriendRequest`, payload);
export const Friend_List_API = payload => postWithFormRequest(`/friendList`, payload);
export const All_Request_List_API = payload => postWithFormRequest(`/requestList`, payload);
export const Accept_Ignore_API = payload => postWithFormRequest(`/acceptOrRejectFriendRequest`, payload);
export const Cancel_Send_Request_API = payload => postWithFormRequest(`/requestCancel`, payload);
export const UnFriend_API = payload => postWithFormRequest(`/unfriend`, payload);
export const Create_Poll_API = payload => postWithFormRequest(`/create_poll`, payload);
export const Delete_Poll_API = payload => postWithFormRequest(`/delete_poll`, payload);
export const Total_Votes_Of_Poll_API = payload => postWithFormRequest(`/total_vote_of_poll`, payload);
export const Total_Likes_Of_Poll_API = payload => postWithFormRequest(`/total_likes_against_poll`, payload);
export const Poll_End_Time_API = payload => postWithFormRequest(`/poll_end_time`, payload);
export const Like_Poll_API = payload => postWithFormRequest(`/like_poll`, payload);
export const Report_Poll_API = payload => postWithFormRequest(`/report_poll`, payload);
export const Friends_Poll_API = payload => postWithFormRequest(`/friend_polls`, payload);
export const All_POlls_API = payload => getRequest(`/poll_list`, payload);
export const My_All_POlls_API = payload => getRequest(`/my_polls`, payload);
export const GetProfileAPI = payload => getRequest(`/getprofile`, payload);
export const Hash_Tag_List_API = payload => getRequest(`/hash_tag_list`, payload);
export const Get_Interests_API = payload => getRequest(`/interests`, payload);


