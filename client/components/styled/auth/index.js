
import {
    Container as MaterialContainer,
    Card as MaterialCard,
    Typography,
    TextField as MaterialTextField,
    Button as MaterialButton,
} from '@material-ui/core'

import styled from 'styled-components'

export const Container = styled(MaterialContainer)`
&& {
    height: 100vh;
    display:flex;
    justify-content: center;
    align-items: center;
}
`
export const Card = styled(MaterialCard)`
&& {
    padding: 1em;
    border-radius: 0px;
    @media only screen and (min-width:480px){
        padding: 2em;
    }
}
`
export const HeadingTypography = styled.h1`
&& {
    margin-bottom: 0.2em;
    font-size: 2em;
    font-weight: bold;
    color: ${props=>props.theme.palette.primary.main};
}
`
export const TextField = styled(MaterialTextField)`
    && {
        margin-top: 1em;
    }
`
export const Button = styled(MaterialButton)`
  && {
      margin-right: 3em;
      min-width: 7em;
      border-radius: 0;
  }
`
export const ErrorTypography = styled(Typography)`
 && {
     color: ${props=>props.theme.palette.error.main};
     font-weight: bold;
     font-size: 0.8em;
     margin-top: 1em;
 }
`

export const MarginedTypography = styled(Typography)`
 && {
     margin-bottom: 2em;
 }
`