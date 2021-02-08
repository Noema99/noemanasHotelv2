import React from 'react';

import {
  Card,
  UserInfo,
  UserImg,
  UserName,
  UserInfoText,
  PostTime,
  PostText,
  PostImg,
  Divider,
} from '../styles/FeedStyles';

const PostCard = ({item}) => {
  return (
    <Card key={item.id}>
      <UserInfo>
      <UserImg source={ item.userImg} />
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          <PostTime>{item.postTime.toString}</PostTime>
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != null ? <PostImg source={item.postImg} /> : <Divider />}
    </Card>
  );
};

export default PostCard;
