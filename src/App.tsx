import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { initializeFirebase, signIn, signOut } from './features/auth/auth';
import { selectUser } from './features/auth/authSlice';

import './App.css';

function App() {
  const currentUser = useAppSelector(state => selectUser(state))
  const dispatch = useAppDispatch();

  useEffect(() => {
    initializeFirebase(dispatch);
  }, [dispatch])

  const handleSignin = () => {
    signIn(dispatch);
  }

  const handleSignOut = async () => {
    await signOut()
  }

  // Do not render if currentUser === undefined.  This removes flashing Signin button whilst user data is being loaded from firebase
  return (
    <div className="App">
      { currentUser === null && <Button variant='outlined' onClick={handleSignin}>Google Signin</Button> }
      { currentUser && <Button variant='outlined' onClick={handleSignOut}>Logout</Button> }
      <Box sx={{ mt: 5, width: '100%' }}>
      </Box>
    </div>
  );
}

export default App;
