import { Login } from './login'
import { Logout } from './logout'

export const LoginForm = ({ user }) => {
    return <>
        {!user && <Login />}
        {user && <Logout />}
    </>
}   