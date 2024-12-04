import { Routes, Route } from 'react-router-dom';
import { useStore } from './store';

import Header from './components/Header';
import Footer from './components/Footer';
import ProtectRoute from './components/ProtectRoute';

import AuthForm from './pages/AuthForm';
import Dashboard from './pages/Dashboard/index';
import Landing from './pages/Landing';
import ShopForm from './pages/ShopForm';
import CoffeeSearch from './pages/CoffeeSearch.tsx';
import ChangePassword from './pages/ChangePassword';
import About from './pages/About.tsx';
import ContactForm from './pages/ContactForm.tsx';

function App() {
  const { state } = useStore()!;

  return (
    <>
      {state.loading && (
        <div className="loading-overlay d-flex justify-content-center align-items-center">
          <img src="/images/coffeecup2.gif" alt="" />
        </div>
      )}

      <Header />

      <main className="flex-fill">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />


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

          <Route path="/coffee-info" element={(
            <ProtectRoute>
              <CoffeeSearch />
            </ProtectRoute>
          )} />

          <Route path="/settings" element={<ProtectRoute>
            <ChangePassword />
            </ProtectRoute>} />

            <Route path="/contact" element={<ProtectRoute>
            <ContactForm />
            </ProtectRoute>} />

        </Routes>
      </main>

      <Footer />
    </>
  )
}

export default App;
