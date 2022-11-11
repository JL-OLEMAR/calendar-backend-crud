import jwt from 'jsonwebtoken'

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: '2h' },
      (err, token) => {
        err && reject(new Error('Failed to generate token'))
        resolve(token)
      }
    )
  })
}

export { generateJWT }
