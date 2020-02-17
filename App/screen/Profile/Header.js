import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import styles from './styles';
import { withNavigation } from 'react-navigation';

const Header = props => {
  return (
    <View style={styles.headerMain}>
      <View style={styles.headerBar}>
        <Text style={[styles.logInText, styles.profileTxt]}>Profile</Text>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            style={[styles.crossImage, styles.btnBack]}
            source={require("../../assets/images/Cross.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerImageView}>
        <View style={styles.imageView}>
          <Image
            style={styles.tack}
            source={require("../../assets/images/rechtack156.png")}
          />
          <Image
            style={[styles.crossImage, styles.cameraImage]}
            source={require("../../assets/images/camera.png")}
          />
        </View>
        <Text style={styles.userName}>{props.userDetail.username}</Text>
      </View>
    </View>
  );
};

export default withNavigation(Header);