import React from 'react';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';


const AppStack  = createStackNavigator();

const AppNavigator =props=> {
  return (
   <NavigationContainer>
     <AppStack.Navigator screenOptions={{headerShown: false, }}>
       <AppStack.Screen name="Onbo" component={OnboardingScreen}/>
       <AppStack.Screen name="Login" component={LoginScreen}/>
       <AppStack.Screen name="Signup" component={SignupScreen}/>
        <AppStack.Screen name="Home" component={HomeScreen} />
        <AppStack.Screen name="Profile" component={ProfileScreen}/>
     </AppStack.Navigator>
   </NavigationContainer>
  );
};


export default AppNavigator;
