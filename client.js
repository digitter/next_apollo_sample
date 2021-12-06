import {
  ApolloClient,
  InMemoryCache,
  defaultDataIdFromObject,
  createHttpLink,
  ApolloLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

export const cache = new InMemoryCache({
  dataIdFromObject(responseObject) {
    switch (responseObject.__typename) {
      // case 'User': return `User:${responseObject.name}:${responseObject.email}`;
      default: return defaultDataIdFromObject(responseObject);
    }
  },
  addTypename: false
});

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
});

// リクエスト時の設定
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-CSRF-Token': window.localStorage.getItem('csrf-token')
    },
    withCredentials: true,
  }
});

// レスポンスを受け取る時の設定
const afterwareLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    const context = operation.getContext()
    const {
      headers
    } = context

    if (headers) {
      const newToken = headers['X-CSRF-Token']
      if (newToken) {
        localStorage.setItem('csrf-token', newToken)
      }
    }

    return response
  })
})

const param = {
  link: ApolloLink.from([
    authLink,
    afterwareLink,
    httpLink,
  ]),
  cache,
  connectToDevTools: true
}

export const client = new ApolloClient(param);
