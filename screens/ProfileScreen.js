import React, {useContext} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';


import {
  Container,Card, UserInfo, UserImg, UserInfoText, UserName, PostTime, PostText
} from '../styles/FeedStyles';

const ProfileScreen = () => {
    const {user, logout} = useContext(AuthContext);

  return (
    <Container>
        <UserInfo>
            <UserImg source={require('../assets/users/user-1.jpg')} />
            <UserInfoText>
                <UserName>Noema benadada</UserName>
                <PostTime>4hours ago </PostTime>
            </UserInfoText>
        </UserInfo>
        <PostText>
          Hello from the other side
            Welcome your id is {user.uid} !! and your email is {user.email}
            <FormButton buttonTitle="Logout" onPress={() => logout()} />
        </PostText>

</Container>
    
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: '#333333'
  }
});
export default ProfileScreen;


