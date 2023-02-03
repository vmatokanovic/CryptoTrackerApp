import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const {register} = useContext(AuthContext);

    const handleSignUp = () => {
      alert('Sign up clicked!');
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      navigation.navigate("Login");
    }

  return (
    <View style={styles.container}>
        <Text style={styles.text}>Create an account</Text>
      <FormInput labelValue={email} onChangeText={(userEmail) => setEmail(userEmail)} placeholderText="Enter e-mail..."/>
      <FormInput labelValue={password} onChangeText={(userPassword) => setPassword(userPassword)} placeholderText="Enter password..." secureTextEntry={true}/>
      <FormInput labelValue={confirmPassword} onChangeText={(userPassword) => setConfirmPassword(userPassword)} placeholderText="Repeat password..." secureTextEntry={true}/>
      <FormButton buttonTitle='Sign up' onPress={() => register(email, password)}/>
      <SocialButton buttonTitle='Sign up with Facebook' backgroundColor='#fff' color='black'/>
      <SocialButton buttonTitle='Sign up with Google' backgroundColor='#fff' color='black'/>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("Login")}>
        <Text style={{color: 'blue', fontWeight:'bold'}}>Already have an account? Sign in now!</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
      paddingHorizontal: 10
    },
    signupButton:{
      padding: 10,
      fontSize: 20
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        paddingBottom: 50
    }
  });