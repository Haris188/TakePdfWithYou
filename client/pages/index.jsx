import { Container } from '@material-ui/core'
import Head from 'next/head'
import {
    AppBar,
    Hero,
    What,
    How,
    CallToAction
} from '../components/home'
import styled from 'styled-components'

const HeroAreaStyles = styled.div`
  background: rgb(133,126,177);
  background: linear-gradient(124deg, rgba(133,126,177,1) 0%, rgba(96,88,145,1) 100%);
  color: white;
  min-height: 100vh;
  display:flex;
  flex-direction:column;
`

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome</title>          
      </Head>

      <HeroAreaStyles>
        <AppBar />
        <Hero />
      </HeroAreaStyles>
      <What />
      <How />
      <CallToAction />
    </div>
  )
}
