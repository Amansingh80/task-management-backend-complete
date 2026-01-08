import { Router } from 'express';
import { body } from 'express-validator';
import { authenticate } from '../middleware/auth.middleware';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} from '../controllers/task.controller';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/', getTasks);
router.get('/:id', getTask);

router.post(
  '/',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  ],
  createTask
);

router.patch(
  '/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim(),
    body('status').optional().isIn(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  ],
  updateTask
);

router.delete('/:id', deleteTask);
router.post('/:id/toggle', toggleTask);

export default router;