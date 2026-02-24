import './App.css'
import { useAuthStore } from './store/useAuthStore';
import { LoginUI } from './view/Security/Login/LoginUI.controller';

function App() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginUI />;
  }

  return (
    <>
      home
    </>
  )
}

export default App
