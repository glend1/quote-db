import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/pagination.module.scss'

var router;

const getPages = (p, pages) => {
  let range = Range(p, pages);
  let content = [];
  range.forEach ( i => {
      if (i == p) {
        content.push(<span>{i}</span>);
      } else {
        content.push(
          <Link href={{ query: { page: i }}}>
            <a>{i}</a>
          </Link>
        );
      }
    }
  )
  return content;
};

const Range = (p, pages) => {
  let array = [];
  if (pages < 5) {
    for (let i = 1; i <= pages; i++) {
      array.push(i)
    }
  } else if (p <= 2) {
    array = [1,2,3,4,5];
  } else if (p >= pages - 2) {
    array = [pages - 4,pages - 3,pages - 2,pages - 1,pages];
  } else {
    for (let i = p - 2; i <= p + 2; i++) {
      array.push(i);
    }
  }
  return array;
}

export default function Pagination({page, pages}) {
  router = useRouter()
    let p = Number(page);
    return (
      <div className={styles.pagination}>
        {  p != 1 &&
          <>
          <Link href={{ query: { page: 1 }}}><a className={styles.bigger}>&laquo;</a></Link>
          <Link href={{ query: { page: p-1 }}}><a className={styles.bigger}>&lsaquo;</a></Link>
          </>
        }
        {getPages(p, pages)}
        { p != pages &&
          <>
          <Link href={{ query: { page: p+1 }}}><a className={styles.bigger}>&rsaquo;</a></Link>
          <Link href={{ query: { page: pages }}}><a className={styles.bigger}>&raquo;</a></Link>
          </>
        }
        </div>
    )
  }
