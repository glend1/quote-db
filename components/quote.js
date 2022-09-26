import styles from '../styles/quote.module.scss'

export default function Quote({quote, author}) {
  return (
    <li className={styles.quotebox}>
      <div className={styles.quote}>{quote}</div>
      <div className={styles.author}>{author}</div>
    </li>
  )
}
  