
import React from 'react'
import {useRouter} from 'next/router'
import {
    Typography,
    CircularProgress
} from '@material-ui/core'

import styled from 'styled-components'
import * as yup from 'yup'
import {Formik} from 'formik'
import {useSelector, useDispatch} from 'react-redux'

import {
    loadingSelector,
    loginErrSelector,
} from '../../signin/signInSlice'

import {
    errorSelector as signupErrorSelector,
    signup,
    passwordErrorSelector
} from '../signupSlice'

import {
    Container,
    Card,
    HeadingTypography,
    ErrorTypography,
    Button,
    TextField
} from '../../styled/auth'

const MarginedDiv = styled.div`
 && {
     margin-top: 1.5em;
     margin-bottom:2em;
 }
`

const formErrorMsgs = {
    required: 'Required',
    email: 'Email address is not valid'
}

const schema = yup.object().shape({
    name: yup.string().required(formErrorMsgs.required) ,
    email: yup.string().email(formErrorMsgs.email).required(formErrorMsgs.required),
    password: yup.string().required(formErrorMsgs.required),
    confirmPassword: yup.string().required(formErrorMsgs.required)
})

const initialValues = {
    email: '',
    password: ''
}

const View = ()=>{
    const loading = useSelector(loadingSelector)
    const loginError = useSelector(loginErrSelector)
    const signupError = useSelector(signupErrorSelector)
    const passwordErr = useSelector(passwordErrorSelector)
    const dispatch = useDispatch()
    const router = useRouter()

    const onSubmit = (data)=>{
        dispatch(signup(data, router))    
    }

    return (
        <Container>
            <Card>
                <HeadingTypography>
                    Sign Up
                </HeadingTypography>
                <Typography>
                    Please fill in the fields with valid data
                </Typography>
                <Formik
                    initialValues = {initialValues}
                    validationSchema = {schema}
                    onSubmit={onSubmit}
                >
                   {({
                       handleSubmit, 
                       errors,
                       handleChange,
                    })=>(
                        <form onSubmit={handleSubmit}>
                        <TextField 
                            name='name'
                            label = "Name"
                            placeholder = "Enter your Name"
                            helperText = {errors.name || "John Smith"}
                            error={Boolean(errors.name)}
                            color="primary"
                            variant="outlined"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField 
                            name='email'
                            label = "Email"
                            placeholder = "Enter your Email address"
                            helperText = {errors.email || "user@mail.com"}
                            error={Boolean(errors.email)}
                            color="primary"
                            variant="outlined"
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField 
                            name="password"
                            label = "Password"
                            placeholder = "Enter your Password"
                            helperText = "Password"
                            error={Boolean(errors.password)}
                            color="primary"
                            variant="outlined"
                            onChange={handleChange}
                            type="password"
                            fullWidth
                        />
                        <TextField 
                            name="confirmPassword"
                            label = "Confirm Password"
                            placeholder = "Enter your Password again"
                            helperText = "Password"
                            type="password"
                            error={Boolean(errors.confirmPassword)}
                            color="primary"
                            variant="outlined"
                            onChange={handleChange}
                            fullWidth
                        />
                        <MarginedDiv>
                            {loading
                            ?   <CircularProgress size="1em"/>
                            :   <Button
                                    type="submit"
                                    color = "primary"
                                    variant = "contained"
                                    disabled={loading}
                                >
                                    Sign up
                                </Button>
                            }
                            {passwordErr && 
                                <ErrorTypography>
                                    Passwords do not match
                                </ErrorTypography>
                            }
                            {signupError &&
                                <ErrorTypography>
                                    Signup Failed. Server might not be responding. Are you connected to internet?
                                </ErrorTypography>
                            }
                            {loginError && 
                                <ErrorTypography>
                                    Login Failed
                                </ErrorTypography>
                            }
                        </MarginedDiv>
                    </form>
                   )}
                </Formik>
            </Card>
        </Container>
    )
}

export default View