import React, { PureComponent } from 'react';
import {Share, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import { Ionicons } from '@expo/vector-icons';

class Social extends PureComponent {
  constructor(props) {
    super(props);
  }

  share() {
    const { slug } = this.props;

    Share.share({
      title: 'Share',
      message: "https://www.kontraband.com/post/" + slug
    }).then((res) => console.log(res))
      .catch((error) => console.log(error))
  }

  onPress = () => this.share()

  render() {
    return (
      <TouchableOpacity style={[styles.btnContainer, this.props.style]} onPress={this.onPress}>
        <Ionicons name="md-share" size={20} color={'#ffffff'} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btnContainer : {
    width : 40,
    height : 40,
    marginRight : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : '#dbdbdb'
  },
  share: {
    flexDirection: 'row',
    width: 70,
    marginTop: 10
  },
  shareText: {
    paddingLeft: 5,
    paddingTop: 3,
    fontSize: 15,
    color: '#262424'
  }
});

export default Social;


