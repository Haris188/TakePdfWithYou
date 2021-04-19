
import React from 'react'
import {
    Container as MaterialContainer,
    Card as MaterialCard,
    Typography,
    TextField as MaterialTextField,
    Button as MaterialButton,
    withTheme,
    CircularProgress
} from '@material-ui/core'

import {useRouter} from 'next/router'
import Link from 'next/link'
import Flex from '../../Flex'
import styled from 'styled-components'
import * as yup from 'yup'
import {Formik} from 'formik'
import {useSelector, useDispatch} from 'react-redux'

import {
    loadingSelector,
    loginErrSelector,
    signIn
} from '../signInSlice'

import {
    Container,
    Card,
    HeadingTypography,
    ErrorTypography,
    Button,
    TextField,
} from '../../styled/auth'

const StyledFlex = styled(Flex.SpaceBetween)`
 && {
     margin-top: 1em;
     align-items: center;
     margin-bottom: 2em;
 }
`
const SmallTypography = styled(Typography)`
  && {
      font-size: 0.7em;
  }
`
const BlueLink = styled.span`
 && {
     color: ${props=>props.theme.palette.primary.main};
 }
`

const schema = yup.object().shape({
    email: yup.string().email('Email address is not valid').required('Required'),
    password: yup.string().required('Required')
})

const initialValues = {
    email: '',
    password: ''
}

const View = ()=>{
    const router = useRouter()
    const loading = useSelector(loadingSelector)
    const loginError = useSelector(loginErrSelector)
    const dispatch = useDispatch()

    const onSubmit = (data)=>{
        dispatch(signIn(data, router))    
    }

    return (
        <Container>
            <Card>
                <HeadingTypography>
                    Sign In
                </HeadingTypography>
                <Typography>
                    Please sign in with your email and password
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
                        <StyledFlex>
                            {loading
                            ?   <CircularProgress size="1em"/>
                            :   <Button
                                    type="submit"
                                    color = "primary"
                                    variant = "contained"
                                    disabled={loading}
                                >
                                    Sign in
                                </Button>
                            }
                            
                            <div>
                                <SmallTypography>
                                    Dont have an account? <Link href="/signup"><BlueLink>Sign Up</BlueLink></Link>
                                </SmallTypography>
                            </div>
                        </StyledFlex>
                        {loginError && 
                            <ErrorTypography>
                                Login Failed
                            </ErrorTypography>
                        }
                    </form>
                   )}
                </Formik>
            </Card>
        </Container>
    )
}

export default View