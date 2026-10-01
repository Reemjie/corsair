import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import WalletRoot from './WalletRoot.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletRoot>
      <App />
    </WalletRoot>
  </React.StrictMode>
)
