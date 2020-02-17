import React from "react";
import { ActivityIndicator, Dimensions, View, StyleSheet } from 'react-native';

const Loader = () => (
  <View style={styles.mainContainer}>
    <ActivityIndicator size='small' color='#c4201b' />
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000020',
    position: 'absolute',
    zIndex: 5
  }
});

export default Loader;