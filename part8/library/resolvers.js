const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const jwt = require('jsonwebtoken')

const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author & !args.genre) return Book.find({}).populate('author')
      if (args.genre) return Book.find({ genres: [args.genre] }).populate('author')
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
    allGenres: async () => {
      const genres = await Book.distinct('genres')
      return genres
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('no authentication', {
          extensions: {
            code: 'UNAUTHENTICATED',
          }
        })
      }

      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(`Failed to create author`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
      }

      const book = new Book({ ...args, author: author._id })
      
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('failed to save book', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      
      const populatedBook = await book.populate('author')
      pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

      return populatedBook
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError('no authentication', {
          extensions: {
            code: 'UNAUTHENTICATED',
          }
        })
      }
      
      const author = await Author.findOne({ name: args.name })
      if (!author) return null
      
      author.born = args.setBornTo
      return author.save()
    },
    addUser: async (root, args, context) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      return user.save()
        .catch(error => {
          throw new GraphQLError(`failed to save user ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('bad credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: args.username,
        id: user._id
      }

    return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },
  Author: {
    bookCount: (root) => { // for later
      return books.filter(book => book.author === root.name).length
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers
