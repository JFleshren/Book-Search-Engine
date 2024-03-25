import { gql } from '@apollo/client';

export const QUERY_GET_ME = gql`
  query GetMe($_id: ID!) {
    me(userId: $_id) {
      _id
      username
      email
      savedBooks {
        title
        authors
        image
        bookId
        description
        link
      }
    }
  }
`;
