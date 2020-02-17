import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions, TextInput, FlatList, TouchableOpacity, Platform } from 'react-native';

import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import CommonStyles from '../../utils/styles';
import { FontAwesome } from '@expo/vector-icons';
import { fetchComments, postComment } from '../../actions/PostActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { tracking } from '../../utils/functions';
import { ThemeContext } from "../../context";

class CommentList extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      slug: null
    },
      this.isIOS = Platform.OS === 'ios'
  }

  componentDidMount() {
    const { slug } = this.props.navigation.state.params;
    this.setState({ slug })
    this.props.fetchComments({ slug, page: 1, limit: 20, start: 0 })
    tracking('CommentList');
  }

  navigateToHome = () => {
    this.props.fetchComments({ page: 1, limit: 20, start: 0 })
    this.props.navigation.goBack()
  }

  _keyExtractor = (item, index) => `${index} + ${item.id}`;

  _renderItem = ({ item, index }) => (
    <CommentItem
      item={item}
    />
  );

  postComment = () => {
    const { comment, slug } = this.state;
    if (comment.length <= 3) {
      alert('Min length is 4 characters');
    }
    this.props.postComment({ id: slug, comment: { body: comment } })
    this.setState({ comment: '' })
  }

  componentDidUpdate(prevProps) {
    if (this.props.postCommentSucceed !== prevProps.postCommentSucceed) {
      this.props.fetchComments({ slug: this.state.slug, page: 1, limit: 20, start: 0 })
    }
  }

  render() {
    const { comment } = this.state;

    return (
      <ThemeContext.Consumer>
        {
          ({ theme }) => (
            <SafeAreaView style={CommonStyles[`${theme}__container`]}>
              <KeyboardAwareScrollView enableOnAndroid extraScrollHeight={this.isIOS ? 24 : 220} style={CommonStyles.containerKeyboard}>
                <View style={[styles.topView, !this.isIOS && styles.topViewAndroid]}>
                  <View style={styles.rightTop}></View>
                  <Text style={styles.title} >COMMENTS</Text>
                  <View style={styles.back}>
                    <FontAwesome name='close' size={25} color='#000' onPress={this.navigateToHome} />
                  </View>
                </View>
                <View style={styles.inputView}>
                  <View style={styles.searchSection}>
                    <TextInput
                      style={styles.input}
                      placeholder="Your comment"
                      value={comment}
                      onChangeText={(comment) => { this.setState({ comment }) }}
                      underlineColorAndroid="transparent"
                    />
                    <TouchableOpacity onPress={this.postComment}>
                      <Text style={[styles.searchIcon, comment.length > 3 ? styles.activePost : styles.inActivePost]}>Post</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {
                  this.props.comments &&
                    (this.props.comments.comments && this.props.comments.comments.length > 0)
                    ? <FlatList
                      style={[styles.list, { height: Dimensions.get('window').height - 136 }]}
                      data={this.props.comments ? this.props.comments.comments : []}
                      keyExtractor={this._keyExtractor}
                      renderItem={this._renderItem}
                    />
                    : <View style={[styles.list, { height: Dimensions.get('window').height - 136 }]}>
                      <Text style={styles.announce}>No comments yet</Text>
                    </View>
                }
              </KeyboardAwareScrollView>
            </SafeAreaView >
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  topView: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 36,
  },
  topViewAndroid: {
    marginTop: 36
  },
  list: {
  },
  back: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 16
  },
  rightTop: {
    flex: 1
  },
  title: {
    flex: 3,
    textAlign: 'center',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 8
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgb(219, 219, 219)',
    height: 48,
    borderRadius: 3
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    color: '#424242',
    paddingLeft: 12
  },
  activePost: {
    color: 'rgb(196, 33, 28)'
  },
  inActivePost: {
    color: '#ef9a9a'
  },
  myAvatar: {
    height: 48,
    width: 48,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 24,
    marginRight: 16
  },
  inputView: {
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16
  },
  announce: {
    margin: 12
  }
})

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  comments: state.Post.comments,
  postCommentSucceed: state.Post.postCommentSucceed,
  userDetail: state.Profile.userDetail
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (slug) => dispatch(fetchComments(slug)),
    postComment: (params) => dispatch(postComment(params))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);;