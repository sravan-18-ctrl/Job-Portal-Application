const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a job title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description'],
    },
    company: {
      type: String,
      required: [true, 'Please provide a company name'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Please provide a job location'],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, 'Please provide a salary'],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', jobSchema);
