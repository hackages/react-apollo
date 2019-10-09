import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { split, ApolloLink } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { onError } from 'apollo-link-error'
import { getMainDefinition } from 'apollo-utilities'
import { BrowserRouter } from 'react-router-dom'
import { HTTP_URL, WS_URL } from './constants'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.jsx'
import { store } from './store'

const httpLink = new HttpLink({
  uri: HTTP_URL,
  credentials: 'same-origin',
})

// Create the subscription websocket link
const wsLink = new WebSocketLink({
  uri: WS_URL,
  options: {
    reconnect: true,
  },
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const queryLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink
)

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, queryLink]),
  cache: new InMemoryCache(),
  connectToDevTools: true,
})

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)