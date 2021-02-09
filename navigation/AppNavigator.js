import React from 'react';

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AddReservationScreen from '../screens/AddReservationScreen';
import ForgotpasswordScreen from '../screens/ForgotpasswordScreen';
import ReclamationScreen from '../screens/ReclamationScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ChambresScreen from '../screens/ChambresScreen';
import ReserverScreen from '../screens/ReserverScreen';
import ChambreCard from '../components/ChambreCard';

const AppStack  = createStackNavigator();

const AppNavigator = props => {
  return (
   <NavigationContainer>
     <AppStack.Navigator screenOptions={{headerShown: false, }} initialRouteName='Onbo'>
       <AppStack.Screen name="Onbo" component={OnboardingScreen}/>
       <AppStack.Screen name="Login" component={LoginScreen}/>
       <AppStack.Screen name="Signup" component={SignupScreen}/>
        <AppStack.Screen name="Home" component={HomeScreen} />
        <AppStack.Screen name="Profile" component={ProfileScreen} />
        <AppStack.Screen name="EditProfile" component={EditProfileScreen} />
        <AppStack.Screen name="AddReservation" component={AddReservationScreen} />
        <AppStack.Screen name="Forgotpassword" component={ForgotpasswordScreen} />
        <AppStack.Screen name="Reclamation" component={ReclamationScreen} />
        <AppStack.Screen name="Chambres" component={ChambresScreen} />
        <AppStack.Screen name="Reservation" component={ReservationScreen} />
        <AppStack.Screen name="Reserver" component={ReserverScreen} />
        <AppStack.Screen name="ChambreCard" component={ChambreCard} />
     </AppStack.Navigator>
   </NavigationContainer>
  );
};


export default AppNavigator;