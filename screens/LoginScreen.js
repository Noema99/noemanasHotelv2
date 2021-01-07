import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView, Alert
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import {AuthContext}   from '../navigation/AuthProvider';

const LoginScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  let { user, login } =useContext(AuthContext);
  

  /*const __doSingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      if (response && response.user) {
        console.log(user.email)
        Alert.alert("Bienvenu ",user.email,[  
          {  text: 'Annuler',  
            onPress: () => {
              auth().signOut().then(() => {
                Alert.alert("Bye bye" ,"A la prochaine")
                console.log('User signed out!')
              });
            }
            ,  
              style: 'cancel'},  
          {   text: 'Commençer', onPress: () => navigation.navigate("Home")},  
         ]  )
        //navigation.navigate("Home")

      }
    } catch (e) {
      console.error(e.message)
      Alert.alert("Oups", "Vous n'êtes toujours pas inscris chez nous!!")
    }
  }*/

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.text}>Welcomes you </Text>

      <FormInput
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton
        buttonTitle="Sign In"
        onPress={() => {
          login(email, password)
        }}
      />

      <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
        <Text style={styles.navButtonText}>Forgot Password?</Text>
      </TouchableOpacity>

     
        <View>
          <SocialButton
            buttonTitle="Sign In with Facebook"
            btnType="facebook"
            color="#4867aa"
            backgroundColor="#e6eaf4"
            onPress={() => {}}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() =>{} }
          />
        </View>
      

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
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