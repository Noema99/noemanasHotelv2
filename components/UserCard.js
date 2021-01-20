import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  Container,
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
  Divider,
} from '../styles/FeedStyles';

const UserCard = ({item}) => {
  //likeIcon = item.liked ? 'heart' : 'heart-outline';
  //likeIconColor = item.liked ? '#2e64e5' : '#333';

  /*if (item.likes == 1) {
    likeText = '1 Like';
  } else if (item.likes > 1) {
    likeText = item.likes + ' Likes';
  } else {
    likeText = 'Like';
  }

  if (item.comments == 1) {
    commentText = '1 Comment';
  } else if (item.comments > 1) {
    commentText = item.comments + ' Comments';
  } else {
    commentText = 'Comment';
  }*/

  return (
    <Card>
      <UserInfo>
        <UserInfoText>
                   <UserName>{item.id}</UserName>
                  <UserName>{item.userId}</UserName>
                  <UserName>{item.firstName}</UserName>
                  <UserName>{item.lastName}</UserName>
                  <UserName>{item.sexe}</UserName>
                  <UserName>{item.dateNaissance}</UserName>
                  <UserName>{item.city}</UserName>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.userId}</PostText>

    </Card>
  );
};

export default UserCard;
