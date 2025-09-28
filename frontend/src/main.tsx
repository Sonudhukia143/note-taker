import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
<<<<<<< HEAD

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
        <AuthProvider>

      <App />
    </AuthProvider>

  </StrictMode>,
);
>>>>>>> dfc1501 (AuthIntegration : Authorization for backend and frontend complete and backend and frontend integration complete locally)
