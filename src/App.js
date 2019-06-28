import React from 'react'
import { Provider } from 'react-redux'
import Main from './pages/Main'
import Header from './components/Header'
import store from './store'


function App() {
  return (
    <Provider store={store}>
      <div>
        <Header/>
        <Main/>
      </div>
    </Provider>
  );
}

export default App;
