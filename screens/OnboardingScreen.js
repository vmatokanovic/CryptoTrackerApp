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
    bottomBarColor='#18c68b'
    titleStyles={{
        color: '#18c68b',
        fontWeight: 'bold',
        letterSpacing: 2
    }}
    subTitleStyles={{
        color: '#caffea'
    }}
    onSkip={() => navigation.navigate("Login")}
    onDone={() => navigation.navigate("Login")}
    pages={[
        {
            backgroundColor: '#0b0d11',
            image: <Image source={require('../assets/onboardingCoins.png')} style={{width: 250, height: 250}}/>,
            title: 'Welcome!',
            subtitle: 'Track prices of all cryptocurrencies in real-time, past time and read informations about crypto',
        },
        {
            backgroundColor: '#0b0d11',
            image: <Image source={require('../assets/onboardingProfile.png')} style={{width: 250, height: 250}}/>,
            title: 'Setup profile',
            subtitle: 'Register new profile or login with an existing one',
        },
        {
            backgroundColor: '#0b0d11',
            image: <Image source={require('../assets/onboardingFavourites.png')} style={{width: 250, height: 250}}/>,
            title: 'Favourites',
            subtitle: 'Add your favourite coins to your favourites list',
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