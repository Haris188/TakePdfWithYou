import { Container as MuiContainer } from '@material-ui/core'
import React from 'react'
import SectionHeading from '../SectionHeading'
import styled from 'styled-components'

const steps = [
    {
        place:1,
        title: 'Add your file to app',
        body: 'Add to add the file you want to take with you',
        videoUrl: '/step_1.mp4'
    },
    {
        place:2,
        title: 'Read and Close without worry',
        body: 'Your last read page will automatically be saved',
        videoUrl: '/step_2.mp4',
        reverse:true
    },
    {
        place:3,
        title: 'Reopen on another device',
        body: 'You can continue reading on another device from where you left reading on your previous device or session',
        videoUrl: '/step_3.mp4'
    }
]

const Container = styled(MuiContainer)`
    padding-top: 2em;
    padding-bottom:2em;
`
const ContentDiv = styled.div`
    display:flex;
    margin-top:3em;
    direction:ltr;
`
const StepDiv = styled.p`
    height: 2em;
    width:2em;
    background: ${props=>props.theme.palette.background.secondary};
    display:flex;
    justify-content:center;
    align-items:center;

    p{
        color: ${props=>props.theme.palette.primary.main};
        font-weight: bold;
    }
`
const BodyDiv = styled.div`
    margin-left: 1em;
    margin-bottom: 1em;
    p{
        margin-top:0.5em;
    }
`
const Video = styled.div`
    position: relative; 
    padding-bottom: 56.25%; 
    overflow:hidden;
    border-radius:5px;

    video {
        position: absolute; 
        top: 0; 
        left: 0; 
        width: 100%; 
    }
`
const ContainerDiv = styled.div`
    @media only screen and (min-width: 600px){
        display:grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 1em;
        margin-top: 2em;
        align-items:center;
    }
`
const VideoDiv = styled.div`
    height:100%;
    width:100%;
    max-width: 480px;
    box-shadow: 0px 0px 4px rgba(0,0,0,0.1);
     @media only screen and (min-width:600px){
        margin-left: 1em;
        justify-self: end;
     }
`

const StepSection = (props)=>{
    return (
        <ContainerDiv className={props.reverse? 'reverse':''}>
            <ContentDiv className="content-div">
                <StepDiv><p>{props.step}</p></StepDiv>
                <BodyDiv>
                    <h3>{props.title}</h3>
                    <p>{props.body}</p>
                </BodyDiv>
            </ContentDiv>
            <VideoDiv>
                <Video>
                    <video 
                        src={props.vid}
                        muted
                        autoPlay
                        loop
                        controls={false}
                    />
                </Video>
            </VideoDiv>
        </ContainerDiv>
    )
}

const How = ()=>{
    return (
        <Container>
            <SectionHeading>
                How it works?
            </SectionHeading>
            {steps.map(step=>(
                <StepSection 
                    key={step.place}
                    step = {step.place}
                    title = {step.title}
                    body={step.body}
                    vid={step.videoUrl}
                    reverse={step.reverse}
                />
            ))}
        </Container>
    )
}

export default How