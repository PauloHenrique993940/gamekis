import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GameProvider, useGame } from './services/GameContext';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Ranking from './pages/Ranking';
import './styles/globals.css';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useGame();
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/quiz" 
        element={
          <ProtectedRoute>
            <Quiz />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/result" 
        element={
          <ProtectedRoute>
            <Result />
          </ProtectedRoute>
        } 
      />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <GameProvider>
      <Router>
        <AppRoutes />
      </Router>
    </GameProvider>
  );
}

export default App;
