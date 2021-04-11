
import {
    configureStore
} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import reduxThunk from 'redux-thunk'
import signInSlice from '../signin/signInSlice'

const reducer = combineReducers({
    signin: signInSlice
})

export const store = configureStore({
    reducer,
    devTools:true,
    middleware: [reduxThunk]
})