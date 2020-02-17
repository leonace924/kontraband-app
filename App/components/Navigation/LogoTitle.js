import React from 'react';
import {
  View, Image, StyleSheet, TouchableWithoutFeedback
} from 'react-native';
import { withNavigation } from 'react-navigation';


class LogoTitle extends React.Component {
  render() {
    return (
      <View style={styles.logoWrapper}>
        <TouchableWithoutFeedback onPress={() => this.props.navigation.navigate('Home', {refresh: true})}>
          <Image
            source={require('../../assets/images/menu_logo_over.png')}
            style={styles.logo}
          />
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default withNavigation(LogoTitle)

const styles = StyleSheet.create({
  logoWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 30,
    marginBottom: 10
  }
});