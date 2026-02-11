import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email address';
  };

  const validateForm = () => {
    const newErrors = {};

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGlobalError('');

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate(response.data.user.role === 'recruiter' ? '/dashboard' : '/');
      }
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card shadow-lg">
          {/* Header */}
          <div className="mb-8 text-center animate-fade-in">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your JobHub Pro account</p>
          </div>

          {/* Error Alert */}
          {globalError && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2 animate-slide-up">
              <span className="text-lg">⚠️</span>
              <span>{globalError}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Input */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </>
              ) : (
                <>✨ Sign In</>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-600">New to JobHub?</span>
            </div>
          </div>

          {/* Register Link */}
          <a
            href="/register"
            className="block w-full py-3 px-6 text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-lg transition-colors"
          >
            Create an Account
          </a>

          {/* Demo Credentials Box */}
          <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">💡 Demo Credentials</h3>
            
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">Recruiter:</p>
              <p className="text-xs text-gray-600">recruiter@example.com</p>
              <p className="text-xs text-gray-600">password123</p>
            </div>
            
            <div className="border-t border-green-200 pt-3">
              <p className="text-xs font-semibold text-gray-700 mb-1">Job Seeker:</p>
              <p className="text-xs text-gray-600">jobseeker@example.com</p>
              <p className="text-xs text-gray-600">password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
