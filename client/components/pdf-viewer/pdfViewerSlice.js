import { createSlice } from "@reduxjs/toolkit"
import {createPageElemFor} from './Viewer'

const initialState = {
    gotoPage: null,
    numPages: null,
    items: []
}

const pdfViewerSlice = createSlice({
    name: 'pdfViewer',
    initialState,
    reducers: {
        setItems: (state, {payload})=>{
            state.items = payload
        },
        setGotoPage: (state, {payload})=>{
            state.gotoPage = payload
        },
        setNumPages:(state,{payload})=>{
            state.numPages = payload
        }
    }
})

export const {
    setItems,
    setGotoPage,
    setNumPages
} = pdfViewerSlice.actions


export const setPageThreshold = (pgNumber)=>(dispatch, getState)=>{
    const state= getState().pdfViewer
    const pgn = parseInt(pgNumber)
    const itemsLength = state.items.length
    console.log(pgn, 'pgn')
    console.log(pgn-itemsLength, 'pgn-items')
    console.log(state.numPages - pgn, 'numpg-pgn')
    console.log(state.numPages, 'numpg')

    const calculateLength = ()=>{
        if(pgn > parseInt( state.numPages))
        return state.numPages - itemsLength

        return pgn - itemsLength
    }

    const arr = new Array(calculateLength()).fill(null)
    const elemArray = arr.map((val,i)=>(
        createPageElemFor(state.items.length + i)
    ))
    
    dispatch(setItems([...state.items, ...elemArray]))

}

export const scrollIntoView = (pageNumber)=>(dispatch, getState)=>{
    const state = getState().pdfViewer
    const pgIndex = pageNumber - 1

    if(parseInt(pgIndex) >= state.items.length)
    dispatch(setPageThreshold(parseInt(pgIndex)+5))

    dispatch(setGotoPage(pgIndex))
}

export const numPagesSelector = (state)=>(
    state.pdfViewer.numPages
)

export const itemsSelector = (state)=>(
    state.pdfViewer.items
)

export const gotoSelector = (state)=>(
    state.pdfViewer.gotoPage
)

export default pdfViewerSlice.reducer