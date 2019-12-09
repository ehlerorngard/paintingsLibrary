import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost';
import reducer from "./utils/reducer.js";
import queries from './utils/queries.js';

const cache = new InMemoryCache();
const baseuri = (process.env.NODE_ENV === 'production') ? 'https://paintings-library.herokuapp.com' : 'http://localhost:4000';
const uri = `${baseuri}/graphql`;
const link = new HttpLink({
  uri: uri,
});

const apollo = new ApolloClient({
  cache,
  link,
})

function configureStore(initialState = {apollo: apollo}) {
  const enhancers = [
    // applyMiddleware(apollo.middleware),
  ];

  const reduxDevTools =
    (process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          shouldHotReload: false,
        })
      : compose);

  const store = createStore(
    reducer,
    {...initialState},
    // reduxDevTools(...enhancers)
    ...enhancers
  );

  return store;
}

export { apollo, configureStore }