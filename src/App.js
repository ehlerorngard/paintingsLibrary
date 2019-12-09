import React from 'react'
// import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles';
import { configureStore } from './configureStore.js'
import theme from './uiTheme.js'

// ===== COMPONENTS =====
import Cartographer from './Cartographer.js'

function App() {
  return (
    <Provider store={configureStore()}>
      <div className="App">
        <MuiThemeProvider theme={theme}>
          <Cartographer />
        </MuiThemeProvider>
      </div>
    </Provider>
  );
}

export default App;
