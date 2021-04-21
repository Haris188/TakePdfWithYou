import React from 'react'
import Logo from '../../../public/logo.svg'
import Link from 'next/link'
import styled from 'styled-components'
import {
    Container as MaterialContainer
} from '@material-ui/core'

const Container = styled(MaterialContainer)`
   && {
    display:flex;
    padding-top: 1em;
    padding-bottom:1em;
    align-items: center;
   }
`
const Margined = styled.div`
    margin-left:1.5em;
`

const AppBar = ()=>{
    return (
        <Container>
            <Logo />

            <Margined>
                <Link href="/signin">
                    Sign in
                </Link>
            </Margined>
            
            <Margined>
                <Link href="/signup">
                    Register
                </Link>
            </Margined>
        </Container>
    )
}

export default AppBar