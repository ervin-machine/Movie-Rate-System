import React from 'react'
import Tabs from './components/Tabs/Tabs';
import { useAuth0 } from '@auth0/auth0-react'

function App() {
  const { loginWithPopup, logout, isAuthenticated } = useAuth0()

  return (
    <div className="App">
      {isAuthenticated ? 
      <div>
        <button onClick={logout}>Logout</button>
        <Tabs />
      </div> : 
      <button onClick={loginWithPopup}>Login With Popup</button>
      }
    </div>
  );
}

export default App;
