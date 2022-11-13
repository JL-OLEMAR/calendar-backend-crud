/*
  Users routes / Auth
  host + /api/user
*/

import { Router } from 'express'
import { check } from 'express-validator'

import { validateFields } from '../middlewares/validate-fields.js'
import { validateJWT } from '../middlewares/validate-jwt.js'
import { createUser, loginUser, revalidateToken } from '../controllers/user.js'

const router = Router()

router.post(
  '/new',
  [
    // middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be six characters long').isLength({
      min: 6
    }),
    validateFields
  ],
  createUser
)

router.post(
  '/',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be six characters long').isLength({
      min: 6
    }),
    validateFields
  ],
  loginUser
)

router.get('/renew', [validateJWT], revalidateToken)

export { router }
