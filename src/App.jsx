import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './pages/Login.jsx'
import SignUp from './pages/Register.jsx'
import CardList from './pages/CardList.jsx'
import { AuthProvider } from './components/auth/AuthContext.jsx'
import AppRouter from './components/router/AppRouter.jsx'

// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRouter />
    </>
  )
}

export default App
