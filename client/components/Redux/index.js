
import {
    configureStore
} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import reduxThunk from 'redux-thunk'
import signInSlice from '../signin/signInSlice'
import signupSlice from '../signup/signupSlice'
import dashboardSlice from '../dashboard/dashboardSlice'

const reducer = combineReducers({
    signin: signInSlice,
    signup: signupSlice,
    dashboard: dashboardSlice
})

export const store = configureStore({
    reducer,
    devTools:true,
    middleware: [reduxThunk]
})