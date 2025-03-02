import express from 'express';
import { getsolutionash } from '../controllers/getsolution.js';

const router = express.Router();
router.post('/process-math', getsolutionash);

export default router;
