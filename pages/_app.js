import '../styles/global.scss'
import Navigation from '../components/navigation'
import { SWRConfig } from 'swr'

/*updateSearch={updateSearch}
const updateSearch = function (string) {
  search = string
}*/

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function App({ Component, pageProps }) {
    return (
      <SWRConfig value={{ fetcher }}>
      <Navigation />
      <main>
        <Component {...pageProps} />
      </main>
      </SWRConfig>
    )
  }
  