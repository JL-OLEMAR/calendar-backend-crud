/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()

const {
  createUser,
  loginUser,
  RevalidateToken
} = require('../controllers/auth')

router.post(
  '/new',
  [
    // middlewares
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be six characters long').isLength({
      min: 6
    })
  ],
  createUser
)
router.post(
  '/',
  [
    // middlewares
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be six characters long').isLength({
      min: 6
    })
  ],
  loginUser
)
router.get('/renew', RevalidateToken)

module.exports = router
