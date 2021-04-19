import { createSlice } from "@reduxjs/toolkit"
import {sendSignInReq} from '../../api'

const initialState = {
    loading:false,
    error:false
}

const signInSlice = createSlice({
    name:"signInSlice",
    initialState,
    reducers: {
        setLoading: (state, {payload})=>{
            state.loading = payload
        },
        setError: (state, {payload})=>{
            state.error = payload
        }
    }
})

export const {
    setLoading,
    setError
} = signInSlice.actions

const sendLoginRequest = async (cred)=>{
    return await sendSignInReq(cred.email, cred.password)
}

export const signIn = (cred, router)=>async (dispatch)=>{
    dispatch(setLoading(true))
    const res = await sendLoginRequest(cred)

    if(!res || res.error)
    dispatch(setError(true))

    router.push('/dashboard')

    dispatch(setLoading(false))
}

export const loadingSelector = (state)=>{
    return state.signin.loading
}

export const loginErrSelector = (state)=>{
    return state.signin.error
}

export default signInSlice.reducer