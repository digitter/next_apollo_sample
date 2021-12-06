import { gql } from "@apollo/client";

export const POST = gql`
  query post($id: ID!) {
    post(id: $id) {
      id
      title
    }
  }
`;

export const POSTS = gql`
  query posts {
    posts {
      id
      title
      body
    }
  }
`;

