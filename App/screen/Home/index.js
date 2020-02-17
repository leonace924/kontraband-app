import React from "react";
import { View, SafeAreaView } from "react-native";

import Home from "./Home";
import styles from './styles';
import { connect } from 'react-redux';
import Loader from "../../components/Loader";
import { tracking } from '../../utils/functions';
import { updateFollowing, fetchFollowing, fetchProfileDetails } from '../../actions/ProfileActions';
import { fetchMenuCategories } from '../../actions/PostActions';
import { ThemeContext } from "../../context";
import CommonStyle from "../../utils/styles";

class HomeContainer extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchMenuCategories();
    this.props.fetchFollowing();
    this.props.fetchProfileDetails();
    tracking('Home');
  }

  onFollow = (tag) => {
    if (this.props.isSignedIn) {
      this.props.updateFollowing(tag)
    } else {
      this.props.navigation.navigate('Login', { tag })
    }
  }

  render() {
    const { loading } = this.props;

    return (
      <ThemeContext.Consumer>
        {
          ({theme}) => (
            <SafeAreaView style={CommonStyle[`${theme}__container`]}>
              <View style={styles.mainPostContainer}>
                <Home
                  params={this.props.params}
                  followingTagsList={this.props.followingTagsList}
                  onFollow={this.onFollow}
                />
                {loading && <Loader />}
              </View>
            </SafeAreaView>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.Post.loading,
  isSignedIn: state.Auth.isSignedIn,
  params: state.Post.params,
  followingTagsList: state.Profile.followingTagsList,
  updateFollowingSucceed: state.Profile.updateFollowingSucceed,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenuCategories: () => dispatch(fetchMenuCategories()),
    fetchFollowing: () => dispatch(fetchFollowing()),
    updateFollowing: (tag) => dispatch(updateFollowing(tag)),
    fetchProfileDetails: () => dispatch(fetchProfileDetails()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);