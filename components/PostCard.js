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

const PostCard = ({item}) => {
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
      <UserImg source={{uri: item.userImg}} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <UserName>{item.userId}</UserName>
          <PostTime>{item.postTime.toString}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? <PostImg source={{uri: item.postImg}} /> : <Divider />}

     
    </Card>
  );
};

export default PostCard;
