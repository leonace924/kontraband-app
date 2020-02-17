import React from "react";
import { View, Image, StyleSheet } from "react-native";

const GOLDEN_ICON = require('../assets/images/golden-icon.png');
const SILVER_ICON = require('../assets/images/silver-icon.png');

export default function PostIcon({points, ...props}){
  let src = null;

  if(points > 50)
    src = SILVER_ICON;
  
  if(points > 100)
    src = GOLDEN_ICON;
  
  return src ? <View style={[styles.postIcon, props.style]}><Image style={[styles.postIconImage, {height : props.size, width : props.size}]} source={src}/></View> : null;
}

const styles = StyleSheet.create({
  postIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  postIconImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain'
  },
});