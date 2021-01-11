import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, SafeAreaView, Alert} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';


import {
    Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText
  } from '../styles/FeedStyles';
  
 
  
  const HomeScreen = () => {
    return (
       
        <Container>
            <Card>
                <UserInfo>
                    <UserImg source={require('../assets/users/user-3.jpg')} />
                    <UserInfoText>
                        <UserName>Noema benadada!!</UserName>
                        <PostTime>4hours ago </PostTime>
                    </UserInfoText>
                </UserInfo>
                <PostText>Hello from the other side </PostText>
            </Card>
        
        </Container>
      );
    };
    
    export default HomeScreen;  