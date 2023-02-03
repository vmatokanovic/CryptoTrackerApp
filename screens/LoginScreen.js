import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import SocialButton from '../components/SocialButton';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthContext } from '../navigation/AuthProvider';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <FormInput labelValue={email} onChangeText={(userEmail) => setEmail(userEmail)} placeholderText="Enter e-mail..."/>
      <FormInput labelValue={password} onChangeText={(userPassword) => setPassword(userPassword)} placeholderText="Enter password..." secureTextEntry={true}/>
      <FormButton buttonTitle='Sign in' onPress={() => login(email, password)}/>
      <TouchableOpacity style={styles.signupButton}>
        <Text style={{color: 'red'}}>Forgot your password?</Text>
      </TouchableOpacity>
      
      <SocialButton buttonTitle='Sign in with Facebook' backgroundColor='#fff' color='black'/>
      <SocialButton buttonTitle='Sign in with Google' backgroundColor='#fff' color='black'/>
      <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate("Signup")}>
        <Text style={{color: 'blue', fontWeight:'bold'}}>Don't have an account? Sign up now!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  }
});