const jwt = require('jsonwebtoken')

// Banco de dados
const dbUser = {
  'sheldon@cooper.com': { email: 'sheldon@cooper.com', name: 'Sheldon', password: 'bazinga' },
  'penny@cuoco.com': { email: 'penny@cuoco.com', name: 'Penny', password: 'bazinga' },
  'leonard@hofstadter.com': { email: 'leonard@hofstadter.com', name: 'Leonard', password: 'bazinga' }
}

const secret = 'meat-api-password'

module.exports = {
  handleAuthentication: (req, res) => {
    const user = req.body

    if (isValid(user)) {
      const login = dbUser[user.email]
      const accessToken = jwt.sign({ sub: login.email, iss: 'meat-api' }, secret)

      res.json({ email: login.email, name: login.name, accessToken })
    } else {
      res.status(403).json({ message: 'Dados inválidos.' })
    }
  },

  handleAuthorization: (req, res, next) => {
    const token = extractToken(req)
    if (!token) {
      res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
      res.status(401).json({ message: 'Você precisa se autenticar.' })
    } else {
      jwt.verify(token, secret, (error, decoded) => {
        if (decoded) {
          next()
        } else {
          res.status(403).json({ message: 'Não autorizado.' })
        }
      })
    }
  }
}

function isValid(user) {
  const checked = dbUser[user.email]

  return checked !== undefined && checked.email === user.email && checked.password === user.password
}

function extractToken(req) {
  let token = undefined

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ')
    if (parts.length === 2 && parts[0] === 'Bearer') {
      token = parts[1]
    }
  }

  return token
}
