import React, { useState, useEffect } from "react";
import fire from "./fire";
import Login from "./Login";
import Hero from "./Hero";
import firebase from "firebase";
import './App.css';

function App() {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordErros] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');

  }

  const clearErrors = () => {
    setEmailError('');
    setPasswordErros('');
  }
  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordErros(err.message)
            break;
        }

      });

  };

  const handleSignUp = () => {
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(err => {
        switch (err.code) {
          case "auth/email-already-in-use":
          case "auth/invalid-email":

            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordErros(err.message);
            break;
        }

      });

  };

  const loginWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;

        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  }


  const handleLogout = () => {
    fire.auth().signOut();
  };
  const authListener = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }

    })
  }

  useEffect(() => {
    authListener();
  }, [])



  return (

    <div className="App">
      {user ? (
        <Hero handleLogout={handleLogout} />
      ) : (

        <Login email={email} setEmail={setEmail} password={password}
          setPassword={setPassword} handleLogin={handleLogin}
          handleSignUp={handleSignUp} hasAccount={hasAccount}
          loginWithGoogle={loginWithGoogle}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}


        />
      )}


    </div>

  );

}

export default App;
