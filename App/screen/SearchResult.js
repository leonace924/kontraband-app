import React from "react";
import {Text, View, StyleSheet, SafeAreaView, TouchableOpacity} from "react-native";
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';

import {apiFetch} from '../utils/network';
import {constants} from "../constants";
import {ThemeContext} from "../context";
import CommonStyles from "../utils/styles";
import PostList from "./Home/PostList";
import LoadingHolder from '../components/Loading/LoadingHolder';
import {tracking} from '../utils/functions';

class SearchResult extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tgs: [],
      posts: [],
      searchStr: ''
    }
    this.loading = LoadingHolder.getLoading();
  }

  componentDidMount() {
    const searchStr = this.props.navigation.getParam('searchStr', '');
    this.loading.show();
    apiFetch(`search?query=${searchStr}&page=1`, constants.accessToken).then(async (resp) => {
      const searchRes = await resp.json();
      this.loading.hide();
      const tgs = searchRes.tags != undefined ? searchRes.tags : [];
      const posts = searchRes.posts != undefined ? searchRes.posts : [];
      this.setState({tgs, posts, searchStr});
    }).catch(() => {
      this.loading.hide();
    });
    tracking('SearchResult');
  }

  navigateToTag = (tag) => {
    this.props.navigation.navigate('Home',
      {
        fromTags: true,
        refresh: false,
        params: {
          section: 'tags',
          page: 1,
          tags: tag
        }
      }
    );
  }

  fetchComments = slug => {
    this.props.navigation.navigate('CommentList', {slug})
  }

  backToSearch = () => {
    this.props.navigation.navigate('Search')
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({theme}) => (
            <SafeAreaView style={CommonStyles[`${theme}__container`]}>
              <Text style={styles.title}>YOUR SEARCH FOR {this.state.searchStr.toUpperCase()}</Text>
              {
                this.state.posts.length === 0 &&
                <View style={styles.blackContainer}>
                  <TouchableOpacity onPress={this.backToSearch}>
                    <Text style={styles.txt}>NEW SEARCH</Text>
                  </TouchableOpacity>
                </View>
              }
              <PostList
                params={{page: 0}}
                searchPosts={this.state.posts}
                followingTagsList={this.props.followingTagsList}
                fetchComments={this.fetchComments}
                search={true}
              />

            </SafeAreaView>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  tagContainer: {
    marginBottom: 80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    marginLeft: 12
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  },
  blackContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#c4201b',
    width: 200,
    marginLeft: 10
  },
  txt: {
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 6
  }
})

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  tags: state.Post.tags,
  followingTagsList: state.Profile.followingTagsList
})

export default connect(mapStateToProps)(withNavigation(SearchResult));