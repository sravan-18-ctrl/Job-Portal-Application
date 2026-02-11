import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard = () => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState('');

  useEffect(() => {
    if (user?.role === 'recruiter') {
      fetchMyJobs();
    }
  }, [user]);

  const fetchMyJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/jobs/my');

      if (response.data.success) {
        setJobs(response.data.jobs);
      }
    } catch (err) {
      setError('Failed to load your jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId, jobTitle) => {
    if (window.confirm(`Are you sure you want to delete "${jobTitle}"?`)) {
      try {
        setDeleteError('');
        setDeleteSuccess('');
        const response = await api.delete(`/jobs/${jobId}`);

        if (response.data.success) {
          setJobs(jobs.filter((job) => job._id !== jobId));
          setDeleteSuccess('✅ Job deleted successfully!');
          setTimeout(() => setDeleteSuccess(''), 3000);
        }
      } catch (err) {
        setDeleteError('❌ Failed to delete job');
        setTimeout(() => setDeleteError(''), 3000);
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRole="recruiter">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requiredRole="recruiter">
      <div className="page-enter">
        <div className="header">
          <h1>👋 Welcome, {user?.name}!</h1>
          <p>Manage your job postings and reach top talent</p>
        </div>

        <div className="container">
          <div className="dashboard">
            {/* Dashboard Actions */}
            <div className="dashboard-actions">
              <Link to="/post-job" className="btn btn-success">
                ➕ Post New Job
              </Link>
              <Link to="/" className="btn">
                👀 View All Jobs
              </Link>
            </div>

            <hr style={{ margin: '2rem 0', border: 'none', borderTop: '2px solid #ecf0f1' }} />

            {/* Job Listings */}
            <h3 style={{ marginTop: '2rem', fontSize: '1.4rem' }}>📋 Your Job Postings</h3>

            {error && <div className="alert alert-error">{error}</div>}
            {deleteSuccess && <div className="alert alert-success">{deleteSuccess}</div>}
            {deleteError && <div className="alert alert-error">{deleteError}</div>}

            {jobs.length === 0 ? (
              <div className="no-data" style={{ marginTop: '2rem' }}>
                <p>📭 You haven't posted any jobs yet</p>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                  Start by creating your first job posting to attract talented candidates!
                </p>
                <Link to="/post-job" className="btn btn-success" style={{ maxWidth: '250px', marginTop: '1.5rem' }}>
                  ✨ Create Your First Job
                </Link>
              </div>
            ) : (
              <>
                <p style={{
                  color: '#7f8c8d',
                  marginBottom: '1.5rem',
                  fontSize: '0.95rem'
                }}>
                  You have <strong>{jobs.length}</strong> active job posting{jobs.length !== 1 ? 's' : ''}
                </p>
                <div className="jobs-container">
                  {jobs.map((job, index) => (
                    <div key={job._id} style={{
                      animation: `slideInRight 0.5s ease-out ${0.1 + index * 0.05}s backwards`
                    }}>
                      <div className="job-card">
                        <h3>{job.title}</h3>
                        <p className="company">🏢 {job.company}</p>
                        <p className="location">📍 {job.location}</p>
                        <p className="salary">💰 ${job.salary.toLocaleString()}/year</p>
                        <p className="description">{job.description}</p>
                        <div className="recruiter-info">
                          <p>
                            Posted on: <strong>{new Date(job.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}</strong>
                          </p>
                        </div>
                        <div className="job-card actions">
                          <button
                            className="delete-btn"
                            onClick={() => handleDeleteJob(job._id, job.title)}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
