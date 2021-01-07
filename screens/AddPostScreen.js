import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const AddPostScreen = () => {
    return (
      <View style={styles.container}>
        <Text>AD post  Screen</Text>
        <Button
          title="Click Here"
          onPress={() => alert('Button Clicked!')}
        />
      </View>
    );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});