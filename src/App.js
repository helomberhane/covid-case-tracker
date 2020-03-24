import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"

// AWS Cognito
import Amplify from 'aws-amplify'

import { Provider } from 'react-redux'
import store from './reducers/store'

import Home from './components/LandingPage/Home'

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'YOUR_IDENTITY_POOL_ID',

        // REQUIRED - Amazon Cognito Region
        // e.g. us-east-1
        // Can be found in the top right of your AWS management console when in AWS Cognito
        region: 'YOUR_AMAZON_COGNITO_REGION',

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        identityPoolRegion: 'YOUR_IDENTITY_POOL_REGION',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'YOUR_USER_POOL_ID',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: 'YOUR_USER_POOL_APP_CLIENT_ID',
    }
})

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
