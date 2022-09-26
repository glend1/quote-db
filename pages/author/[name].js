import Head from 'next/head'
import { connectToDatabase } from '../../util/mongodb'
import Quotes from '../../components/quotes'

export default function AuthorQuotes({ isConnected, query}) {
  let page = (query.page ? query.page : 1)
    return (
        <>
        <Head>
          <title>QuoteApp</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isConnected ? (
              <Quotes name={query.name} page={page} />
          ) : (
            <h2>You are NOT connected to MongoDB</h2>
          )}
        </>
    )
  }

  export async function getServerSideProps(context) {
    const { client } = await connectToDatabase()
    const isConnected = await client.isConnected()
    const query = context.query;
    return {
      props: { isConnected, query }
    }
  }