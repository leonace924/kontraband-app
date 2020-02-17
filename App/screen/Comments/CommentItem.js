import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
const PROFILE_ICON = require('../../assets/images/profile_icon.png');
class CommentItem extends Component {

  shouldComponentUpdate(nextProps){
    return this.props.item.id != nextProps.item.id;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageView}>
          {
            this.props.item.user !== undefined && 
            <Image
              source={{ uri: this.props.item.user.avatar }}
              style={styles.image}
            />
          }
          {
            this.props.item.user == undefined && 
            <View style={styles.ava}>
              <FontAwesome5 name={'user-ninja'} size={22} color="#c4201b"/>
            </View>
          }
        </View>
        <View style={styles.content}>
          <Text style={styles.name}>{this.props.item.user !== undefined ? this.props.item.user.username : 'Anonymous'}</Text>
          <Text style={styles.text}>{this.props.item.body}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ava : {
    borderColor : '#c4201b',
    borderWidth : 1,
    width : 48,
    height : 48,
    borderRadius : 24,
    justifyContent : 'center',
    alignItems : "center"
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 12,
    marginTop: 8
  },
  imageView: {
    flex: 1,
    alignItems : 'center',
    justifyContent : 'center'
  },
  content: {
    flex: 7,
    paddingLeft: 12
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'gray'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14
  },
  text: {
    fontSize: 14,
    color: 'rgb(134, 134, 134)'
  }
})

export default CommentItem;