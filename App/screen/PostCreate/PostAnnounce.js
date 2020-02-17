import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

class PostAnnounce extends Component {
  navigateToHome = () => {
    this.props.navigateToHome()
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../assets/images/check.png')} style={styles.check} resizeMode='contain' />
        <Text style={styles.txt}>THANK YOU</Text>
        <Text style={styles.txt}>WE WILL REVIEW</Text>
        <Text style={[styles.txt, styles.textUpload]}>YOUR UPLOAD SOON</Text>
        <TouchableOpacity style={styles.btn} onPress={this.navigateToHome}>
          <Text style={styles.txtBtn}>BACK TO KONTRABAND</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  check: {
    width: 152,
    height: 152,
    marginTop: '24%',
    marginBottom: 8
  },
  txt: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: 'rgb( 196, 33, 28)',
    width: '70%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBtn: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  textUpload: {
    marginBottom: '36%'
  }
})

export default PostAnnounce;