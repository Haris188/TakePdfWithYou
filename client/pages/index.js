import Head from 'next/head'
import SignInCard from '../components/signin/SignInCard'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>          
      </Head>

      <SignInCard />
    </div>
  )
}
