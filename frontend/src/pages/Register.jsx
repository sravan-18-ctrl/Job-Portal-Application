import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'jobseeker',
  });

  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : 'Invalid email address';
  };

  const validatePassword = (password) => {
    if (password.length < 6) return 'Password must be at least 6 characters';
    if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
    if (!/[0-9]/.test(password)) return 'Password must contain at least one number';
    return null;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      const response = await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });

      if (response.data.success) {
        login(response.data.user, response.data.token);
        navigate(formData.role === 'recruiter' ? '/dashboard' : '/');
      }
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Registration failed');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join JobHub Pro and get started</p>
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
            {/* Name Input */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
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
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                className={`input-field ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className={`input-field ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Role Selection */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <label className="block text-sm font-semibold text-gray-900 mb-2">I am a...</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="jobseeker"
                    checked={formData.role === 'jobseeker'}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-gray-700">Job Seeker</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={formData.role === 'recruiter'}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600"
                  />
                  <span className="text-gray-700">Recruiter</span>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-6 animate-fade-in"
              style={{ animationDelay: '0.6s' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </>
              ) : (
                <>✨ Create Account</>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center mt-6 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-green-600 font-semibold hover:text-green-700">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
