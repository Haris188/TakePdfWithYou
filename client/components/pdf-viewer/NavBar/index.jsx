import { Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import {
    numPagesSelector,
    scrollIntoView
} from '../pdfViewerSlice'

const ContainerDiv = styled.div`
    position:fixed;
    width: 100%;
    z-index: 1;
    background: ${(props)=>props.theme.palette.background.secondary};
`
const PageNavDiv = styled.form`
    display:flex;
    margin-top: 1em;
    margin-bottom: 1em;
    align-items:center;
`
const Input = styled.input`
    margin: auto 0.5em;
    max-width: 2.5em;
    background: #E9E9E9;
    border: none;
    padding:.4em;
    font-weight: bold;
    text-align:center;
    color: ${props=>props.theme.palette.primary.main}
    &:focus{
        outline:none;
    }
`

const NavBar = ()=>{
    const totalPages = useSelector(numPagesSelector)
    const [pgNumber, setPgNumber] = useState('')
    const dispatch = useDispatch()

    const handleChange = ({target})=>{
        if(parseInt(target.value) || target.value == '')
        setPgNumber(target.value)
    }

    const handleSubmit = (e)=>{
        if(pgNumber !=''){
            dispatch(scrollIntoView(pgNumber))
        }

        e.preventDefault()
    }

    return (
        <ContainerDiv>
            <Container>
                <PageNavDiv onSubmit={handleSubmit}>
                    <p>Goto Page</p>
                    <Input 
                        onChange={handleChange}
                        value={pgNumber}
                    />
                    <p>of {totalPages}</p>
                </PageNavDiv>
            </Container>
        </ContainerDiv>
    )
}

export default NavBar