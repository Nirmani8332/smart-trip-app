import express from 'express';
import { protect, restrictTo } from '../middleware/authMiddleware.js';
import {
    getInventoryForVendor,
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
} from '../controllers/inventoryController.js';

const router = express.Router();

// All routes in this file are protected and restricted to vendors
router.use(protect);
router.use(restrictTo('vendor'));

router.route('/')
    .get(getInventoryForVendor)
    .post(createInventoryItem);

router.route('/:id')
    .put(updateInventoryItem)
    .delete(deleteInventoryItem);

export default router;
