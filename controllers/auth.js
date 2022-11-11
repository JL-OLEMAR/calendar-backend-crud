import { response } from 'express'
import bcrypt from 'bcryptjs'

import { UserModel } from '../models/user.js'

const createUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    let user = await UserModel.findOne({ email })

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'User exists with that email'
      })
    }

    user = new UserModel(req.body)

    // Encrypt password
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)

    await user.save()

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
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
