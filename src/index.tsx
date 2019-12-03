import React from 'react';
import ReactDOM from 'react-dom';
import * as firebase from "firebase";
import App from 'common/App';
import * as serviceWorker from './serviceWorker';
import './index.css'
import autoCompleteService from 'services/autoCompleteService';

const firebaseConfig = {
    apiKey: "AIzaSyC0Afu4UrdUxEXpZSNtTX5dqB7Kiz9h-58",
    authDomain: "vndict-http.firebaseapp.com",
    databaseURL: "https://vndict-http.firebaseio.com",
    projectId: "vndict-http",
    storageBucket: "vndict-http.appspot.com",
    messagingSenderId: "395495785689",
    appId: "1:395495785689:web:becd3318f899758373aac8",
    measurementId: "G-27K3H2BHSN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  autoCompleteService.initialize();

  
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
