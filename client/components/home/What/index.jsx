import React from 'react'
import {Container as MuiContainer} from '@material-ui/core'
import {default as Heading} from '../SectionHeading'
import styled from 'styled-components'

const Img = styled.img`
    width:100%;
    max-width:400px;
`
const ImgDiv= styled.div`
    margin-top: 2em;
    display:flex;
    justify-content:center;
`
const Container = styled(MuiContainer)`
    && {
        padding-top:4em;
        padding-bottom:4em;
        @media only screen and (min-width:700px){
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: center;
        }
    }
`
const BackgroundContainer = styled.div`
    background: ${props=>props.theme.palette.background.secondary};
`
const Bold = styled.span`
    font-weight:bold;
`
const SectionHeading = styled(Heading)`
    margin-bottom: 0.7em;
`

const What = ()=>{
    const heading = 'Why this app exists?'
    const content = <p>This app resolves the utmost pain you get when you stop reading your science fiction or novel or how-to-become-next-billionaire and want to open the same file on another device. This app provides one access point for all your PDF files. <Bold>Now you can switch reading from your desktop to phone and start from the same point where you left.</Bold></p>

    return (
        <BackgroundContainer>
            <Container>
            <div>
                <SectionHeading>
                    {heading}
                </SectionHeading>
                {content}
            </div>
            <ImgDiv>
                <Img src="/what_ill.svg" alt="what ill"/>
            </ImgDiv>
        </Container>
        </BackgroundContainer>
    )
}

export default What