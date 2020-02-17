import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { fetchPostDetail } from '../../actions/PostActions';
import { calculateDynamicHeight } from '../../utils/functions';

class RecommendationItem extends Component {

  findHashTags = (tags) => {
    return `#${tags[0]} ${tags.length > 1 ? `#${tags[1]}` : ''} ${tags.length > 2 ? `#${tags[2]}` : ''}`
  }

  navigateToPost = () => {
    const { post } = this.props;
    const params = {
      slug: post.slug
    }
    this.props.fetchPostDetail(params);
    this.props.navigateToPost()
  }

  render() {
    const { post } = this.props;

    return (
      <TouchableOpacity style={styles.container} onPress={this.navigateToPost}>
        <Image
          style={[styles.postImage, { height: calculateDynamicHeight(post.height, post.width) }]}
          source={{ uri: post.sizes.full }}
        />
        <View style={styles.bottomView}>
          <Text style={styles.pointText}>{post.points} points</Text>
          <Text numberOfLines={1} style={styles.hashTag}>{this.findHashTags(post.tags)}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 16,
  },
  bottomView: {
    height: 36,
    backgroundColor: 'rgb(196, 33, 28)',
    padding: 8,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  pointText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1
  },
  hashTag: {
    color: '#fff',
    flex: 2,
    textAlign: 'right'
  }
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetail: (params) => dispatch(fetchPostDetail(params)),
  };
}

export default connect(null, mapDispatchToProps)(RecommendationItem);
