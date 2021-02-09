import React,{useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity,TextInput,Alert } from 'react-native';

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
import {
  Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText
} from '../styles/FeedStyles';

const ReclamationScreen =() => {
  const { colors } = useTheme();
  const [typeRec, setTypeRec] = useState(null);
  const [reclamation, setReclamation] = useState(null);
  const [usrReclamation, setusrReclamation] = useState(null);
  const { logout, user, getUserInfoByUid, getUserReclamationByUid } = useContext(AuthContext);
  const [usrInfo, setusrInfo] = useState(null);
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
      console.log("nbr total des recla de cet utilisateur est "+ totalRecla);
  }
  useEffect(() => {
    getAllReclamation(user.uid);
    
  }, []);
  
  // renvoyer les données à propos dela reclamation 
  const submitReclamation = async () => {
    firestore()
    .collection('reclamations')
    .doc()
    .set({
      userId : user.uid,
      typeRec: typeRec,
      reclamation: reclamation,
    })
    .then(() => {
        console.log('reclamation envoyée');
        Alert.alert(
                  'Message envoyé',
                  'Merci pour votre confiance et temps ',
        );
        setTypeRec(null);
    })
    .catch((error) => {
      console.log('Something went wrong with added reclamation to firestore.', error);
    })
         
  }
  useEffect(() => {
    setTotalRecla;
  }, [setTotalRecla]);


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
                <Caption style={styles.caption}> {usrInfo['sexe']}</Caption>
              </View>
            </View>
          </View>
          <View style={styles.infoBoxWrapper}>
           
            <View style={styles.infoBox}>
              {usrInfo && <Title>{totalRecla}</Title>}
              <Caption>Réclamations</Caption>
            </View>
          </View>
          <View style={styles.reclamation}>
            <Text style={styles.text}>Partagez vos réclamations</Text>
            <View style={styles.action1}>
                    <FontAwesome name="bell-o" color={colors.text} size={20} />
                    <SelectInput   
                      placeholder="Type de votre réclamation"
                      placeholderTextColor="#666666"
                      autoCorrect={false}
                      value={typeRec}
                      onChange={(value) => setTypeRec(value)}  
                      valueStyle={[
                      styles.textInput,
                      {color: colors.text,border:0,},                        
                      ]}
                      options={[{
                          value: 'value1',
                          label: 'Annulation',
                      },{
                          value: 'value2',
                          label: 'Modification',
                      },{
                          value: 'value3',
                          label: 'Commentaire',
                      },{
                          value: 'value3',
                          label: 'Autre',
                      }]}       
                    />
            </View>     
            <View style={styles.action}>
            <FontAwesome name="bullhorn" color={colors.text} size={20} />
              <TextInput
                placeholder="Votre réclamation ici"
                        placeholderTextColor="#666666"
                      // numberOfLines={5}
                autoCorrect={false}
                value={reclamation}
                onChangeText={(content) => setReclamation(content)}               
                style={[
                  styles.textInput,
                  {color: colors.text,},
                ]}
              />
            </View>
            <TouchableOpacity style={styles.commandButton} onPress={() => submitReclamation()}>
              <Text style={styles.panelButtonTitle}>Envoyer</Text>
            </TouchableOpacity>
          </View>
        </View>
      }
   </Container>
);
};

export default ReclamationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    },
    reclamation: {
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