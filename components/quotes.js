import Quote from './quote'
import useSWR from 'swr'
import styles from '../styles/quotes.module.scss'
import Pagination from './pagination'


export default function Quotes({page, name}) {
  let url;
  if (name) {
    url = `/api/author?name=${name}&page=${page}`
  } else {
    url = `/api/${page}`
  }
  const { data: result, error } = useSWR(url)
    return (
      error ? (<h1>Something went wrong!</h1>) 
        : !result ? (<h1>Loading...</h1>) 
          : ( 
            <>
              <ul className={styles.quotes}>
              {result.data.map(res => 
                <Quote key={res.key} quote={res.quote} author={res.author} />
              )}
              </ul>
              <Pagination page={page} pages={result.pages} />
            </>
         )
    )
}
