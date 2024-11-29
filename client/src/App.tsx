import { Routes, Route } from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectRoute from './components/ProtectRoute';

import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard/index';
import Landing from './pages/Landing';
import ShopForm from './pages/ShopForm';

function App() {
  const { state } = useStore()!;

  return (
    <>
      {state.loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <h2 className="fw-light">Loading...</h2>
        </div>
      )}

      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/register" element={(
            <ProtectRoute>
              <AuthForm isLogin={false} />
            </ProtectRoute>
          )} />
          <Route path="/login" element={(
            <ProtectRoute>
              <AuthForm isLogin={true} />
            </ProtectRoute>
          )} />

          <Route path="/shop" element={(
            <ProtectRoute>
              <ShopForm />
            </ProtectRoute>
          )} />

          <Route path="/dashboard" element={(
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          )} />
        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App
