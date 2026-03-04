import { Router } from 'express';
import { protect, restrictTo } from '../middlewares/auth.middleware';

const router = Router();

// All routes are protected and restricted to farmers
router.use(protect);
router.use(restrictTo('farmer'));

/**
 * @route   GET /api/v1/farmer/dashboard
 * @desc    Get farmer dashboard data
 * @access  Private (Farmer only)
 */
router.get('/dashboard', (req, res) => {
  res.json({ message: 'Farmer dashboard - Coming soon' });
});

/**
 * @route   GET /api/v1/farmer/crops
 * @desc    Get farmer crops/fields
 * @access  Private (Farmer only)
 */
router.get('/crops', (req, res) => {
  res.json({ message: 'Farmer crops - Coming soon' });
});

/**
 * @route   GET /api/v1/farmer/contracts
 * @desc    Get farmer contracts
 * @access  Private (Farmer only)
 */
router.get('/contracts', (req, res) => {
  res.json({ message: 'Farmer contracts - Coming soon' });
});

/**
 * @route   GET /api/v1/farmer/orders
 * @desc    Get farmer orders
 * @access  Private (Farmer only)
 */
router.get('/orders', (req, res) => {
  res.json({ message: 'Farmer orders - Coming soon' });
});

/**
 * @route   GET /api/v1/farmer/finances
 * @desc    Get farmer financial data
 * @access  Private (Farmer only)
 */
router.get('/finances', (req, res) => {
  res.json({ message: 'Farmer finances - Coming soon' });
});

export default router;
