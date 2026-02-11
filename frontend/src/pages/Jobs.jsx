import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/jobs');

      if (response.data.success) {
        setJobs(response.data.jobs);
      } else {
        setError('Failed to load jobs');
      }
    } catch (err) {
      setError('Error fetching jobs');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="page-enter">
        <div className="loading">
          <div className="spinner"></div>
          <p>Finding amazing jobs for you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <div className="header">
        <h1>💼 Browse Job Opportunities</h1>
        <p>Find your next great role from hundreds of opportunities</p>
      </div>

      <div className="container">
        {error && <div className="alert alert-error">⚠️ {error}</div>}

        {/* Search Bar */}
        {jobs.length > 0 && (
          <div style={{
            marginBottom: '2rem',
            animation: 'slideInLeft 0.5s ease-out 0.3s backwards'
          }}>
            <input
              type="text"
              placeholder="🔍 Search by job title, company, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                maxWidth: '600px',
                margin: '0 auto',
                display: 'block',
                padding: '0.9rem 1rem',
                border: '2px solid #ecf0f1',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                backgroundColor: '#f8f9fa'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3498db';
                e.target.style.backgroundColor = 'white';
                e.target.style.boxShadow = '0 0 0 3px rgba(52, 152, 219, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#ecf0f1';
                e.target.style.backgroundColor = '#f8f9fa';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        )}

        {/* Jobs Display */}
        {filteredJobs.length === 0 ? (
          <div className="no-data">
            {searchTerm ? (
              <>
                <p>🔍 No jobs found matching "{searchTerm}"</p>
                <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                  Try searching with different keywords
                </p>
              </>
            ) : (
              <>
                <p>📭 No jobs available at the moment</p>
                {!user && (
                  <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
                    <Link to="/login">Login</Link> or{' '}
                    <Link to="/register">Register</Link> to get notified about new jobs!
                  </p>
                )}
              </>
            )}
          </div>
        ) : (
          <>
            <p style={{
              textAlign: 'center',
              color: '#7f8c8d',
              marginBottom: '2rem',
              fontSize: '0.95rem',
              animation: 'fadeIn 0.5s ease-out 0.2s backwards'
            }}>
              Found <strong>{filteredJobs.length}</strong> job{filteredJobs.length !== 1 ? 's' : ''}
            </p>
            <div className="jobs-container">
              {filteredJobs.map((job, index) => (
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
                        Posted by: <strong>{job.createdBy?.name || 'Unknown Recruiter'}</strong>
                      </p>
                      <p>
                        Date: <strong>{new Date(job.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Jobs;
