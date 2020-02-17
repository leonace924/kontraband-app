import React from "react";
import { View, Text, AsyncStorage } from "react-native";
import CommonStyles from "../../utils/styles";
import VoteButton from "../../components/VoteButton";
import styles from "./styles";
import { apiFetch } from '../../utils/network';

export default class VoteArea extends React.PureComponent
{
  constructor(props){
    super(props);
    this.state = {
      points : props.points,
      active : null
    }
  }

  componentDidMount(){
    AsyncStorage.getItem(`@post${this.props.slug}`).then( like => {
      if(like) this.setState({active : like == 'like'});
    });
  }

  onVoteLike = async () => {
    try {
      await AsyncStorage.setItem(`@post${this.props.slug}`, 'like');
      this.onVote('like');
    } catch (error) {
      
    }
  }

  onVoteDisLike = async () => {
    try {
      await AsyncStorage.setItem(`@post${this.props.slug}`, 'dislike');
      this.onVote('dislike');
    } catch (error) {
      
    }
  }

  onVote = (type) => {
    const parameters = `vote/${this.props.slug}/${type}?`
    apiFetch(parameters, '')
      .then(resp => resp.json())
      .then(result => {
        this.setState({ points: result.points, active : type == 'like' })
      })
      .catch(err => {
      })
  }

  render(){
    return (
      <View style={[CommonStyles.flexOneRowStart]}>
        <VoteButton up onVote={this.onVoteLike} active={this.state.active} bgColor={this.state.active === true? '#b9f8bc' : '#dbdbdb'}/>
        <VoteButton up={false} onVote={this.onVoteDisLike} active={!this.state.active} bgColor={this.state.active === false ? '#f8b9b9' : '#dbdbdb'}/>
        <Text style={styles[`${this.props.theme}__countText`]}>+{this.state.points}</Text>
      </View>
    );
  }
}
