const { response } = require('express')

const createUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'SignUp'
  })
}

const loginUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'login'
  })
}

const RevalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}

module.exports = {
  createUser,
  loginUser,
  RevalidateToken
}
