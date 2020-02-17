import React from "react";
import { Image, TouchableOpacity, View } from "react-native";

import styles from './styles';
import { withNavigation } from 'react-navigation';

const HeaderBar = props => {
  return (
    <View style={styles.headerMain}>
      <View style={styles.headerView}>
        <TouchableOpacity onPress={() => props.pressDrawer()}>
          <Image
            style={styles.drawerImage}
            source={require("../../assets/images/drawer.png")}
          />
        </TouchableOpacity>
        <Image
          style={[styles.crossImage, styles.logo]}
          source={require("../../assets/images/Logo.png")}
        />
      </View>
    </View>
  );
};

export default withNavigation(HeaderBar);