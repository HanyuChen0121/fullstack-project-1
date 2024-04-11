import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Footer from './components/Footer';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import SendEmailPage from './pages/SendEmailPage';
import ProductList from './pages/ProductList';
import CreateProduct from './pages/CreateProduct';
function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/send-email" element={<SendEmailPage />} />
          <Route path="/CreateProduct" element={<CreateProduct />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
