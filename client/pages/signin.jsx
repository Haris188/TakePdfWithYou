import Head from 'next/head'
import SignInCard from '../components/signin/SignInCard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Sign in</title>          
      </Head>

      <SignInCard />
    </div>
  )
}
