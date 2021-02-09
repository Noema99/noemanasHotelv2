import React,{useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import SelectInput from '@tele2/react-native-select-input';
import firestore from '@react-native-firebase/firestore';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import {Container} from '../styles/FeedStyles';

const ReservationScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [typeRec, setTypeRec] = useState(null);
  const [reservation, setReservation] = useState(null);
  const [usrReservation, setusrReservation] = useState(null);
  const { logout, user, getUserInfoByUid, getUserReservationByUid } = useContext(AuthContext);
  const [usrInfo, setusrInfo] = useState(null);
  const [totalReserv, setTotalReserv] = useState(null);

  // informations sur les coordonnées du user
    const getAllInfo = async (uid) => {
      const usrInfos = await getUserInfoByUid(uid);
      setusrInfo(usrInfos);
    }
    useEffect(() => {
      getAllInfo(user.uid);
    }, []);
  
  // informations sur les reservations de l'user et le nombre 
  const getAllReservations = async (uid) => {
    const usrReservation = await getUserReservationByUid(uid);
    setusrReservation(usrReservation);
    await firestore()
      .collection('reservations')
      .where("userId", "==", uid)
      .get()
      .then(function (querySnapShot) {
        setTotalReserv(querySnapShot.size);
      })
      console.log("nbr total des reserv de cet utilisateur est "+ totalReserv);
  }
  useEffect(() => {
    getAllReservations(user.uid);  
  }, []);
      
  
  useEffect(() => {
    setTotalReserv;
  }, [setTotalReserv]);


  return (
    <Container> 
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
              </View>
            </View>
          </View>
          <View style={styles.infoBoxWrapper}>
           
            <View style={styles.infoBox}>
              {usrInfo && <Title>{totalReserv}</Title>}
              <Caption>Réservations</Caption>
            </View>
        </View>


         <View >
            <Container>
              <FlatList
                data={reservations}
                renderItem={({item}) => (
                  <ChambreCard item={item} />
                )}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
              />
            </Container>
        </View>
        

          <View >
            <Text style={styles.text}>Faites votre réservation dès maintenant!</Text>
            <TouchableOpacity style={styles.commandButton} onPressonPress={() => navigation.navigate('Chambres')}>
              <Text style={styles.panelButtonTitle}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
   </Container>
);
};

export default ReservationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
  reservation: {
        marginTop: 75,
        flex:2/3,
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
    paddingBottom: 10,
    
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    
  },action1: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 10,
    borderBottomWidth: 0,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 10,
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
      borderWidth: 0,
    
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
    },
    text: {
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: '#2E765E',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
    
  },infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,  
    marginTop: 35,
  },
  infoBox: {
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:120,
  
  },
});