
import { AuthContext } from '../navigation/AuthProvider';
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  FlatList,
  SafeAreaView,
  StyleSheet, Text
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import ChambreCard from '../components/ChambreCard';
import {Container} from '../styles/ChambresStyles';


const ChambresScreen = () => {
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

      return (    
            <Container>
              <FlatList
                data={chambres}
                renderItem={({item}) => (
                  <ChambreCard item={item} />
                )}
                keyExtractor={(item) => item.id}
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

export default ChambresScreen;  
    