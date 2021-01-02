import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);
const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#2E765E',
            image: <Image source={require('../assets/logohotel.png')} />,
            title: 'Votre séjour de rêves',
            subtitle: 'On vous souhaite la bienvenue! \n Venez nous découvrir..',
          },
          {
            backgroundColor: '#5d3c29',
            image: <Image style={{ height: 900, width: 600}} source={require('../assets/camp1.jpg')} />,
            title: '',
            subtitle: 'Share Your Thoughts With Similar Kind of People',
          },
          {
            backgroundColor: '#706257',
            image: <Image style={{ height: 900, width: 600}}source={require('../assets/camp2.jpg')} />,
            title: 'Become The Star',
            subtitle: "Let The Spot Light Capture You",
            },
            {
            
            backgroundColor: '#906b59',
            image: <Image style={{ height: 900, width: 600}} source={require('../assets/camp3.jpg')} />,
            title: 'Become The Star',
            subtitle: "Let The Spot Light Capture You",
            },
            {
            backgroundColor: '#614e3d',
            image: <Image style={{ height: 900, width: 600}} source={require('../assets/camp4.jpg')} />,
            title: 'Become The Star',
            subtitle: "Let The Spot Light Capture You",
            },
            {
            backgroundColor: '#2E765E',
            image: <Image source={require('../assets/logohotel.png')} />,
            title: 'Soyez les BIENVENUS',
            subtitle: 'Réservez maintenant votre chambre',
          }
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    photo: {
        resizeMode: "center",
        height: 100,
        width: 100
    }

});