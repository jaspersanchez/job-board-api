import express, { Request, Response } from 'express';
import Job from '../models/Job';

const router = express.Router();

// GET /api/jobs - Get all jobs
router.get('/', async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Newest first
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching jobs', error });
  }
});

// POST /api/jobs - Create new job
router.post('/', async (req: Request, res: Response) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(400).json({ message: 'Error creating job', error });
  }
});

// DELETE /api/jobs/:id - Delete job by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json({ message: 'Job deleted successfully', job: deletedJob });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting job', error });
  }
});

export default router;
