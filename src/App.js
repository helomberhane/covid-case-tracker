import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

import { Provider } from 'react-redux'
import store from './reducers/store'

import Home from './components/LandingPage/Home'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <Route exact path="/" component={Home} />
        </div>
      </Provider>
    </Router>
  );
}

export default App
