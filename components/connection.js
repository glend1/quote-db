export const Connection = ({ isConnected }) => {
    return <>{!isConnected && <h2>You are NOT connected to MongoDB</h2>}</>
}