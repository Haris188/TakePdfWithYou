import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Viewer from '../components/pdf-viewer/Viewer'

const PdfViewer = ()=>{
    const router = useRouter()
    const [queryData, setQueryData] = useState()

    useEffect(()=>{
        if(!router.query.fileLink){
            router.push('/dashboard')
            return
        }
        setQueryData(router.query)
    },[])

    console.log(queryData)

    return (
        <div>
            <Head>
                <title>Pdf Viewer</title>
            </Head>

           { queryData
            ? <Viewer 
                fileLink = {queryData.fileLink}
                bookmark = {queryData.bookmark}
            />  
            : <div>Loading..</div>}
        </div>
    )
}

export default PdfViewer