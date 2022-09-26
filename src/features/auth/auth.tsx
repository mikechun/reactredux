import React from 'react';
import { getAuth, signOut as fbaseSignOut, onAuthStateChanged, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { initializeApp } from 'firebase/app';

import { useAppSelector } from '../../app/hooks';
import { selectUser, login, logout } from './authSlice';
import { AppDispatch } from '../../app/store';
import type { Profile } from '../account/profile';


const firebaseConfig = {
  apiKey: "AIzaSyBEwqgnxsNZip_fFXZcawo1ldR_791aydQ",
  authDomain: "zzinfan-test.firebaseapp.com",
  projectId: "zzinfan-test",
  storageBucket: "zzinfan-test.appspot.com",
  messagingSenderId: "748143357000",
  appId: "1:748143357000:web:7ae4b26d1b3ba159837c7d",
  measurementId: "G-ZM28ZRPN7Q"
};
initializeApp(firebaseConfig);

const auth = getAuth();
const provider = new GoogleAuthProvider();

function initializeFirebase(dispatch: AppDispatch) {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // update accessToken if it's expired
      const tokenResult = await firebaseUser.getIdTokenResult();
      const { signInProvider } = tokenResult;
      const { name, email, email_verified, picture, user_id } = tokenResult.claims;
      const profile:Profile = {
        accessToken: tokenResult.token,
        displayName: String(name) || '',
        email: String(email) || '',
        emailVerified: String(email_verified) || '',
        photoURL: String(picture) || '',
        providerId: signInProvider || '',
        uid: String(user_id) || '',
      }
      dispatch(login(profile))
    }
    else {
      // When user signs out or page loads without user
      dispatch(logout())
    }
  });
}

function AuthProtect({ children }: { children: JSX.Element|JSX.Element[] }) {
  const currentUser = useAppSelector(state => selectUser(state))

  if (currentUser === null) {
    return null;
    // return <Navigate to='/login' replace />
  }
  return <>{ children }</>
}

export function signIn(dispatch: AppDispatch) {
  signInWithRedirect(auth, provider)
}

export async function signOut() {
  await fbaseSignOut(auth)
}

export { initializeFirebase, AuthProtect }
