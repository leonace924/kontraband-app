import React, { Component } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { updateFollowing, fetchFollowing } from '../../actions/ProfileActions';

class TagItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      following: props.followed
    }
  }

  navigateToTag = (tag) => {
    this.props.navigateToTag(tag)
  }

  componentDidUpdate(prevProps) {
    if (this.props.followed !== prevProps.followed) {
      this.setState({ following: this.props.followed })
    }
  }

  onFollow = () => {
    if (this.props.isSignedIn) {
      this.setState({ following: !this.state.following })
      this.props.updateFollowing(this.props.tag.name)
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.updateFollowingSucceed !== prevProps.updateFollowingSucceed) {
      this.props.fetchFollowing()
    }
  }

  render() {
    const { tag } = this.props;
    return (
      <TouchableOpacity style={styles.item} onPress={() => this.navigateToTag(tag.name)}>
        <ImageBackground style={styles.image} source={{ uri: tag.preview.sizes.small }}>
          <AntDesign
            onPress={() => this.onFollow()}
            style={styles.followIcon}
            name={this.state.following ? "star" : "staro"} size={24}
            color='#c4201b'
          />
        </ImageBackground>
        <View style={styles.bottom}>
          <Text style={styles.name}>#{tag.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    height: 32,
    backgroundColor: '#c4201b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: '#fff',
  },
  listPopular: {
    flex: 1
  },
  item: {
    width: '44%',
    margin: '3%',
    borderColor: '#191313',
    borderWidth: 1,
    borderRadius: 3
  },
  image: {
    resizeMode: 'stretch',
    width: '100%',
    height: 180,
    alignItems: 'flex-end'
  },
  followIcon: {
    padding: 10,
  },
  top: {
    alignItems: 'flex-end'
  }
})

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  updateFollowingSucceed: state.Profile.updateFollowingSucceed
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateFollowing: (tag) => dispatch(updateFollowing(tag)),
    fetchFollowing: () => dispatch(fetchFollowing())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TagItem);