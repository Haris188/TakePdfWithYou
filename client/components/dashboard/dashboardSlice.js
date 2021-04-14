import { createSlice } from "@reduxjs/toolkit"

const mockData = [
    {
        id: '1',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
        read: '34'
    },
    {
        id: '3',
        name: 'Java for Dummies',
        thumb: 'https://images-na.ssl-images-amazon.com/images/I/51KmqPgtZnL._SX258_BO1,204,203,200_.jpg',
        downloadLink: 'https://firebasestorage.googleapis.com/v0/b/take-pdf-with-you.appspot.com/o/1%2FResume.pdf?alt=media&token=bd2fd8af-f1f1-4bec-a185-905901d60d22',
        bookmark: '3',
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
        }
    }
})

export const {
    setLoading,
    setPdfs,
    setError,
    setUploadError
} = dashboardSlice.actions

const getPdfsFromServer = async ()=>{
    return mockData
}

const uploadPdfToServer = async ()=>{
    return {error: true}
}

export const getPdfs = ()=>async (dispatch)=>{
    dispatch(setLoading(true))
    const res = await getPdfsFromServer()

    if(!res || res.error){
        dispatch(setError(true))
        dispatch(setPdfs([]))
        dispatch(setLoading(false))
        return
    }

    dispatch(setPdfs(res))
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
    state.dashboard.pdfs
)

export default dashboardSlice.reducer