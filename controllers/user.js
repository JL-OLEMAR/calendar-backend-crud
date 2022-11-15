import { response } from 'express'
import bcrypt from 'bcryptjs'

import { UserModel } from '../models/user.js'
import { generateJWT } from '../helpers/jwt.js'

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

    // Generate JWT
    const token = await generateJWT(user.id, user.name)

    return res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
}

const loginUser = async (req, res = response) => {
  const { email, password } = req.body

  try {
    const user = await UserModel.findOne({ email })

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'User does not exist'
      })
    }

    // Confirm passwords, return Boolean
    const validPwd = bcrypt.compareSync(password, user.password)
    if (!validPwd) {
      return res.status(400).json({
        ok: false,
        msg: 'Incorrect password'
      })
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name)

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      ok: false,
      msg: 'Please contact the administrator.'
    })
  }
}

const revalidateToken = async (req, res = response) => {
  const { uid, name } = req
  const token = await generateJWT(uid, name)

  return res.json({ ok: true, token })
}

export { createUser, loginUser, revalidateToken }
