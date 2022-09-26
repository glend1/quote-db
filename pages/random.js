import Head from 'next/head'
import Quote from '../components/quote'
import useSWR from 'swr'
import { connectToDatabase } from '../util/mongodb'

export default function Random({ isConnected}) {
  const { data: result, error } = useSWR(`/api/random`)
  return (
      <>
      <Head>
        <title>QuoteApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected ? (
          <>
          {
          error ? (<h1>Something went wrong!</h1>) 
        : !result ? (<h1>Loading...</h1>) 
          : ( 

              <ul>
              {result.map(res => 
                <Quote key={res.key} quote={res.quote} author={res.author} />
              )}
              </ul>
         )
              }

          </>
        ) : (
          <h2>You are NOT connected to MongoDB</h2>
        )}
      </>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const isConnected = await client.isConnected()
  return {
    props: { isConnected }
  }
}
