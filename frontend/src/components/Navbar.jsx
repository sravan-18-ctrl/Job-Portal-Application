import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-700 transition-all"
          >
            <span className="text-green-600">💼</span>
            JobHub
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            <Link
              to="/"
              className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
            >
              Browse Jobs
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-sm"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {user?.role === 'recruiter' && (
                  <>
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/post-job"
                      className="px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      Post Job
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
                  <span className="text-sm text-gray-700 font-medium max-w-[100px] truncate">
                    👤 {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Browse Jobs
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all font-semibold mt-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                {user?.role === 'recruiter' && (
                  <>
                    <Link
                      to="/dashboard"
                      className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/post-job"
                      className="block px-4 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Post Job
                    </Link>
                  </>
                )}
                <div className="px-4 py-3 border-t border-gray-200 mt-2">
                  <p className="text-sm text-gray-700 font-medium mb-2">👤 {user?.name}</p>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
