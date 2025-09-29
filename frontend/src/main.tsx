import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
<<<<<<< HEAD
<<<<<<< HEAD

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
=======
=======
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
<<<<<<< HEAD
        <AuthProvider>

      <App />
    </AuthProvider>

  </StrictMode>,
);
>>>>>>> dfc1501 (AuthIntegration : Authorization for backend and frontend complete and backend and frontend integration complete locally)
=======
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);
>>>>>>> 60c2d84 (Dashboard : Note data and Dashboard add with live sync service)
