import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function FollowTag({isMoreBtn = false, item, onFollow, onPressMoreBtn }) {
  const handlePress = () => {
    onFollow(item.name);
  }

  const handlePressMoreBtn = () => {
    onPressMoreBtn();
  }

  if(isMoreBtn)
    return (
      <TouchableOpacity style={styles.blackContainer} onPress={handlePressMoreBtn}>
        <Text style={styles.txt}>GET MORE TAGS</Text>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>#{item.name}</Text>
      <TouchableOpacity onPress={handlePress}>
        <FontAwesome5 name="times" color="#fff" size={15}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    paddingVertical : 5,
    paddingHorizontal : 10,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    backgroundColor : '#c4201b',
    marginRight : 15
  },
  blackContainer : {
    paddingVertical : 5,
    paddingHorizontal : 10,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    backgroundColor : '#3a0000',
    marginRight : 15
  },
  txt : {
    fontWeight : 'bold',
    color : '#fff',
    marginRight : 6
  }
});