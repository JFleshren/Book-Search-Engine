const { gql } = require('apollo-server');

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]!
  }

  type Query {
    searchBooks(searchTerm: String!): [Book]!
    getSavedBooks: [Book]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    saveBook(book: BookInput!): User!
    removeBook(bookId: ID!): User!
  }

  input BookInput {
    title: String!
    author: String!
    description: String!
    image: String!
    link: String!
  }
`;

module.exports = typeDefs;
