import React from 'react'
import { View, Text, Button, StyleSheet, Image, TouchableOpacity} from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'


function OnboardingScreen({navigation}) {

    const Done = ({...props }) => (
        <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
        >
            <Text style={{fontSize:16, fontWeight: 'bold', color: '#2a2e34'}}>DONE</Text>
        </TouchableOpacity>
      );
      
    const Skip = ({...props }) => (
        <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
        >
            <Text style={{fontSize:16, fontWeight: 'bold', color: '#2a2e34'}}>SKIP</Text>
        </TouchableOpacity>
    );
      
    const Next = ({...props }) => (
        <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
        >
            <Text style={{fontSize:16, fontWeight: 'bold', color: '#2a2e34'}}>NEXT</Text>
        </TouchableOpacity>
      );

  return (
    <Onboarding
    NextButtonComponent={Next}
    SkipButtonComponent={Skip}
    DoneButtonComponent={Done}
    bottomBarColor='#f5b301'
    onSkip={() => navigation.navigate("Login")}
    onDone={() => navigation.navigate("Login")}
    pages={[
        {
            backgroundColor: '#2a2e34',
            image: <Image source={require('../assets/circle.png')} style={{width: 250, height: 250}}/>,
            title: 'Welcome!',
            subtitle: 'Track prices of all cryptocurrencies in real-time, past time and read informations about crypto',
        },
        {
            backgroundColor: '#2a2e34',
            image: <Image source={require('../assets/square.png')} style={{width: 250, height: 250}}/>,
            title: 'Setup profile',
            subtitle: 'Register new profile or login with an existing one',
        },
        {
            backgroundColor: '#2a2e34',
            image: <Image source={require('../assets/triangle.png')} style={{width: 250, height: 250}}/>,
            title: 'Favourites',
            subtitle: 'Add your favourite cryptocurrency to your shortlist',
        }
    ]}
    />
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray'
    }
})