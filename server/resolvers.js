const { User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, { userId }) => User.findOne({ _id: userId }),
  },
  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.isCorrectPassword(password))) {
        throw new AuthenticationError('Incorrect email or password');
      }
      const token = signToken(user);
      return { token, user };
    },
    addUser: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    saveBook: async (_, { input }, { user }) => {
      if (!user) throw new AuthenticationError('You need to be logged in!');
      return User.findByIdAndUpdate(user._id, { $push: { savedBooks: input } }, { new: true, runValidators: true });
    },
    removeBook: async (_, { bookId }, { user }) => {
      if (!user) throw new AuthenticationError('You need to be logged in!');
      return User.findOneAndUpdate({ _id: user._id }, { $pull: { savedBooks: { bookId } } }, { new: true });
    },
  },
};

module.exports = resolvers;
