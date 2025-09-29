<<<<<<< HEAD
<<<<<<< HEAD
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
=======
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)
import { useContext } from 'react';
import './App.css'
import { AuthContext } from './context/AuthContext';
import AuthService from './routes/AuthService';
import Dashboard from './routes/Dashboard';
<<<<<<< HEAD
=======
import FlashMessage from './components/FlashMessage';
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
<<<<<<< HEAD
      {
        !user
=======
    <FlashMessage type="success" message="Welcome to Note Taker App!" duration={3000} />
      {
        user
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)
          ?
          <AuthService />
          :
          <Dashboard />
      }
<<<<<<< HEAD
>>>>>>> dfc1501 (AuthIntegration : Authorization for backend and frontend complete and backend and frontend integration complete locally)
=======
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)
    </>
  )
}

export default App
