import { Router } from 'express'
import {
  getProperties,
  getPropertyById,
  getMyProperties,
  createProperty,
  updateProperty,
  deleteProperty,
} from '../controllers/property.controller.js'
import { protect, authorizeRoles } from '../middleware/auth.js'

const router = Router()

router.get('/', getProperties)
router.get('/mine', protect, getMyProperties)
router.post('/', protect, authorizeRoles('OWNER', 'ADMIN'), createProperty)
router.get('/:id', getPropertyById)
router.put('/:id', protect, authorizeRoles('OWNER', 'ADMIN'), updateProperty)
router.delete('/:id', protect, authorizeRoles('OWNER', 'ADMIN'), deleteProperty)

export default router
