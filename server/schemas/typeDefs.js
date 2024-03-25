const { gql } = require('apollo-server-express');




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
    me(userId: ID!): User
    searchBooks(searchTerm: String!): [Book]!
    getSavedBooks: [Book]!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(email: String!, password: String!): User!
    saveBook(book: BookInput!): User!
    removeBook(bookId: ID!): User!
    addUser(username: String!, email: String!, password: String!): User!
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
