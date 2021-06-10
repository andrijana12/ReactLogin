 import firebase from "firebase";
 

 var firebaseConfig = {
    apiKey: "AIzaSyCKwYn581EyT_3JgFrPNc9Cw6Xf44VJquo",
    authDomain: "login-fc900.firebaseapp.com",
    projectId: "login-fc900",
    storageBucket: "login-fc900.appspot.com",
    messagingSenderId: "729717463034",
    appId: "1:729717463034:web:2bdd1739c7143d0cba3643"
  };
  // Initialize Firebase
 const fire= firebase.initializeApp(firebaseConfig);
 export default fire;