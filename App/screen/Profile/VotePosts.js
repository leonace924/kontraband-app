import React, { Fragment } from "react";
import { View, Text } from "react-native";

import styles from './styles';
import PostList from "../Home/PostList";
import CommonStyles from '../../utils/styles';

export default class VotePosts extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={[CommonStyles.titleTxt, CommonStyles.centerTxt, CommonStyles.textTransformNone]}>Your liked Posts</Text>
        <PostList
          fetchPosts={this.props.fetchPosts}
          params={{ page: 0 }}
          posts={this.props.posts} />
      </View>
    );
  }
}
