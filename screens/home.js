import React, { useContext,  createContext, useReducer } from 'react';
import {View, Text, Alert, StyleSheet, FlatList} from 'react-native';
import FormButton from '../components/FormButton';
import auth, { firebase } from "@react-native-firebase/auth";
import { AuthContext } from '../navigation/AuthProvider';


const HomeScreen = ({ navigation }) => {
    const {user}= useContext(AuthContext);
    /*
    const _doSignOut = async () => {
        let response = await firebase.auth().signOut();
        if (response && response.user) {
            Alert.alert("Vous vous êtes déconnectés", "Bye bye");
            navigation.navigate("Login");
            console.log('User signed out!');
          }
        
    }
    const logOut = () => {
        Alert.alert("Vous vous êtes déconnectés", "Bye bye");
        navigation.navigate('Onbo');
    }*/
    return (
    <View>
        <Text>
            welcome Homeeeeeeeeeee 
        </Text>
        <FormButton buttonTitle="logout" onPress={() => logout()}/>
    </View>

    );
  };
  
  export default HomeScreen;