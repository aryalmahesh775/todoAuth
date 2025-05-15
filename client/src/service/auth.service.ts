import { authFailure, authRequest, authSuccess, logoutSuccess, verifyOtpSuccess } from "../redux/slice/authSlice";
import  store  from "../redux/store";
import axiosInstance from "./url.service";

const dispatch = store.dispatch;

// signup user
interface SignUpData {
    username: string;
    email: string;
    password: string;
}

export const signUpUser = async(userData: SignUpData) => {
    dispatch(authRequest());
    try {
        const response = await axiosInstance.post('/auth/signup', userData)
        dispatch(authSuccess(response.data.data))
        return response.data;
    } catch (error:any) {
        dispatch(authFailure(error.message))
        throw error.response.data;
    }
}

//signin user
interface SignInData {
    email: string;
    password: string;
}

export const signInUser = async(userData: SignInData) => {
    dispatch(authRequest());
    try {
        const response= await axiosInstance.post('/auth/signin',userData)
        dispatch(authSuccess(response.data.data))
        return response.data;
    } catch (error:any) {
        dispatch(authFailure(error))
        throw error.response.data;
    }
}


//otp verify user
interface OtpData {
    otp: string;
}

export const otpVerify = async(optData: OtpData) => {
    dispatch(authRequest());
    try {
        const response= await axiosInstance.post('/auth/verify-otp',optData)
        dispatch(verifyOtpSuccess())
        return response.data;
    } catch (error:any) {
        throw error.response.data;
    }
}


//user forgot password
export const forgotPassword = async(email: string) => {
    try {
        const response= await axiosInstance.post('/auth/forgot-password',email)
        return response.data;
    } catch (error:any) {
        throw error.response.data;
    }
}

//user reset password
interface ResetPasswordData {
    token: string;
    newPassword: string;
}

export const resetPassword = async(resetData: ResetPasswordData) => {
    try {
        const response = await axiosInstance.post('/auth/reset-password', resetData);
        return response.data;
    } catch (error: any) {
        throw error.response?.data;
    }
}

//user logout
export const logout = async()=>{
    try {
        const response= await axiosInstance.get('/auth/logout')
        if(response.status=== 200){
            dispatch(logoutSuccess())
        }
        return response.data;
    } catch (error:any) {
        throw error.response.data;
    }
}


//user-profile
export const fetchUserProfile = async() =>{
     dispatch(authRequest());
     try {
        const response = await axiosInstance.get('/user/profile')
        console.log(response.data)
        dispatch(authSuccess(response.data.data))
        return response.data;
     } catch (error:any) {
        dispatch(authFailure(error.response.data))
        throw error.response.data;
     }
}