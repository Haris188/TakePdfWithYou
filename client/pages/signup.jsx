import React from 'react'
import Head from 'next/head'
import SignupCard from '../components/signup/SignupCard'

const Signup = ()=>{
    return (
        <div>
            <Head>
                <title>Sign Up</title>          
            </Head>
    
            <SignupCard />
        </div>
    )
}

export default Signup