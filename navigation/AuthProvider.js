import { async } from '@firebase/util';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth';
import React, { Children, createContext, useState } from 'react'
import { auth } from '../firebase';

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
                }
            },
            register: async (email, password) => {
                try{
                    await createUserWithEmailAndPassword(auth, email, password);
                } catch(e){
                    console.log(e);
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
