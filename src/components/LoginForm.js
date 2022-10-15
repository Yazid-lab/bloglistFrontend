import { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='login-button' type='submit'>
        login
      </button>
    </form>
  )
}

export default LoginForm
