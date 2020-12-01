import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify, { Auth, Storage } from 'aws-amplify';
//import config from './aws-exports';
//Amplify.configure(config);
Amplify.configure({
  Auth: {
    identityPoolId: 'us-east-1:979574ee-3738-486d-8364-efaa2a5067fa', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_xURGaUxkx', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '1gqmvf15e1ljdu60go2udsu492', //OPTIONAL - Amazon Cognito Web Client ID
  },
  Storage: {
    AWSS3: {
      //bucket: 'vodtest-source-1fl9wonajg4s4', //REQUIRED -  Amazon S3 bucket name
      bucket: 'trivus-ott-lite-sample', //REQUIRED -  Amazon S3 bucket name
      region: 'us-east-1', //OPTIONAL -  Amazon service region
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
