import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'

export default function Add({ isConnected}) {
  return (
      <main>
      <Head>
        <title>QuoteApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected ? (
          <>
          </>
        ) : (
          <h2>You are NOT connected to MongoDB</h2>
        )}
      </main>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const isConnected = await client.isConnected()
  return {
    props: { isConnected }
  }
}
