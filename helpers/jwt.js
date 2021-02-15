const jwt = require('jsonwebtoken')

const generarJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name }

    // sign(data, palabra-secret, tiempo-expiracion)
    jwt.sign(payload, process.env.SECRET_JWT_SEED, {
      expiresIn: '2h'
    }, (err, token) => {
      if (err) {
        console.log(err)
        reject('No se pudo generar el token') // eslint-disable-line
      }
      resolve(token)
    })
  })
}

module.exports = {
  generarJWT
}
