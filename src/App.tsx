import './App.css'
import { LoginUI } from './view/Security/Login/LoginUI.controller';
import { Routes, Route, Navigate } from 'react-router-dom';
import { RecoveryPasswordUI } from './view/Security/RecoveryPassword/RecoveryPasswordUI.controller';
import { AppGuard } from './router/AppGuard';
import { useForegroundMessages } from './hooks/useForegroundMessages.hook';

export const App = () => {
  useForegroundMessages();

  return (
    <Routes>
      <Route path="/login" element={<LoginUI />} />
      <Route path="/recovery-password" element={<RecoveryPasswordUI />} />
      <Route
        path="/"
        element={
          <AppGuard>
            <h1>Home</h1>
          </AppGuard>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App;
