const express = require('express');
const {
  createJob,
  getAllJobs,
  getMyJobs,
  deleteJob,
} = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

// @route   POST /api/jobs
// @desc    Create a new job (Recruiter only)
// @access  Private
router.post(
  '/',
  authMiddleware,
  roleMiddleware('recruiter'),
  createJob
);

// @route   GET /api/jobs
// @desc    Get all jobs (Public)
// @access  Public
router.get('/', getAllJobs);

// @route   GET /api/jobs/my
// @desc    Get recruiter's jobs (Recruiter only)
// @access  Private
router.get('/my', authMiddleware, roleMiddleware('recruiter'), getMyJobs);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job (Recruiter only)
// @access  Private
router.delete(
  '/:id',
  authMiddleware,
  roleMiddleware('recruiter'),
  deleteJob
);

module.exports = router;
