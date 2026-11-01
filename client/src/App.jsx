import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ErrorBoundary } from './components/common/ErrorBoundary';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { CreateMysteryPage } from './pages/CreateMysteryPage';
import { GeneratingPage } from './pages/GeneratingPage';
import { InvestigationPage } from './pages/InvestigationPage';
import { ResultPage } from './pages/ResultPage';

function AppLayout({ children }) {
  const location = useLocation();
  // Hide main footer in full investigation room workspace for maximum vertical space
  const isInvestigationRoom = location.pathname.startsWith('/mystery/') && !location.pathname.endsWith('/result');

  return (
    <div className="min-h-screen bg-[#0B0F14] flex flex-col font-sans">
      <Navbar />
      <div className="flex-1">
        <ErrorBoundary>{children}</ErrorBoundary>
      </div>
      {!isInvestigationRoom && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/create-mystery" element={<CreateMysteryPage />} />
              <Route path="/generating/:mysteryId" element={<GeneratingPage />} />
              <Route path="/mystery/:mysteryId" element={<InvestigationPage />} />
              <Route path="/mystery/:mysteryId/result" element={<ResultPage />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </AppLayout>
      </Router>
    </AuthProvider>
  );
}
