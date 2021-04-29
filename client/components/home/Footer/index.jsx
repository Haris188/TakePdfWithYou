import React from 'react'
import {Container} from '@material-ui/core'
import styled from 'styled-components'

const Background = styled.div`
background: #303030;
color: white;
padding-top: 3em;
padding-bottom:3em;
`

const Footer = ()=>{
    return (
        <Background>
            <Container>
                <p>Copyright (c) by TakePdfWithYou</p>
            </Container>
        </Background>
    )
}

export default Footer