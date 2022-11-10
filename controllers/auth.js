import { response } from 'express'

const createUser = (req, res = response) => {
  const { name, email, password } = req.body

  res.status(201).json({
    ok: true,
    msg: 'SignUp',
    name,
    email,
    password
  })
}

const loginUser = (req, res = response) => {
  const { email, password } = req.body

  res.status(200).json({
    ok: true,
    msg: 'login',
    email,
    password
  })
}

const revalidateToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew'
  })
}

export { createUser, loginUser, revalidateToken }
