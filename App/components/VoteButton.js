import React, { PureComponent } from "react";
import { FontAwesome } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from "react-native";

export default class VoteButton extends PureComponent
{
  static defaultProps = {
    bgColor : '#dbdbdb'
  }
  constructor(props){
    super(props);
  }


  onVote = () => {
    if(this.props.active)
      return;

    this.props.onVote()
  }
  
  render(){

    return (
      <TouchableOpacity style={[styles.vote, {backgroundColor : this.props.bgColor}]} onPress={this.onVote}>
        <FontAwesome name={ this.props.up ? 'caret-up' : 'caret-down' } size={25} color="#fff" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  vote: {
    width: 40,
    height: 40,
    alignItems: 'center',
    paddingTop: 5,
    marginRight: 2
  }
});