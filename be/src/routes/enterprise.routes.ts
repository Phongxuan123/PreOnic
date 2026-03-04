import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// All routes are protected and restricted to enterprises
router.use(protect);
router.use(restrictTo('enterprise'));

/**
 * @route   GET /api/v1/enterprise/dashboard
 * @desc    Get enterprise dashboard data
 * @access  Private (Enterprise only)
 */
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Enterprise dashboard - Coming soon' });
});

/**
 * @route   GET /api/v1/enterprise/suppliers
 * @desc    Get list of suppliers (farmers)
 * @access  Private (Enterprise only)
 */
router.get('/suppliers', (req, res) => {
  res.json({ message: 'Enterprise suppliers - Coming soon' });
});

/**
 * @route   GET /api/v1/enterprise/contracts
 * @desc    Get enterprise contracts
 * @access  Private (Enterprise only)
 */
router.get('/contracts', (req, res) => {
  res.json({ message: 'Enterprise contracts - Coming soon' });
});

/**
 * @route   GET /api/v1/enterprise/warehouse
 * @desc    Get warehouse/inventory data
 * @access  Private (Enterprise only)
 */
router.get('/warehouse', (req, res) => {
  res.json({ message: 'Enterprise warehouse - Coming soon' });
});

/**
 * @route   GET /api/v1/enterprise/analytics
 * @desc    Get market analytics
 * @access  Private (Enterprise only)
 */
router.get('/analytics', (req, res) => {
  res.json({ message: 'Enterprise analytics - Coming soon' });
});

export default router;
