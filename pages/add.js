import Head from 'next/head'
import { useState, useEffect } from 'react'
import { Connection } from '../components/connection'
import { LoginForm } from '../components/loginform'
import { connectToDatabase } from '../util/mongodb'
import { AddQuote } from '../components/addquote'
import { setAuthChangeEvent } from '../util/client.firebase-auth'

export default function Add({ isConnected }) {
  const [user, setUser] = useState()
  useEffect(() => {
    setAuthChangeEvent(setUser)
  }, [])
  return (
    <main>
      <Head>
        <title>QuoteApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Connection isConnected={isConnected} />
      <div className='flex justify-center flex-col items-center'>
        {user && <AddQuote user={user} />}
        <LoginForm user={user} />
      </div>
    </main >
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const isConnected = await client.isConnected()
  return {
    props: { isConnected }
  }
}
