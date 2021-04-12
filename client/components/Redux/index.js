
import {
    configureStore
} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import reduxThunk from 'redux-thunk'
import signInSlice from '../signin/signInSlice'
import signupSlice from '../signup/signupSlice'

const reducer = combineReducers({
    signin: signInSlice,
    signup: signupSlice
})

export const store = configureStore({
    reducer,
    devTools:true,
    middleware: [reduxThunk]
})