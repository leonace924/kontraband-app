import React from "react";

import Profile from "./Profile";
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/AuthActions';
import { fetchFollowing, fetchProfileDetails, fetchLikePosts, updateProfile, deleteUser } from '../../actions/ProfileActions';
import {SafeAreaView} from "react-native";
import { tracking } from '../../utils/functions';
import { ThemeContext } from "../../context";
import CommonStyles from "../../utils/styles";

class ProfileContainer extends React.PureComponent {
  state = {
    profile: true,
    posts: false,
    tags: false,
    more: false
  };
  changeTab = type => {
    if (type === 0) {
      this.getProfile();
      this.setState({ profile: true, posts: false, tags: false, more: false });
    } else if (type === 1) {
      this.getTags();
      this.setState({ profile: false, posts: false, tags: true, more: false });
    } else if (type === 2) {
      this.getPosts();
      this.setState({ profile: false, posts: true, tags: false, more: false });
    } else if (type === 3) {
      this.getMore();
      this.setState({ profile: false, posts: false, tags: false, more: true });
    }
  };

  getProfile = () => { };
  getPosts = () => {
    this.props.fetchLikePosts({ page: 0 });
  };
  getTags = () => {
    this.props.navigation.navigate('Home', { fromProfile: true, refresh : false })
  }
  getMore = () => { };

  componentDidMount() {
    this.props.fetchProfileDetails();
    this.props.fetchFollowing();
    tracking('Profile');
  }

  componentDidUpdate(preProps) {
    if (!preProps.updateProfileSuccess && this.props.updateProfileSuccess) {
      alert('Update success');
    }

    if (!preProps.deleteMyself && this.props.deleteMyself) {
      alert('Delete success');
      this.props.logoutUser();
      this.props.navigation.navigate('Home');
    }
  }

  fetchUserDetail = () => {
    this.props.fetchProfileDetails();
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({theme}) => (
            <SafeAreaView style={CommonStyles[`${theme}__container`]}>
              <Profile
                profile={this.state.profile}
                posts={this.state.posts}
                tags={this.state.tags}
                more={this.state.more}
                changeTab={this.changeTab}
                userDetail={this.props.userDetail}
                updateProfile={this.props.updateProfile}
                likePosts={this.props.likePosts}
                fetchPosts={this.getPosts}
                following={this.props.following}
                followingTagsCount={this.props.followingTagsCount}
                deleteUser={this.props.deleteUser}
                fetchUserDetail={this.fetchUserDetail}
              />
            </SafeAreaView>
          )
        }
      </ThemeContext.Consumer>
    )
  }
}

const mapStateToProps = (state) => ({
  userDetail: state.Profile.userDetail,
  followingTagsCount: state.Profile.followingTagsCount,
  followingTagsList: state.Profile.followingTagsList,
  likePosts: state.Profile.likesPostList.posts,
  updateProfileSuccess: state.Profile.updateProfileSuccess,
  deleteMyself: state.Profile.deleteMyself,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProfileDetails: () => dispatch(fetchProfileDetails()),
    fetchFollowing: () => dispatch(fetchFollowing()),
    fetchLikePosts: (params) => dispatch(fetchLikePosts(params)),
    updateProfile: (body) => dispatch(updateProfile(body)),
    deleteUser: () => dispatch(deleteUser()),
    logoutUser: () => dispatch(logoutUser()),
  };
}

ProfileContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
export default ProfileContainer;