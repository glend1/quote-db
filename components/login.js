import { signIn } from '../util/client.firebase-auth'
import { useState } from 'react'

export const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")
    return <>
        <form className='p-7 bg-pink-50 border border-blue-700 rounded-full text-blue-700 inline-flex flex-col items-end' onSubmit={async (e) => {
            e.preventDefault()
            const response = await signIn(email, password)
            if (response.email) {
                setMessage(`Logged in as ${response.email}`)
            } else {
                setMessage(response)
            }
        }}>
            <div className='inline-block'>
                <label htmlFor='email' >E-mail</label>
                <input className='my-2 ml-2' value={email} onChange={e => setEmail(e.target.value)} id="email" type="email"></input>
            </div>
            <div className='inline-block'>
                <label htmlFor='password' >Password</label>
                <input className='my-2 ml-2' value={password} onChange={e => setPassword(e.target.value)} id="password" type="password"></input>
            </div>
            <button type='submit'>Login</button>
            {message && <div className='not-italic font-bold'><em>{message}</em></div>}
        </form>

    </>
}