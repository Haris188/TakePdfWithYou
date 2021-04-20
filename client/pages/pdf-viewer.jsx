import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import {useRouter} from 'next/router'
import Viewer from '../components/pdf-viewer/Viewer'
import NavBar from '../components/pdf-viewer/NavBar'
import styled from 'styled-components'
import WithAuthGate from '../components/WithAuthGate'

const ContainerDiv = styled.div`
    width: 100vw;
`

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
        <ContainerDiv>
            <Head>
                <title>Pdf Viewer</title>
            </Head>

            <NavBar />

           { queryData
            ? <Viewer 
                fileLink = {queryData.fileLink}
                bookmark = {queryData.bookmark}
                fileId={queryData.fileId}
            />  
            : <div>Loading..</div>}
        </ContainerDiv>
    )
}

const PdfViewerGate = ()=>(
    <WithAuthGate>
        {PdfViewer}
    </WithAuthGate>
)

export default PdfViewerGate