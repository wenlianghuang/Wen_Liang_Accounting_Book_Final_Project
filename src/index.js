import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ApolloClient,InMemoryCache} from 'apollo-boost';
//import { ApolloClient } from '@apollo/client';
//import { InMemoryCache } from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: 'http://localhost:5000'
})


/*const httpLink = new HttpLink({
    uri: ''
});*/

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000',
  options: {reconnect: true}
})

/*const wsLink = new WebSocketLink({
    uri: '192.168.100.2',
    options: {reconnect: true}
});*/


const link = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

/*const link = split(
  ({query}) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  httpLink
)*/

const client = new ApolloClient({
    link,
    cache: new InMemoryCache().restore({})
  }
)

/*const client = new ApolloProvider({
    uri:'',
    cache: new InMemoryCache().restore({})
})*/

const wrapperApollo = (
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
)
ReactDOM.render(
  wrapperApollo,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
