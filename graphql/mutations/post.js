import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost($title: String!, $body: String!) {
    createPost(title: $title body: $body) {
        id
        title
        body
    }
  }`

export const UPDATE_POST = gql`
  mutation updatePost($id: ID!, $title: String, $body: String) {
    updatePost(id: $id, title: $title, body: $body) {
      id
      title
      body
    }
  }
`
