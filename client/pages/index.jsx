import { Container } from '@material-ui/core'
import Head from 'next/head'
import {
    AppBar,
    Hero,
    What,
    How,
    CallToAction
} from '../components/home'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome</title>          
      </Head>

      <Container>
          <AppBar />
          <Hero />
          <What />
          <How />
          <CallToAction />
      </Container>
    </div>
  )
}
