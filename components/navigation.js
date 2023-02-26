import styles from '../styles/navigation.module.scss'
import Link from 'next/link'

const registerUser = event => {
  event.preventDefault()
}

export default function Search() {
  //export default function Search({updateSearch}) {
  return (
    <nav id={styles.navigation}>
      <ul>
        <Link href="/"><a><li>Home</li></a></Link>
        <Link href="/authors"><a><li>Authors</li></a></Link>
        <Link href="/random"><a><li>Random</li></a></Link>
        <Link href="/add"><a><li>Add</li></a></Link>
        {/* <li><form onSubmit={registerUser}>
            <label htmlFor="name">Name</label>
            <input id="name" type="text" onChange={function(event) {
              updateSearch(event.target.value)
            }} autoComplete="name" required />
            <label htmlFor="type">Type</label>
            <select id="type">
              <option value="quote">Quote</option>
              <option value="author">Author</option>
            </select>
            <button type="submit">Search</button>
          </form></li> */}
      </ul>
    </nav>
  )
}