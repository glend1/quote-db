import { signOut } from "../util/client.firebase-auth"

export const Logout = () => {
    return <button className="bg-purple-300 rounded-full m-4 p-4" onClick={async () => {
        await signOut()
    }}>Logout</button>
}