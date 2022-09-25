import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { signOut, getAuth, signInWithRedirect, onAuthStateChanged, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { authGoogle, logout } from './features/auth/authSlice'

import './App.css';

const provider = new GoogleAuthProvider();

const firebaseConfig = {
  apiKey: "AIzaSyBEwqgnxsNZip_fFXZcawo1ldR_791aydQ",
  authDomain: "zzinfan-test.firebaseapp.com",
  projectId: "zzinfan-test",
  storageBucket: "zzinfan-test.appspot.com",
  messagingSenderId: "748143357000",
  appId: "1:748143357000:web:7ae4b26d1b3ba159837c7d",
  measurementId: "G-ZM28ZRPN7Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const dispatch = useAppDispatch()
  const { googleToken } = useAppSelector(state => state.auth)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setShowLogin(false)
        setShowLogout(true)

      } else {
        // User is signed out
        setShowLogin(true)
        setShowLogout(false)
      }
    });

    getRedirectResult(auth).then((result) => {
        if (!result) {
          return
        }
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // save google auth token
        dispatch(authGoogle(token || ''))
      })
  })

  useEffect(() => {
    if (!googleToken) {
      console.log('no google token')
    }
    else {
      console.log('google token', googleToken)
    }
  }, [googleToken])

  const handleSignin = () => {
    signInWithRedirect(auth, provider)
  }

  const handleSignOut = async () => {
    await signOut(auth)
    dispatch(logout())
  }

  return (
    <div className="App">
      { showLogin && <Button variant='outlined' onClick={handleSignin}>Google Signin</Button> }
      { showLogout && <Button variant='outlined' onClick={handleSignOut}>Logout</Button> }
      <Box sx={{ mt: 5, width: '100%' }}>
      </Box>
    </div>
  );
}

export default App;
