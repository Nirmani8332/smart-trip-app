import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../lib/axios';
import AuthContext from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function VendorLoginPage() {
  const [credentials, setCredentials] = useState({
    email: '', // Changed from emailOrUsername to email to match backend
    password: '',
    rememberMe: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Removed accountStatus state as it's for mockup simulation

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        const { data } = await api.post('/auth/login', { 
            email: credentials.email, 
            password: credentials.password 
        });
        
        if (data.role !== 'vendor') {
            toast.error('Only vendor accounts can log in here.');
            setIsLoading(false);
            return;
        }

        toast.success('Login successful! Redirecting to vendor dashboard...');
        login(data); // Save user data and token
        navigate('/dashboard');

    } catch (error) {
        console.error("Vendor Login error:", error);
        toast.error(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
        setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.info('Password reset link will be sent to your registered email');
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <style>{`
        .gradient-bg { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
      `}</style>

      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8 slide-in">
          <div className="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-3xl">ST</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Portal</h1>
          <p className="text-gray-600">Sign in to manage your listings</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 slide-in" style={{ animationDelay: '0.1s' }}>
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <input
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={credentials.rememberMe}
                  onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-sm font-medium text-purple-600 hover:text-purple-700"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 gradient-bg text-white rounded-lg font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
                  </svg>
                  Login
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">New to SmartTRIP?</span>
            </div>
          </div>

          {/* Register Link */}
          <Link
            to="/vendor/register"
            className="block w-full py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-semibold text-center hover:bg-purple-50 transition-all"
          >
            Register as a Vendor
          </Link>
        </div>

        {/* Additional Links */}
        <div className="mt-6 text-center space-y-3 slide-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link to="/help" className="text-gray-600 hover:text-purple-600 transition-colors">
              Help & Support
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/privacy" className="text-gray-600 hover:text-purple-600 transition-colors">
              Privacy Policy
            </Link>
            <span className="text-gray-400">•</span>
            <Link to="/terms" className="text-gray-600 hover:text-purple-600 transition-colors">
              Terms of Service
            </Link>
          </div>
          <p className="text-xs text-gray-500">
            © 2025 SmartTRIP. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}