
import { AuthContext } from '../navigation/AuthProvider';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet, Text,TouchableOpacity
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ChambreCard from '../components/ChambreCard';
import {Container} from '../styles/ChambresStyles';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChambresScreen = ({navigation}) => {
    const [chambres, setChambres] = useState(null);
  const [loading, setLoading] = useState(true);  
  
    const fetchChambres = async () => {
        try {
          const list = [];  
          await firestore()
            .collection('chambres')
            .orderBy('type','desc')
            .get()
            .then((querySnapshot) => {
               console.log('Total Chambres disponibles : ', querySnapshot.size); 
               querySnapshot.forEach((doc) => {
                const {
                  type,
                  chambreImg,
                  nbrLit,
                  genreLit,
                  salleBain,
                  cheminee,
                  balcon,
                  prixNuit,
                  reduction
                } = doc.data();
                list.push({
                  id: doc.id,
                  type,
                  chambreImg,
                  nbrLit,
                  genreLit,
                  salleBain,
                  cheminee,
                  balcon,
                  prixNuit,
                  reduction,
                });
              });
              
            }); 
          setChambres(list);
          if (loading) {
            setLoading(false);
          }
         // console.log('Chambres: ', chambres);
        } catch (e) {
          console.log(e);
        }
      };
    
      useEffect(() => {
        fetchChambres();
      }, []);  
  
  const reserverChambre = (item) => {
    
      navigation.navigate('Reserver', {
        selectedChambre: item,
      });
    
  };

      return (    
            <Container>
              <FlatList
                data={chambres}
            renderItem={({ item }) => (<TouchableOpacity onPress={() => {
              navigation.navigate('Reserver', { selectedChambre: item });
              console.log(item.prixNuit);
            }}><ChambreCard item={item} 
                /></TouchableOpacity>)}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}   
              />
            </Container>
       
  );
};
/*

            <FontAwesome5.Button
              name="plus"
              size={12}
              backgroundColor="#f8f8f8"
              color="#2E765E"
              onPress={() => {
              navigation.navigate('Reserver', {
                selectedChambre: item
              });
            }}
            />
*/
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

export default ChambresScreen;  
    