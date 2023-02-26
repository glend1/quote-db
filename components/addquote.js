import { useState } from "react"
import { getToken } from "../util/client.firebase-auth"

export const AddQuote = ({ user }) => {
    const [quote, setQuote] = useState("")
    const [author, setAuthor] = useState("")
    return <form className='p-12 bg-pink-50 border border-blue-700 rounded-full text-blue-700 inline-flex flex-col items-end' onSubmit={async (e) => {
        e.preventDefault()
        const token = await getToken(user)
        const fetch = await window.fetch('api/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ author, quote, token })
        });
        const content = await fetch.json();
    }}>
        <div>
            <label htmlFor='quote'>Quote</label>
            <textarea value={quote} onChange={e => setQuote(e.target.value)} id="quote" className="h-32 ml-2" />
        </div>
        <div>
            <label htmlFor='author'>Author</label>
            <input value={author} className='my-2 ml-2' onChange={e => setAuthor(e.target.value)} id="author" type='text' />
        </div>
        <button type='submit'>Add Quote</button>
    </form>
}