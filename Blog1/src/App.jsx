import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Post from './pages/Post';
import ForgotPassword from "./pages/ForgotPassword"; // ✅ fixed
import About from './pages/About';
import PostView from './pages/PostView';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Dashboard from './pages/Dashboard';
import ResetPassword from "./pages/ResetPassword";
import Login from './pages/Login';
import Register from './pages/Register';
import { useAuth } from './context/AuthContext';
import SinglePost from "./pages/SinglePost";
import { Toaster } from "react-hot-toast";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 py-8 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/about" element={<About />} />
          <Route path="/post/:id" element={<PostView />} />
          <Route path="/posts/:id" element={<SinglePost />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreatePost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
