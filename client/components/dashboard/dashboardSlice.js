import { createSlice } from "@reduxjs/toolkit"
import {getUserPdfs, sendUploadPdfReq} from '../../api'

const mockData = [
    {
        id: '1',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FT38_TEST_PAGES.pdf?alt=media&token=44467140-08ad-4ac3-8071-0605ed813b8f',
        bookmark: '2',
        read: '34'
    },
    {
        id: '3',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '1',
        read: '34'
    },
    {
        id: '4',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '5',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '6',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '7',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '8',
        read: '34'
    },
    {
        id: '8',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
]

const initialState = {
    loading: false,
    error: false,
    uploadError: false,
    filteredPdfs:[],
    pdfs:[]
}

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        setLoading: (state, {payload})=>{
            state.loading = payload
        },
        setPdfs: (state, {payload})=>{
            state.pdfs = payload
        },
        setError: (state, {payload})=>{
            state.error = payload
        },
        setUploadError: (state, {payload})=>{
            state.uploadError = payload
        },
        setFilteredPdfs: (state, {payload})=>{
            state.filteredPdfs = payload
        }
    }
})

export const {
    setLoading,
    setPdfs,
    setError,
    setUploadError,
    setFilteredPdfs
} = dashboardSlice.actions

const getPdfsFromServer = async ()=>{
    return await getUserPdfs()
    // return mockData
}

const uploadPdfToServer = async (fileFormData)=>{
    return await sendUploadPdfReq(fileFormData)
}

export const getPdfs = ()=>async (dispatch)=>{
    dispatch(setLoading(true))
    const res = await getPdfsFromServer()

    if(!res || res.error){
        dispatch(setError(true))
        dispatch(setPdfs([]))
        dispatch(setFilteredPdfs([]))
        dispatch(setLoading(false))
        return
    }

    dispatch(setPdfs(res))
    dispatch(setFilteredPdfs(res))
    dispatch(setLoading(false))
}

export const uploadFile = (fileFormData)=> async (dispatch)=>{
    dispatch(setLoading(true))
    const res = await uploadPdfToServer(fileFormData)
    
    if(!res || res.error){
        dispatch(setUploadError(true))
        dispatch(setLoading(false))
        return
    }

    dispatch(getPdfs())
}

export const filterPdfs = (searchTerm)=>(dispatch, getState)=>{
    const state = getState().dashboard

    if(searchTerm === ''){
        dispatch(setFilteredPdfs(state.pdfs))
    }
    else{
        dispatch(setFilteredPdfs(
            state.pdfs.filter(pdf=>(
                new RegExp(`${searchTerm}`,'i').test(pdf.name)
            ))
        ))
    }
}

export const uploadErrorSelector = (state)=>(
    state.dashboard.uploadError
)

export const loadingSelector = (state)=>(
    state.dashboard.loading
)

export const errSelector = (state)=>(
    state.dashboard.error
)

export const pdfsSelector = (state)=>(
    state.dashboard.filteredPdfs
)

export default dashboardSlice.reducer