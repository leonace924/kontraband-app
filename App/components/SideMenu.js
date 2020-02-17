import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, Text, AsyncStorage, TouchableOpacity, View } from "react-native";

import { connect } from 'react-redux';
import ThemeButton from "./ThemeButton";
import CommonStyles from "../utils/styles";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { logoutUser } from '../actions/AuthActions';
import { fetchPosts, fetchTagsByQuery } from '../actions/PostActions';
import { updateFollowing, fetchFollowing } from '../actions/ProfileActions';
import {SafeAreaView} from "react-navigation";


class SideMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  _handleInput = name => text => this.setState({ [name]: text });

  navigateToSingnUp = () => this.props.navigation.navigate('Login');

  navigateToProfile = () => this.props.navigation.navigate('Profile');

  logout = (key, callback) => {
    this.props.logoutUser();
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('Home');
    AsyncStorage.removeItem('@KBLoginInfo', callback);
  }

  getPostsByCategories = (category) => {
    const params = {
      section: category,
      page: 1
    }
    this.props.fetchPosts(params);
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('Home');
  }

  getPostsByTag = (tag) => {
    const params = {
      section: 'tags',
      page: 1,
      tags: tag
    }
    this.props.fetchPosts(params);
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('Home');
  }

  discoverTags = () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('Tags')
  }

  authView = (type) => {
    return (
      <TouchableOpacity style={styles.buttonView} onPress={type === 'profile' ? this.navigateToProfile : this.navigateToSingnUp}>
        <Text style={styles.buttonStyle}>{type === 'profile' ? 'PROFILE' : 'SIGN IN'}</Text>
      </TouchableOpacity>
    )
  }

  checkFollowingItem = (tag) => {
    let tagsName = []
    if (this.props.followingTagsList) {
      this.props.followingTagsList.forEach(element => {
        tagsName.push(element.name)
      });
    }

    return tagsName.includes(tag)
  }

  onFollow(tag) {
    if (this.props.isSignedIn) {
      this.props.updateFollowing(tag)
    } else {
      this.props.navigation.navigate('Login')
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.updateFollowingSucceed !== prevProps.updateFollowingSucceed){
      this.props.fetchFollowing()
    }
  }

  handleSearchTxtChange = txt => {
    this.setState({ search : txt });
  }

  handleSearch = () => {
    this.props.navigation.closeDrawer();
    this.props.navigation.navigate('Search');
  }

  render() {
    const { mobileCategories, isSignedIn } = this.props;

    return (
      <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.profileView}>
          <View style={styles.navigationRow}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name='user-ninja' size={22} color='#000'/>
            </View>
            <TouchableOpacity style={CommonStyles.flex1} onPress={isSignedIn ? () => this.getPostsByCategories('following') : () => this.props.navigation.navigate('Login') } >
              <Text style={styles.navigationItem}>MY KB</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationRow}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name='fire' size={22} color='#000'/>
            </View>
            <TouchableOpacity style={CommonStyles.flex1} onPress={() => this.getPostsByCategories('hot')} >
              <Text style={styles.navigationItem}>HOT</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationRow}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name='asterisk' size={22} color='#000'/>
            </View>
            <TouchableOpacity style={CommonStyles.flex1} onPress={() => this.getPostsByCategories('new')} >
              <Text style={styles.navigationItem}>NEW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navigationRow}>
            <View style={styles.iconWrap}>
              <FontAwesome5 name='map' size={22} color='#000'/>
            </View>
            <TouchableOpacity style={CommonStyles.flex1} onPress={this.discoverTags} >
              <Text style={styles.navigationItem}>DISCOVER TAGS</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.categoriesView}>
          <ScrollView>
            {
              mobileCategories.map((item, index) => {
                return (
                  <View key={index} style={styles.tagView}>
                    <TouchableOpacity style={styles.followTag} onPress={() => this.getPostsByTag(item.name)}>
                      <Text
                        style={styles.navigationItemCategory}>
                        {item.name.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                    <AntDesign
                      onPress={() => this.onFollow(item.name)}
                      name={this.checkFollowingItem(item.name) ? "star" : "staro"} size={24}
                      color='#c4201b'
                      style={styles.followIcon}
                    />
                  </View>
                )
              })
            }
          </ScrollView>
        </View>
        <View style={styles.separatorView} />
        <View style={styles.SearchView}>
          <View style={CommonStyles.rowSpaceBetween}>
            {isSignedIn ? this.authView('profile') : this.authView('login')}
            <TouchableOpacity style={[styles.buttonView, styles.marginButton]} onPress={() => this.props.navigation.navigate('PostCreate')}>
              <Text style={styles.buttonStyle}>UPLOAD</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.actionContainer}>
            <ThemeButton />
            <TouchableOpacity onPress={this.handleSearch}>
              <FontAwesome5 name='search' size={22} color='#868686'/>
            </TouchableOpacity>
            {
              isSignedIn && 
              <TouchableOpacity onPress={this.logout}>
                <Image source={require('../assets/images/logout.png')} style={styles.crossImage}/>
              </TouchableOpacity>
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  mainCategories: state.Post.mainCategories,
  mobileCategories: state.Post.mobileCategories,
  followingTagsList: state.Profile.followingTagsList,
  updateFollowingSucceed: state.Profile.updateFollowingSucceed,
})

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
    fetchPosts: (params) => dispatch(fetchPosts(params)),
    updateFollowing: (tag) => dispatch(updateFollowing(tag)),
    fetchTagsByQuery: (query) => dispatch(fetchTagsByQuery(query)),
    fetchFollowing: () => dispatch(fetchFollowing())
  };
}

SideMenu = connect(mapStateToProps, mapDispatchToProps)(SideMenu);
export default SideMenu;

const styles = StyleSheet.create({
  actionContainer : {
    ...CommonStyles.rowSpaceBetween,
    marginTop : 15
  }, 
  iconWrap : {
    width : 30
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff'
  },
  crossImage: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  moonImage: {
    marginTop: 5
  },
  navigationRow: {
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 30,
    paddingBottom: 10
  },
  navigationItem: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#000',
    paddingLeft: 10
  },
  navigationItemCategory: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
    paddingLeft: 15
  },
  SearchView: {
    flex: 1,
    padding: 15,
  },
  separatorView: {
    height: 1,
    width: '100%',
    backgroundColor: '#707070',
  },
  buttonView: {
    flex: 1,
    padding: 7,
    backgroundColor: '#c4201b',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16
  },
  SearchFieldView: {
    marginTop: 20,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection : 'row',
    borderColor: 'rgba(0,0,0,.16)',
    alignItems : 'center'
  },
  searchInp : {
    padding : 4,
    flex : 1,
  },
  nfswView: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cecece',
    marginTop: 13,
    marginStart: 5
  },
  nfsText: {
    textTransform: 'uppercase',
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000'
  },
  tagView: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginTop: 24,
    marginStart: 20,
    marginEnd: 24
  },
  profileView: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 15
  },
  categoriesView: {
    flex: 4,
    paddingBottom: 24
  },
  followTag: {
    flex: 5
  },
  followIcon: {
    flex: 1
  },
  paddingProfile: {
    paddingEnd: 100
  },
  marginButton: {
    marginLeft: 15
  }
});