import React from "react";
import styles from './styles'
import { Image, View } from "react-native";

export default class Splash extends React.PureComponent {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image
          style={styles.logoImage}
          source={require("../../assets/images/Logo.png")}
        />
      </View>
    );
  }
}
