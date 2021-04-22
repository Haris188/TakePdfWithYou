import { Container } from '@material-ui/core'
import React from 'react'
import {useRouter} from 'next/router'
import styled from 'styled-components'

const Img = styled.img`
    display: none;
    @media only screen and (min-width: 600px){
        display: block;
        margin-right: 2em;
    }
`
const CardDiv = styled.div`
    background: rgb(133,126,177);
    background: linear-gradient(124deg, rgba(133,126,177,1) 0%, rgba(96,88,145,1) 100%);
    color: white;
    padding: 2em;
    display:flex;
    justify-content: center;
    align-Items: center;
    border-radius: 10px;
    margin-bottom: 2em;
    margin-top: 1em;
    cursor:pointer;
`

const CallToAction = ()=>{
    const flexText = 'Are you ready to take your PDFs with you? Click here to Get Started'
    const router = useRouter()

    return (
        <Container>
            <CardDiv onClick={()=>{router.push('/signup')}}>
                <Img src="/cta_ill.svg"/>
                <h3>{flexText}</h3>
            </CardDiv>
        </Container>
    )
}

export default CallToAction