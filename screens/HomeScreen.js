
import React, { useEffect, useState, useContext } from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, Alert} from 'react-native';


import UserCard from '../components/UserCard';

import {AuthContext}   from '../navigation/AuthProvider';
import firestore from '@react-native-firebase/firestore';

import {
    Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText
  } from '../styles/FeedStyles';
  
const HomeScreen = ({userId} ) => {
  //const [posts, setPosts] = useState(null);
  //const [users, setUsers] = useState(null);

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
      <View>
        {usrInfo && <Text >Bienvenue : {usrInfo['lastName']} </Text>}
       </View>
      );
    };
    
    export default HomeScreen;  