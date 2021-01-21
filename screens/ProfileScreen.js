import React, {useContext, useState, useEffect} from 'react';
import { View,SafeAreaView,  StyleSheet, TouchableOpacity,TextInput,Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../navigation/AuthProvider';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
  
  const { logout, user, getUserInfoByUid, getUserReclamationByUid } = useContext(AuthContext);
  const [usrInfo, setusrInfo] = useState(null);
  const [usrNewReclamation, setusrNewReclamation] = useState(null);
  const [usrReclamation, setusrReclamation] = useState(null);
  const [totalRecla, setTotalRecla] = useState(null);

  // informations sur les coordonnées du user
  const getAllInfo = async (uid) => {
    const usrInfos = await getUserInfoByUid(uid);
    setusrInfo(usrInfos);
  }
  useEffect(() => {
    getAllInfo(user.uid);
  }, []);

  // informations sur les reclamations de l'user et le nombre 
  const getAllReclamation = async (uid) => {
    const usrReclamations = await getUserReclamationByUid(uid);
    setusrReclamation(usrReclamations);
    await firestore()
      .collection('reclamations')
      .where("userId", "==", uid)
      .get()
      .then(function (querySnapShot) {
        setTotalRecla(querySnapShot.size);
      })
      console.log("nbr total des reserv de cet utilisateur est "+ totalRecla);
  }
  useEffect(() => {
    getAllReclamation(user.uid);
  }, []);

  return (  
    <SafeAreaView style={styles.container}>
      {usrInfo &&
        <View>
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Avatar.Image
              source={require('../assets/users/user-0.jpg')}
              size={80}
            />
            <View style={{ marginLeft: 20 }}>
              <Title style={[styles.title, {
                marginTop: 15,
                marginBottom: 5,
              }]}>{usrInfo['firstName']} {usrInfo['lastName']} </Title>         
              <Caption style={styles.caption}> {usrInfo['sexe']}</Caption>
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{usrInfo['city']}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{usrInfo['phoneNumber']}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="calendar" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{usrInfo['dateNaissance']}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="email" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{user.email}</Text>
          </View>
        </View> 
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>..</Title>
            <Caption>Réservations</Caption>
          </View>
          <View style={styles.infoBox}>
            {usrInfo && <Title>{totalRecla}</Title>}
            <Caption>Réclamations</Caption>
          </View>
      </View>
      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="heart-outline" color="#2E765E" size={25}/>
            <Text style={styles.menuItemText}>Mes appréciations</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color="#2E765E" size={25}/>
            <Text style={styles.menuItemText}>Mes paiements</Text>
          </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.menuItem}>
            <Icon name="file-edit" color="#2E765E" size={25}/>
            <Text style={styles.menuItemText}>Modifier mon profil</Text>
          </View>
          </TouchableRipple>
        <TouchableRipple onPress={() => {Alert.alert ('Contactez nous sur le numéro : +212 1234 5678', 'Ou par message en boîte de réclamations')}}>
          <View style={styles.menuItem}>
            <Icon name="phone" color="#2E765E" size={25}/>
            <Text style={styles.menuItemText}>Nous contacter</Text>
          </View>
          </TouchableRipple>
          <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color="#2E765E" size={25}/>
            <Text style={styles.menuItemText}>Partager avec mes amis</Text>
          </View>
        </TouchableRipple>
          <TouchableRipple onPress={() => logout()}>
          <View style={styles.menuItem}>
            <Icon name="lock-open" color="#2E765E" size={25}/>
            <Text style={styles.menuItemText}>Se déconnecter</Text>
          </View>
        </TouchableRipple>
      </View>  
      
      </View>      
      }
      </SafeAreaView>
  );
};
  
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },panel: {
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
  },panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});