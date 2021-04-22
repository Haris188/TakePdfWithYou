import React from 'react'
import {Button as MuiButton, Container as MuiContainer} from '@material-ui/core'
import styled from 'styled-components'
import {useRouter} from 'next/router'

const HeroImg = styled.img`
    max-width: 100%;
    margin: 0 auto;
    margin-bottom: 1em;

    @media only screen and (min-width:500px){
        max-width: 480px;
    }

    @media only screen and (min-width:900px){
        max-width: 600px;
    }
`
const H1 = styled.h1`
    margin-bottom: 0.5em;
    @media only screen and (min-width: 700px){
        font-size: 2.5em;
    }
`
const H4 = styled.h4`
    font-weight: normal;
    font-size: 1.2em;
    margin-bottom: 1.5em;
`
const Button = styled(MuiButton)`
    && {
        background: ${props=>props.theme.palette.primary.accent};
        color: white;
        border-radius: 10px;
        padding-right: 2.5em;
        padding-left: 2.5em;
        font-size: 1em;
    }
`
const ContentDiv = styled.div`
    margin: 0 auto;
    max-width: 420px;
    margin-bottom: 2em;
    @media only screen and (min-width:900px){
        max-width: 600px;
    }
    @media only screen and (min-width: 1400px){
        max-width: 480px;
    }
`
const Container = styled(MuiContainer)`
    && {
        height:90%;
        flex-grow:1;

    text-align: center;
    display:flex;
    flex-direction:column;
    height:100%;
    justify-content: center;

    @media only screen and (min-width: 1400px){
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        text-align: left;
    }
    }
`

const Hero = ()=>{
    const headline = 'Do you read your pdfs on Desktop and Mobile and Tablet and....'
    const tagline = 'Now you can start reading your pdf from where you left'

    const router = useRouter()

    const navigateToSignup=()=>{
        router.push('/signup')
    }

    return (
        <Container>
                <HeroImg 
                    src="/hero_ill.svg" 
                    alt="hero img"
                />

                <ContentDiv>
                    <H1>{headline}</H1>
                    <H4>{tagline}</H4>
                    <Button 
                        variant='contained' 
                        color="primary"
                        onClick={navigateToSignup}
                    >
                        Get Started
                    </Button>
                </ContentDiv>
        </Container>
    )
}

export default Hero