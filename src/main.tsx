import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserProvider } from './components/auth/UserContext'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
  </React.StrictMode>,
)
