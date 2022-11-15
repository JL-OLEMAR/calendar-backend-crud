/*
  Events routes
  host + /api/events
*/

import { Router } from 'express'
import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { isDate } from '../helpers/isDate.js'
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent
} from '../controllers/events.js'

const router = Router()

// Valid all routes
router.use(validateJWT)

router.get('/', getEvents)

router.post(
  '/',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
  ],
  createEvent
)

router.put(
  '/:id',
  [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'Start date is required').custom(isDate),
    check('end', 'End date is required').custom(isDate),
    validateFields
  ],
  updateEvent
)

router.delete('/:id', deleteEvent)

export { router }
