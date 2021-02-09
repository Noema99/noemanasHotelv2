import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';

import COLORS from '../consts/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import firestore from '@react-native-firebase/firestore';

import { AuthContext } from '../navigation/AuthProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';


import {
  Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText
} from '../styles/FeedStyles';

const ReserverScreen = ({navigation, route}) => {
  const item = route.params.selectedChambre;
    

  const { user, logout } = useContext(AuthContext);
    
  const { colors } = useTheme();
  const [type, setType] = useState(null);
  const [nbrLit, setNbrLit] = useState(null);
  const [genreLit, setgenreLit] = useState(null);
  const [chambreImg, setChambreImg] = useState(null);
  const [prixNuit, setPrixNuit] = useState(null);
  const [nbrPersonnes, setnbrPersonnes] = useState(null); 
  const [periode, setPeriode] = useState(null);
  const [dateDebut, setDateDebut] = useState(null);
  const [dateFin, setDateFin] = useState(null);
  const [prixTotal, setPrixTotal] = useState(null);
  const prixTot = prixNuit * periode; 
 
  const submitReservation = async () => {
    firestore()
      .collection('reservations')
      .doc()
        .set({
        userId : user.uid,
        type: item.type,
        nbrLit: item.nbrLit,
        genreLit: item.genreLit,
        prixNuit: item.prixNuit,
        nbrPersonnes: nbrPersonnes,
        periode: periode,
        dateDebut: dateDebut,
        dateFin: dateFin,
        prixTotal: item.prixNuit*periode,
    })
    .then(() => {
      console.log('reservation  Added!');
      Alert.alert(
        'Reservation ajoutée!!',
        'Consulter votre boite de reservations ',
      );
    })
    .catch((error) => {
      console.log('Something went wrong with added reservation to firestore.', error);
    });

  }
  return (
    <Container>  
    <UserImg source={{ uri : item.chambreImg}} />
      

      <View style={styles.action}>
        
      <FontAwesome name="home" color={colors.text} size={20} />
          <Text  style={[styles.textInput,{color: colors.text,},]}> Vous avez choisi une chambre {item.type} </Text>
      </View>
      <View style={styles.action}>
        
      <FontAwesome name="money" color={colors.text} size={20} />
          <Text  style={[styles.textInput,{color: colors.text,},]}> Son prix par nuit est de {item.prixNuit} MAD </Text>
      </View>
      <View style={styles.action}>
        
      <FontAwesome name="bed" color={colors.text} size={20} />
        <Text  style={[styles.textInput,{color: colors.text,},]}> Avec {item.nbrLit} lit(s) {item.genreLit}(s) </Text>
      </View>
      <View style={styles.action}>    
        <FontAwesome name="users" color={colors.text} size={20} />
        <TextInput
          placeholder="Nombre de personne"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={nbrPersonnes}
          onChangeText={(content) => setnbrPersonnes(content)}
          style={[styles.textInput,{color: colors.text,},]}
        />
          </View>
      
      <View style={styles.action}>
      <FontAwesome name="calendar" color={colors.text} size={20} />
        <DatePicker
          placeholder="Choisissez votre date de début"
          showIcon = ""
          placeholderTextColor="#2E765E"
          format="YYYY-MM-DD"
          minDate="1940-01-01"
          autoCorrect={false}
          date={dateDebut}
          onDateChange={(content) => setDateDebut(content)}
          style={[ styles.dateInput,{},]}
          customStyles={{
          dateIcon: {position: 'absolute',left: -15,top: 4,marginLeft: 0,border : 'none' },
          dateInput: {borderWidth: 0,marginLeft: -225}
          // ... You can check the source to find the other keys.
        }}
        />
    </View>
     <View style={styles.action}>
      <FontAwesome name="calendar" color={colors.text} size={20} />
        <DatePicker
          placeholder="Choisisser votre date de fin"
          showIcon = ""
          placeholderTextColor="#2E765E"
          format="YYYY-MM-DD"
          minDate="1940-01-01"
          autoCorrect={false}
          date={dateFin}
          onDateChange={(content) => setDateFin(content)}
          style={[ styles.dateInput,{},]}
          customStyles={{
          dateIcon: {position: 'absolute',left: -15,top: 4,marginLeft: 0,border : 'none' },
          dateInput: {borderWidth: 0,marginLeft: -225}
          // ... You can check the source to find the other keys.
        }}
        />
      </View> 
      <View style={styles.action}>    
      <FontAwesome name="clock-o" color={colors.text} size={20} />
        <TextInput
          placeholder="Periode (en jours)"
          placeholderTextColor="#666666"
          autoCorrect={false}
          value={periode}
          onChangeText={(content) => setPeriode(content)}
          style={[styles.textInput,{color: colors.text,},]}
        />
          </View>
        
      <TouchableOpacity style={styles.commandButton} onPress={() => submitReservation()}>
        <Text style={styles.panelButtonTitle}>Valider</Text>
      </TouchableOpacity>
   </Container>
    );  
};

const styles = StyleSheet.create({
  btn: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
  },

  priceTag: {
    height: 40,
    alignItems: 'center',
    marginLeft: 40,
    paddingLeft: 20,
    flex: 1,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'absolute',
    height: 60,
    width: 60,
    backgroundColor: COLORS.primary,
    top: -30,
    right: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    height: 400,
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    overflow: 'hidden',
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  }, container: {
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
    marginTop: 40,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingLeft: 10,
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
    
    paddingLeft: 100,
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

export default ReserverScreen;