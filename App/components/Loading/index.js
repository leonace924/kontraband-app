import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';

export default class Loading extends Component {

  static loading;

  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  show() {
    this.setState({ show: true });
  }

  hide() {
    this.setState({ show: false });
  }

  render() {
    return (
      this.state.show &&
      <View style={style.container} >
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#c4201b" />
        </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
  flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    zIndex: 999,
  },
  loadingContainer: {
    width: 50,
    height: 50,
    marginTop: Dimensions.get('window').width / 3,
    borderRadius: 50 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
