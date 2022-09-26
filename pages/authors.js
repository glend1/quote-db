import Head from 'next/head'
import useSWR from 'swr'
import styles from '../styles/authors.module.scss'
import { connectToDatabase } from '../util/mongodb'
import Link from 'next/link'

export default function Authors({ isConnected}) {
  const { data: result, error } = useSWR(`/api/authors`)
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
            : ( authors(result) )
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

function processArray(result) {
  let sortedData = new Map();
  result.map(obj => {
    if (!sortedData.has(obj.author[0])) {
      sortedData.set(obj.author[0], Array());
    }
    sortedData.get(obj.author[0]).push(obj);
  })
  return sortedData
}

function body(key, value) {
  return (
    <div className={styles.letter}>
      <h3 id={key}>{key}</h3>
      <ul className={styles.authorsbyletter}> 
        {value.map(i =>
          author(i)
        )}
      </ul>
    </div>
  )
}

function author(res) {
  return (<Link href={{pathname: `/author/${encodeURIComponent(res.author)}`, query: { page: 1 }}}><a><li className={styles.author}>
  <div>Author: <span className={styles.authorname}>{res.author}</span></div>
  <div>Quantity: <span className={styles.count}>{res.count}</span></div>
</li></a></Link>)
}

function navigation(key) {
  return (<a href={"#" + key}><li>{key}</li></a>)
}

function authors(result) {
  let sortedData = processArray(result)
  let bodyList = Array(); 
  let navigationList = Array(); 
  sortedData.forEach((value, key) => {
      navigationList.push(navigation(key))
      bodyList.push(body(key, value)) 
    })
  return (
    <div className={styles.body}>
      <ul className={styles.navigation}>{navigationList}</ul>
      <div className={styles.authors}>{bodyList}</div>
    </div>
  )
}