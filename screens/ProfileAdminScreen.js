import React, {useContext, useState, useEffect} from 'react';
import { View,SafeAreaView,  StyleSheet, TouchableOpacity,TextInput,Alert } from 'react-native';

import firestore from '@react-native-firebase/firestore';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { AuthContext } from '../navigation/AuthProviderAdmin';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileAdminScreen = ({ navigation }) => {
  
  const { logout, admin, getAdminInfoByUid } = useContext(AuthContext);
  const [adminInfo, setadminInfo] = useState(null);
  const [totalRecla, setTotalRecla] = useState(null);
    const [totalReserv, setTotalReserv] = useState(null);
    const [totalChambres, setTotalChambres] = useState(null);
    const [totalUsers, setTotalUsers] = useState(null);

  // informations sur les coordonnées du user
  const getAllInfo = async (uid) => {
    const adminInfos = await getAdminInfoByUid(uid);
    setadminInfo(adminInfos);
  }
  useEffect(() => {
    getAllInfo(admin.uid);
  }, []);
 
    
    //reclamations totale
  const getAllReclamation = async () => {
    await firestore()
        .collection('reclamations')
        .orderBy('uid')
      .get()
      .then(function (querySnapShot) {
        setTotalRecla(querySnapShot.size);
      })
      console.log("nbr total des reclamations est "+ totalRecla);
  }
  useEffect(() => {
    getAllReclamation();
    
  }, []);
    
    // reservations 
    const getAllReservation = async () => {
        await firestore()
          .collection('reservations').orderBy('uid')
          .get()
          .then(function (querySnapShot) {
            setTotalReserv(querySnapShot.size);
          })
          console.log("nbr total des reserv est "+ totalReserv);
      }
      useEffect(() => {
        getAllReservation();
        
      }, []);
    
    //chambres 
    const getAllChambres = async () => {
        await firestore()
          .collection('chambres').orderBy('uid')
          .get()
          .then(function (querySnapShot) {
            setTotalChambres(querySnapShot.size);
          })
          console.log("nbr total des chambres est "+ totalChambres);
      }
      useEffect(() => {
        getAllChambres();
        
      }, []);
    
    // users
    const getAllUsers = async () => {
        await firestore()
          .collection('users').orderBy('uid')
          .get()
          .then(function (querySnapShot) {
            getAllUsers(querySnapShot.size);
          })
          console.log("nbr total des  utilisateurs est "+ totalUsers);
      }
      useEffect(() => {
        getAllUsers();
        
      }, []);


  return (  
    <SafeAreaView style={styles.container}>
      {adminInfo &&
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
              }]}>{adminInfo['firstName']} {adminInfo['lastName']} </Title>      
            </View>
          </View>
        </View>
        <View style={styles.userInfoSection}>
          <View style={styles.row}>
            <Icon name="map-marker-radius" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{adminInfo['role']}</Text>
          </View>
          <View style={styles.row}>
            <Icon name="phone" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{adminInfo['numTel']}</Text>
          </View>
         
          <View style={styles.row}>
            <Icon name="email" color="#2E765E" size={28}/>
            <Text style={{color:"#777777", marginLeft: 20}}>{admin.email}</Text>
          </View>
        </View> 
        <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>{totalReserv}</Title>
            <Caption>Réservations</Caption>
          </View>
          <View style={styles.infoBox}>
          <Title>{totalRecla}</Title>
            <Caption>Réclamations</Caption>
                  </View>
                  <View style={styles.infoBox}>
          <Title>{totalChambres}</Title>
            <Caption>Chambres</Caption>
          </View>
                  <View style={styles.infoBox}>
          <Title>{totalUsers}</Title>
            <Caption>Clients</Caption>
          </View>
      </View>
      <View style={styles.menuWrapper}>  
          <TouchableRipple onPress={() => logoutAdmin()}>
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
  
export default ProfileAdminScreen;

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