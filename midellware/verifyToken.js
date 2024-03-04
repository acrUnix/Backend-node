import jwt from 'jsonwebtoken'

const verifyToken = (req, res, next) => {
  const authToken = req.header('authorization')
  if (typeof authToken !== 'undefined') {
    const bearerToken = authToken.split(' ')[1]
    req.token = bearerToken
  } else {
    return res.sendStatus(403).end()
  }

  jwt.verify(req.token, process.env.SECRETKEY, (error, authUser) => {
    if (error) {
      return res.sendStatus(403).end()
    } else {
      req.authenticatedUser = authUser
      next()
    }
  })
}

export { verifyToken }
