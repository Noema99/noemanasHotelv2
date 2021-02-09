import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Alert } from 'react-native';

import { AuthContext } from '../navigation/AuthProviderAdmin';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SelectInput from '@tele2/react-native-select-input';
import DatePicker from 'react-native-datepicker';
import firestore from '@react-native-firebase/firestore';

import {
  Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText
} from '../styles/FeedStyles';

const AjouterChambreScreen =() => {
  const { admin, logoutAdmin } = useContext(AuthContext);
  const { colors } = useTheme();
  const [type, setType] = useState(null);
  const [nbrLit, setFirstName] = useState(null);
  const [genreLit, setLastName] = useState(null);
  const [cheminee, setDateNaissance] = useState(null);
  const [balcon, setPhoneNumber] = useState(null);
  const [salleBain, setCity] = useState(null);
    const [nbrPers, setCity] = useState(null);
    const [reduction, setCity] = useState(null);
    const [prixNuit, setCity] = useState(null);
  const submitUser = async () => {
    
    firestore()
      .collection('chambres')
      .doc(user.uid)
      .set({
      firstName: firstName,
      lastName: lastName,
      sexe: sexe,
      dateNaissance: dateNaissance,
      phoneNumber: phoneNumber,
      city: city,
    })
    .then(() => {
      console.log('USER Added!');
      Alert.alert(
        'Parfait!!',
        'Vos coordonnees sont bien ajoutees!',
      );
    })
    .catch((error) => {
      console.log('Something went wrong with added user to firestore.', error);
    });

  }
  return (
    <Container>
    
         <UserImg source={require('../assets/users/user-0.jpg')} />
      <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
            <UserInfoText>
            <UserName>  {user.uid} </UserName>
            </UserInfoText>
          
      </View>
      <View style={styles.action}>
          <FontAwesome name="envelope-o" color={colors.text} size={20} />
            <UserInfoText>
            <UserName> {user.email} </UserName>
            </UserInfoText>
          
      </View>
      <View style={styles.action1}>
              <FontAwesome name="mars-stroke" color={colors.text} size={20} />
              <SelectInput   
                placeholder="Vous êtes"
                placeholderTextColor="#666666"
                autoCorrect={false}
                value={sexe}
                onChangeText={(content) => setSexe(content)}  
                valueStyle={[
                styles.textInput,
                {color: colors.text,border:0,},
                          
                ]}
                options={[
                {
                    value: 'value1',
                    label: 'Mme',
                },
                {
                    value: 'value2',
                    label: 'Mr',
                    } ,
                {
                    value: 'value3',
                    label: 'Sans indiquer',
                }
                ]}/>   
      </View>

      <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Prénom"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={firstName}
            onChangeText={(content) => setFirstName(content)}
              style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
      </View>
      <View style={styles.action}>
        <FontAwesome name="user-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Nom"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={lastName}
          onChangeText={(content) => setLastName(content)}
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        >
        </TextInput>
      </View>
      
      <View style={styles.action}>
      <FontAwesome name="calendar" color={colors.text} size={20} />
        <DatePicker
          placeholder="Date de naissance"
          showIcon = ""
          placeholderTextColor="#2E765E"
          format="YYYY-MM-DD"
          minDate="1940-01-01"
          autoCorrect={false}
          date={dateNaissance}
          onDateChange={(content) => setDateNaissance(content)}
          style={[
            styles.dateInput,
            {
              
            },
          ]}
          customStyles={{
          dateIcon: {
            position: 'absolute',
            left: -15,
            top: 4,
            marginLeft: 0,
            border : 'none'
          },
            dateInput: {
              borderWidth: 0,
              marginLeft: -225
          }
          // ... You can check the source to find the other keys.
        }}
        />
      </View>
      <View style={styles.action}>
        <Feather name="phone" color={colors.text} size={20} />
        <TextInput
          placeholder="Numéro de téléphone"
          placeholderTextColor="#666666"
          keyboardType="number-pad"
          autoCorrect={false}
          value={phoneNumber}
          onChangeText={(content) => setPhoneNumber(content)}
          
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <View style={styles.action}>
        <Icon name="map-marker-outline" color={colors.text} size={20} />
        <TextInput
          placeholder="Ville"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={city}
          onChangeText={(content) => setCity(content)}
        
          style={[
            styles.textInput,
            {
              color: colors.text,
            },
          ]}
        />
      </View>
      <TouchableOpacity style={styles.commandButton} onPress={() => submitUser()}>
        <Text style={styles.panelButtonTitle}>Valider</Text>
      </TouchableOpacity>
   </Container>
);
};

export default AjouterChambreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#2E765E',
    alignItems: 'center',
    marginTop: 10,
    marginVertical: 35,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2E765E',
    alignItems: 'center',
    marginVertical: 35,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  textInputSexe: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 100,
    color: '#05375a',
  },
  dateInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    
    paddingLeft: 10,
    color: '#2E765E',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },action1: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  deco: {
    
  },
});