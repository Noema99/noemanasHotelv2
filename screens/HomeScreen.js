
import { AuthContext } from '../navigation/AuthProvider';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet, Text
} from 'react-native';

import PostCard from '../components/PostCard';
import {Container} from '../styles/FeedStyles';

const Posts = [
  {
    id: '9',
    userName: "Vue d'accueil",
    userImg: require('../assets/camp8.jpg'),
    postTime: '2 days ago',
    post:
      'Bien rester au chaud malgré le froid de la campagne ',
    postImg: require('../assets/camp8.jpg')
  },
    {
      id: '1',
      userName: "Salle d'attente",
      userImg: require('../assets/camp1.jpg'),
      postTime: '4 mins ago',
      post:
        'Cheminée, connexion WiFi gratuite ,',
      postImg: require('../assets/camp1.jpg')

    },
    {
      id: '2',
      userName: 'Air frai',
      userImg: require('../assets/camp2.jpg'),
      postTime: '2 hours ago',
      post:
        'Une vue pittoresque sur notre jardin, sur toute la    nature pour déguster votre café',
      postImg:require('../assets/camp2.jpg')
  
  },
  {
    id: '3',
    userName: 'Une belle lumière naturelle',
    userImg: require('../assets/mario4.jpg'),
    postTime: '2 days ago',
    post:
      "Une cheminée dans la chambre aussi à  la place d'un réchaux? pourquoi pas!",
    postImg: require('../assets/mario4.jpg')
  },
    {
      id: '4',
      userName: 'Restauration au calme',
      userImg: require('../assets/camp4.jpg'),
      postTime: '1 hours ago',
      post:
        'Petit déjeuner riche et surtout GRATUIT, les autres repas sont à réserver',
      postImg: require('../assets/camp4.jpg')

    },
    {
      id: '5',
      userName: 'Chambre à deux personnes',
      userImg: require('../assets/camp3.jpg'),
      postTime: '1 day ago',
      post:
        'Chambre à lits séparés, avec ou sans un balcon, décoration raffinée',
      postImg: require('../assets/camp3.jpg')
 
    },
    
    {
      id: '6',
      userName: 'Petite suite confortable',
      userImg: require('../assets/camp5.jpg'),
      postTime: '2 days ago',
      post:
        'Suite bien large, lit avec surmatelas, décoration artisanale, salle de bain bien parfumée',
      postImg: require('../assets/camp5.jpg')
  },
  {
    id: '7',
    userName: 'Chambre à deux personnes ',
    userImg: require('../assets/camp6.jpg'),
    postTime: '2 days ago',
    post:
      'Chambre à lit double pour Vous!',
    postImg: require('../assets/camp6.jpg')
  },
  {
    id: '8',
    userName: 'Canapés pour plus de repos',
    userImg: require('../assets/camp7.jpg'),
    postTime: '2 days ago',
    post:
      "Parce que la chambre ne dépend pas que d'un lit",
    postImg: require('../assets/camp7.jpg')
  },
  {
    id: '10',
    userName: 'Salle de bain traditionnelle',
    userImg: require('../assets/camp10.jpg'),
    postTime: '2 days ago',
    post:
      "Et un bain très équipé et chaud pour bien raffraichir son mood?",
    postImg: require('../assets/camp10.jpg')
  },

];

const HomeScreen = () => {
  
  const { logout, user, getUserInfoByUid } = useContext(AuthContext);
  const [usrInfo, setusrInfo] = useState(null);

  const getAllInfo = async (uid) => {
    const usrInfos = await getUserInfoByUid(uid);
    setusrInfo(usrInfos);
    console.log('the object gotten is ' + console.log(JSON.stringify(usrInfo)));
  };
  useEffect(() => {
    getAllInfo(user.uid);
  }, []);

  return (
    <Container>
      {usrInfo &&
        <View>
          <Text style={styles.navButtonText} >
          Bienvenue cher(e) <Text style={[styles.color_textPrivate, { color: '#e88832' }]}>{usrInfo['firstName']}</Text> parmi nous!
          </Text>     
        </View>
      } 
          <FlatList
            data={Posts}
            renderItem={({item}) => (
              <PostCard item={item} />
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </Container>
  );
};

const styles = StyleSheet.create({
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2E765E',
    fontFamily: 'Lato-Regular',
    
  },
  color_textPrivate: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
});

export default HomeScreen;  
    
//hadi khdama katbyn poste mais makatjibsh ma3loumat ... à chercher !!