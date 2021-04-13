import {
     Container as MaterialContainer,
     TextField as MaterialTextField
} from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const H1 = styled.h1`
    color: ${props=>props.theme.palette.primary.main}
`
const P = styled.p``

const WithFlexMediaQuery = styled.div`
    @media only screen and (min-width: 600px){
        display: grid;
        grid-template-columns: 1fr 1fr;
        
    }
`
const TextField = styled(MaterialTextField)`
    && {
        @media only screen and (min-width: 600px){
            margin-right: 0;
            margin-left:auto;
            max-width: 20em;
        }
    }
`
const StyledDiv = styled.div`
    margin-right: 2em;
    margin-bottom: 1em;
    @media only screen and (min-width:550px){
        margin-bottom: 0;
    }
`
const Container = styled(MaterialContainer)`
    margin-bottom: 2em;
`

const ToolBar = ()=>(
    <Container>
        <WithFlexMediaQuery>
            <StyledDiv>
                <H1>Your Pdfs</H1>
                <P>Here is a list of pdfs that your are reading</P>
            </StyledDiv>
            <TextField
                color="primary"
                variant="filled"
                placeholder="Search with file name"
                label = "Search"
                fullWidth
            />
        </WithFlexMediaQuery>
    </Container>
)

export default ToolBar