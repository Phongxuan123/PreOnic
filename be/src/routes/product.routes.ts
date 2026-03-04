import { Router } from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @route   GET /api/v1/products
 * @desc    Get all products (with filters)
 * @access  Public
 */
router.get('/', (req, res) => {
  res.json({ message: 'Get all products - Coming soon' });
});

/**
 * @route   GET /api/v1/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get('/:id', (req, res) => {
  res.json({ message: `Get product ${req.params.id} - Coming soon` });
});

/**
 * @route   POST /api/v1/products
 * @desc    Create new product listing
 * @access  Private (Farmer only)
 */
router.post('/', protect, (req, res) => {
  res.json({ message: 'Create product - Coming soon' });
});

/**
 * @route   PUT /api/v1/products/:id
 * @desc    Update product
 * @access  Private (Owner only)
 */
router.put('/:id', protect, (req, res) => {
  res.json({ message: `Update product ${req.params.id} - Coming soon` });
});

/**
 * @route   DELETE /api/v1/products/:id
 * @desc    Delete product
 * @access  Private (Owner only)
 */
router.delete('/:id', protect, (req, res) => {
  res.json({ message: `Delete product ${req.params.id} - Coming soon` });
});

export default router;
