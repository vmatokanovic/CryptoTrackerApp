import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { auth } from "../firebase";
import {AuthContext} from "./AuthProvider";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { onAuthStateChanged } from "firebase/auth";


const Routes = () => {

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if(initializing) setInitializing(false);
    });
    return subscriber;
  }, []);

  if(initializing) return null;

  return (
    <NavigationContainer>
        {user ? <AppStack/> : <AuthStack/> }
    </NavigationContainer>
  )
}

export default Routes