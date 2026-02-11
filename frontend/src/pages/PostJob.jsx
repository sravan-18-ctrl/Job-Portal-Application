import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Job title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Job title must be at least 3 characters';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'Company name must be at least 2 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Job description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Job description must be at least 10 characters';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 2) {
      newErrors.location = 'Location must be at least 2 characters';
    }

    if (!formData.salary) {
      newErrors.salary = 'Salary is required';
    } else if (isNaN(formData.salary) || formData.salary < 0) {
      newErrors.salary = 'Salary must be a valid number';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form before submission
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      // Call create job API
      const response = await api.post('/jobs', {
        ...formData,
        salary: Number(formData.salary),
      });

      if (response.data.success) {
        setSuccess('✅ Job posted successfully! Redirecting to dashboard...');
        setFormData({
          title: '',
          company: '',
          location: '',
          salary: '',
          description: '',
        });
        setErrors({});

        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || '❌ Failed to post job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRole="recruiter">
      <div className="page-enter">
        <div className="header">
          <h1>📝 Post a New Job</h1>
          <p>Fill in the details to attract qualified candidates</p>
        </div>

        <div className="container">
          <div className="form-container">
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="form">
              {/* Job Title */}
              <div className="form-group" style={{ animationDelay: '0.1s' }}>
                <label htmlFor="title">
                  💼 Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Senior React Developer"
                  className={errors.title ? 'input-error' : ''}
                />
                {errors.title && <span className="error-text">{errors.title}</span>}
              </div>

              {/* Company Name */}
              <div className="form-group" style={{ animationDelay: '0.15s' }}>
                <label htmlFor="company">
                  🏢 Company Name
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="e.g., Tech Corp"
                  className={errors.company ? 'input-error' : ''}
                />
                {errors.company && <span className="error-text">{errors.company}</span>}
              </div>

              {/* Location */}
              <div className="form-group" style={{ animationDelay: '0.2s' }}>
                <label htmlFor="location">
                  📍 Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g., San Francisco, CA"
                  className={errors.location ? 'input-error' : ''}
                />
                {errors.location && <span className="error-text">{errors.location}</span>}
              </div>

              {/* Salary */}
              <div className="form-group" style={{ animationDelay: '0.25s' }}>
                <label htmlFor="salary">
                  💰 Annual Salary (USD)
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="e.g., 150000"
                  min="0"
                  className={errors.salary ? 'input-error' : ''}
                />
                {errors.salary && <span className="error-text">{errors.salary}</span>}
              </div>

              {/* Job Description */}
              <div className="form-group" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="description">
                  📄 Job Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the job role, responsibilities, and requirements..."
                  rows="6"
                  className={errors.description ? 'input-error' : ''}
                ></textarea>
                {errors.description && <span className="error-text">{errors.description}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
                style={{ animationDelay: '0.35s', width: '100%' }}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Posting...
                  </>
                ) : (
                  '🚀 Post Job'
                )}
              </button>
            </form>

            <div className="form-hint" style={{ animationDelay: '0.4s' }}>
              <p>💡 <strong>Pro Tip:</strong> Be descriptive and clear about the job requirements to attract quality candidates!</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default PostJob;
