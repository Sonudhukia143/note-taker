import { useContext } from 'react';
import './App.css'
import { AuthContext } from './context/AuthContext';
import AuthService from './routes/AuthService';
import Dashboard from './routes/Dashboard';
import FlashMessage from './components/FlashMessage';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <FlashMessage type="success" message="Welcome to Note Taker App!" duration={3000} />
      {
        !user
          ?
          <AuthService />
          :
          <Dashboard />
      }
    </>

  )
}

export default App
