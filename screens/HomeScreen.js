import React, { useContext,  createContext, useReducer } from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import FormButton from '../components/FormButton';

const AuthContext = createContext();
const HomeScreen = () => {
    const {user} = useContext(AuthContext);
    return (
    <View>
        <Text>
            Homeeeeeeeeeee, welcome {user.id}
        </Text>
        <FormButton buttonTitle="logout" onPress={()=>{}} />
    </View>

    );
  };
  
  export default HomeScreen;