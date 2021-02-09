import React,{useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList ,Alert ,} from 'react-native';

import { AuthContext } from '../navigation/AuthProvider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome';
import { useTheme } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import { Container } from '../styles/ReservationsStyles';
import {
  Card,
  ReservationInfo,
  ReservationInfoText,
  ChambreImg,
  ChambreType,
  ChambreInfoText,
    NbrLit,
    GenreLit,
    PrixNuit,
    PrixTotal,
  Periode,
  DateDebut,NbrPersonne,
} from '../styles/ReservationsStyles';

const ReservationScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [reservations, setReservations] = useState(null);
  const [usrReservation, setusrReservation] = useState(null);
  const { logout, user, getUserInfoByUid, getUserReservationByUid } = useContext(AuthContext);
  const [usrInfo, setusrInfo] = useState(null);
  const [totalReserv, setTotalReserv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

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
  /*
           setTotalReserv(querySnapShot.size);
           console.log('Total reserv de ce user est  : '+ totalReserv );  
  */
 const fetchReservations= async (uid) => {
  try {
    const list = [];  
    await firestore()
      .collection('reservations')
      .where("userId", "==", uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const {
            type,
            chambreImg,
            nbrLit,
            genreLit,
            dateDebut,
            dateFin,
            nbrPersonnes,
            periode,
            prixNuit,
            prixTotal
          } = doc.data();
          list.push({
            id: doc.id,
            type,
            chambreImg,
            nbrLit,
            genreLit,
            dateDebut,
            dateFin,
            nbrPersonnes,         
            periode,
            prixNuit,
            prixTotal
          });
          
        });
        
      }); 
      setReservations(list);
    if (loading) {
      setLoading(false);
    }
   // console.log('Chambres: ', chambres);
  } catch (e) {
    console.log(e);
  }
};

useEffect(() => {
  fetchReservations(user.uid);
}, []);  

useEffect(() => {
  setTotalReserv;
}, [setTotalReserv]);
  
  
  const handleDelete = (reservID) => {
    Alert.alert(
      'Annuler cette réservation',
      'Vous en êtes surs ?',
      [
        {
          text: 'Annuler',
          onPress: () => console.log('reservation non annulee '),
          style: 'cancel',
        },
        {
          text: 'Confirmer',
          onPress: () => deleteReservation(reservID),
        },
      ],
      {cancelable: false},
    );
  };

 const deleteReservation = (reservID) => {
    console.log('reservID de cette reservation a supprimer est : ', reservID);
    firestore()
      .collection('reservations')
      .doc(prixTotal)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {
            reservID
          } = documentSnapshot.data();

          if (reservID != null) {
            const storageRef = storage().refFromURL(reservID);
            const reservIDREF = storage().ref(storageRef.fullPath);

            reservIDREF
              .delete()
              .then(() => {
                console.log(`cette reserv has been deleted successfully.`);
                deleteFirestoreData(reservID);
              })
              .catch((e) => {
                console.log('Error while deleting the resev. ', e);
              });
            // If the post image is not available
          } else {
            deleteFirestoreData(reservID);
          }
        }
      });
  };

  const deleteFirestoreData = (reservID) => {
    firestore()
      .collection('reservations')
      .doc(reservID)
      .delete()
      .then(() => {
        Alert.alert(
          'Reservation bien annulee et suprrimee',
          'a la prochaine !!',
        );
        setDeleted(true);
      })
      .catch((e) => console.log('Error deleting posst.', e));
  };

  const ListHeader = () => {
    return null;
  };
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
            <FontAwesome5.Button
              name="plus"
              size={24}
              backgroundColor="#fff"
              color="#2E765E"
                onPress={() => navigation.navigate('Chambres')}
               marginLeft= {50}
            />
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
                renderItem={({item}) =>(
                  <TouchableOpacity onPress={()=> handleDelete()} >
                    <Card key={item.prixTotal}  >
                      <ReservationInfo> 
                        <ChambreImg source={{ uri : item.chambreImg}} />
                        <ReservationInfoText>
                            <ChambreType onPress={() => {}}>C'est une chambre {item.type}</ChambreType>
                            <NbrLit>{item.nbrLit} lit(s)</NbrLit>
                            <GenreLit>De type {item.genreLit}</GenreLit>
                            <NbrLit>Prix <PrixNuit> {item.prixNuit} DHS/nuit</PrixNuit></NbrLit>
                            <NbrLit>Periode de <Periode> {item.periode} jours</Periode></NbrLit>
                            <NbrLit>Première date  <DateDebut> {item.dateDebut} </DateDebut></NbrLit>
                            <NbrLit>Vous serez  <NbrPersonne> {item.nbrPersonnes} </NbrPersonne>personnes </NbrLit>
                            <NbrLit>Prix total : <PrixTotal> {item.prixTotal} MAD</PrixTotal></NbrLit>
                            <NbrLit>Paiement à l'accueil ! </NbrLit>               
                        </ReservationInfoText>
                      </ReservationInfo> 
                    </Card>
                  </TouchableOpacity>)}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListHeader}
                keyExtractor={(item) => item.prixTotal}
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
    // shadowOffset: {wprixTotalth: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {wprixTotalth: -1, height: -3},
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
    wprixTotalth: 40,
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
    borderBottomWprixTotalth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    
  },action1: {
    flexDirection: 'row',
    marginTop: 50,
    marginBottom: 10,
    borderBottomWprixTotalth: 0,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 10,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWprixTotalth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
      color: '#05375a',
      borderWprixTotalth: 0,
    
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
    borderBottomWprixTotalth: 1,
    borderTopColor: '#dddddd',
    borderTopWprixTotalth: 1,
    flexDirection: 'row',
    height: 100,  
    marginTop: 35,
  },
  infoBox: {
    wprixTotalth: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft:120,
  
  },
});