/*
  Rutas de Usuarios / Auth
  host + /api/auth
*/

const { Router } = require('express')
const router = Router()

const {
  createUser,
  loginUser,
  RevalidateToken
} = require('../controllers/auht.js')

router.post('/new', createUser)
router.post('/', loginUser)
router.get('/renew', RevalidateToken)

module.exports = router
