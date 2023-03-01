import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, { Children, createContext, useState } from 'react'
import { auth } from '../firebase';
import { db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
        value={{
            user,
            setUser,
            login: async (email, password) => {
                try{
                    await signInWithEmailAndPassword(auth, email, password);
                } catch(e){
                    console.log(e);
                    Alert.alert('Error', `${e}`);
                }
            },
            register: async (email, password) => {
                try{
                    await createUserWithEmailAndPassword(auth, email, password);
                    await setDoc(doc(db, "users", email), {
                        favourites: []
                    });
                } catch(e){
                    console.log(e);
                    Alert.alert('Error', `${e}`);
                }
            },
            logout: async () => {
                try {
                    await signOut(auth);
                } catch(e){
                    console.log(e);
                }
            }
        }}
    >
        {children}
    </AuthContext.Provider>
  )
}