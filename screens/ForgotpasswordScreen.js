import React, { useState , useContext} from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert,Image,TouchableOpacity } from 'react-native';

import auth from '@react-native-firebase/auth';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const ForgotpasswordScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState();
  const [showLoading, setShowLoading] = useState(false);
 let actionCodeSettings = auth.ActionCodeSettings;

  //let { user, passwordReset } =useContext(AuthContext);
  
  const passwordReset = async () => {
    setShowLoading(true);
    try {
      await auth().sendPasswordResetEmail(email.trim(), actionCodeSettings);
      setShowLoading(false);
      console.log("c ok check ur email");
      Alert.alert("Veuillez voir votre boite email " , " modifiez votre mdp !")
    } catch (e) {
      setShowLoading(false);
      console.log("c pas ok ");
      Alert.alert(
        e.message
      );
    }
  };
  
  return (
    <View style={styles.container}>
          <Image
            source={require('../assets/logo.jpg')}
            style={styles.logo}
          />
      <Text style={styles.navButtonText}>Reset your password </Text>
      <Text style={styles.forgotButton}>Please enter a valid email </Text>
      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <FormButton
        buttonTitle="Reset"
        onPress={() => passwordReset()}
      />
        <TouchableOpacity style={styles.forgotButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Back to login</Text>
      </TouchableOpacity>

        {showLoading &&
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
      </View>
   
  );
  
}; 
export default ForgotpasswordScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E765E',
    fontFamily: 'Lato-Regular',
  },
});