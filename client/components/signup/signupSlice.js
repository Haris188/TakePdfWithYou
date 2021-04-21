import { createSlice } from "@reduxjs/toolkit"
import { signIn } from "../signin/signInSlice"
import {sendSignUpReq} from '../../api'

const initialState = {
    loading:false,
    error:false,
    passwordError: false
}

const signupSlice = createSlice({
    name:"signupSlice",
    initialState,
    reducers: {
        setLoading: (state, {payload})=>{
            state.loading = payload
        },
        setError: (state, {payload})=>{
            state.error = payload
        },
        setPasswordError: (state, {payload})=>{
            state.passwordError = payload
        }
    }
})

export const {
    setLoading,
    setError,
    setPasswordError
} = signupSlice.actions

const sendSignupRequest = async (cred)=>{
    return sendSignUpReq(cred)
}

const verifyPassMatch = (cred)=>(
    cred.password === cred.confirmPassword
)

export const signup = (cred, router)=>async (dispatch)=>{
    dispatch(setError(false))
    dispatch(setPasswordError(false))
    dispatch(setLoading(true))

    if(!verifyPassMatch(cred)){
        dispatch(setPasswordError(true))
        dispatch(setLoading(false))
        return
    }

    delete cred.confirmPassword
    const res = await sendSignupRequest(cred)

    if(!res || res.error)
    dispatch(setError(true))

    dispatch(signIn({email: cred.email, password: cred.password}, router))
    dispatch(setLoading(false))
}

export const loadingSelector = (state)=>{
    return state.signup.loading
}

export const errorSelector = (state)=>{
    return state.signup.error
}

export const passwordErrorSelector = (state)=>{
    return state.signup.passwordError
}

export default signupSlice.reducer