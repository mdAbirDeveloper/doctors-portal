import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth';
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const creatUser = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signInUser = (email, password) =>{
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const updateUser = (userInfo) =>{
        return updateProfile(auth.currentUser, userInfo);
    }

    const signOutUser = () =>{
        return signOut(auth);
    };

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log('user obserbing');
            setUser(currentUser);
            setLoading(false)
        })
      return () => {
        unsubscribe()
      };
    }, [])

    const authInfo = {
        creatUser, 
        signInUser,
        setUser,
        signOutUser,
        updateUser,
        loading,
        user,
    }
    return (
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
    );
};

export default AuthProvider;