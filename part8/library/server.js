require('dotenv').config()

const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/user')

const getUserFromAuth = (auth) => {
  if (!auth || !auth.startsWith('Bearer ')) {
    return null
  }

  const decodedToken = jwt.verify(auth.substring(7), process.env.JWT_SECRET)
  return User.findById(decodedToken.id)
}

const startServer = (port) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  })

  startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const currentUser = await getUserFromAuth(req.headers.authorization)
      return { currentUser }
    }
  }).then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })
}

module.exports = startServer
