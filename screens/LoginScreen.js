import React , {useContext, useState} from 'react';
import { View,Text, TouchableOpacity, Image, Platform, StyleSheet,} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

import Icon  from 'react-native-vector-icons/FontAwesome';
import auth, { firebase } from "@react-native-firebase/auth";


const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState();
  const [password, setPassword] = useState();
 
  const __doSingIn = async (email, password) => {
    try {
      let response = await auth().signInWithEmailAndPassword(email, password)
      if (response && response.user) {
        console.log( "Authenticated successfully")
      }
    } catch (e) {
      console.error(e.message)
    }
  }
  
  
  /*componentDidMount() {
    //  this.register("said1292@gmail.com", "123456");
    this.__isTheUserAuthenticated();
  }

  __isTheUserAuthenticated = () => {
    let user = firebase.auth().currentUser.uid;
    if (user) {
      console.log(tag,  user);
      this.setState({ authenticated: true });
    } else {
      this.setState({ authenticated: false });
    }
  };*/ 
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/logo.jpg')}
                style={styles.logo}
            />
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
        onPress={() => __doSingIn(email, password)}
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
            onPress={() => fbLogin()}
          />

          <SocialButton
            buttonTitle="Sign In with Google"
            btnType="google"
            color="#de4d41"
            backgroundColor="#f5e7ea"
            onPress={() => googleLogin()}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50
    },
    logo: {
      height: 250,
      width: 250,
      justifyContent: 'center',
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

export default LoginScreen;