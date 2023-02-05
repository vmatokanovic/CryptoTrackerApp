import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormButton from "../components/FormButton";
import { AuthContext } from "../navigation/AuthProvider";

const Profile = () => {
  const {user, logout} = useContext(AuthContext);
  return (
      <View style={styles.container}>
        <Text style={styles.text}>Welcome {user.email}</Text>
        <FormButton buttonTitle='Logout' onPress={() => logout()}/>
      </View>
  )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f9fafd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,

    },
    text: {
        fontSize: 20,
        color: '#333333'
    }
});