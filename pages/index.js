import Head from 'next/head'
import { connectToDatabase } from '../util/mongodb'
import Quotes from '../components/quotes'

export default function Home({ isConnected, page}) {
  return (
      <>
      <Head>
        <title>QuoteApp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isConnected ? (
            <Quotes page={page} />
        ) : (
          <h2>You are NOT connected to MongoDB</h2>
        )}
      </>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()
  const isConnected = await client.isConnected()
  const page = (context.query.page ? context.query.page : 1)
  return {
    props: { isConnected, page }
  }
}
