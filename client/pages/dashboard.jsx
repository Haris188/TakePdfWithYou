import React from 'react'
import Head from 'next/head'
import Toolbar from '../components/dashboard/Toolbar'
import PdfPreviews from '../components/dashboard/PdfPreview'
import styled from 'styled-components'

const Div = styled.div`
    padding-top: 3em;
`

const Dashboard = ()=>{
    return (
        <Div>
            <Head>
                <title>Library</title>
            </Head>
            <Toolbar />
            <PdfPreviews />
        </Div>
    )
}

export default Dashboard