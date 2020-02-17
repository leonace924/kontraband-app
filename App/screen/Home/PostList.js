import React from "react";
import { withNavigation } from "react-navigation";
import {FlatList, View, InteractionManager} from "react-native";
import { currentDate } from "../../utils/functions";
import { viewablePosts, fetchPosts, init } from '../../actions/PostActions';
import PostItemWrapper from "./PostItemWrapper";
import { connect } from 'react-redux'

class PostList extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      selectedTag: 'New',
      transitionReady: false
    }
    this.params = {
      section: 'hot',
      page: 1
    }
    this.viewabilityConfig = {
      minimumViewTime: 300,
      viewAreaCoveragePercentThreshold: 50
    }
  }

  navigateToTag = (tag) => {
    this.props.navigation.navigate('Home',
      {
        fromTags: true,
        refresh : false,
        params: {
          section: 'tags',
          page: 1,
          tags: tag
        }
      }
    );
  }

  componentDidMount() {
    this.props.init()

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        transitionReady: true
      }, () => {

        if (this.props.navigation.state.params) {
          if(this.props.navigation.state.params.fromLogin){
            this.params.section = 'following';
          }
          if(this.props.navigation.state.params.fromTags){
            this.params = this.props.navigation.state.params.params;
          }
        }

        if (!this.props.search) {
          this.params.date = this.props.initialDate
          this.props.fetchPosts(this.params);
        }

      })
    })
  }

  componentDidUpdate(prevProps) {
    this.params.date = this.props.initialDate

    if (this.props.navigation.state.params !== prevProps.navigation.state.params) {
      if (this.props.navigation.state.params.fromTags) {
        this.params = this.props.navigation.state.params.params;
        this.props.fetchPosts(this.params);
      }

      if (this.props.navigation.state.params.refresh) {
        this.params = {
          section: this.props.isSignedIn ? 'following' : 'hot',
          page: 1
        }
        this.props.fetchPosts(this.params)
      }
      if (this.props.navigation.state.params.fromProfile) {
        this.params.section = 'following'
        this.props.fetchPosts(this.params);
      }
    }
    if (prevProps.isSignedIn && !this.props.isSignedIn && !this.props.navigation.state.params) {
      this.params.section = 'new';
      this.props.fetchPosts(this.params);
    }
    if (this.props.updateFollowingSucceed !== prevProps.updateFollowingSucceed) {
      this.props.fetchFollowing()
    }
    if (this.props.params.section === 'following' && !this.props.posts.length) {
      this.props.navigation.navigate('Tags');
    }
  }

  _renderItem = ({ item, index }) => {
    return (
      <View>
        <PostItemWrapper
          index={index}
          item={item}
          followingTagsList={this.props.followingTagsList}
          navigation={this.props.navigation}
          getPostsByTag={this.getPostsByTag}
          navigateToTag={this.navigateToTag}
        />
      </View>
    )
  };

  getPostsByTag = (params) => {
    this.props.fetchPosts(params)
  }

  refresh = () => {
    this.props.init()
    if(this.props.params !== undefined)
      this.props.fetchPosts({...this.props.params, date : currentDate()});
    else 
      this.props.fetchPosts();
  }

  onEndReached = () => {
    const params = {
      ...this.props.params,
      page: this.props.params.page + 1
    }
    this.props.fetchPosts(params)
  }

  onViewableItemsChanged = ({ viewableItems }) => {
    const { viewablePosts } = this.props
    viewablePosts(viewableItems.map(x => x.key))
  }
  
  render() {
    const posts = this.props.searchPosts ? this.props.searchPosts: this.props.posts
    return (
      <FlatList
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={this.viewabilityConfig}
        onRefresh={this.refresh}
        refreshing={false}
        data={posts}
        keyExtractor={item => item.slug.toString()}
        onEndReached={this.onEndReached}
        renderItem={this._renderItem}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={1}
        initialNumToRender={3}
        windowSize={10}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.Auth.isSignedIn,
    posts: state.Post.posts,
    initialDate: state.Post.initialDate
  }
}

const mapDispatchToProps = {
  viewablePosts,
  fetchPosts,
  init
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PostList));