import React from "react";
import { View, ScrollView, Image, Text, TouchableOpacity, Platform } from "react-native";

import styles from './styles';
import Tabbar from './Tabbar';
import VotePosts from './VotePosts';
import SettingForms from './SettingForms';
import ProfileDeatail from './ProfileDeatail';
import { getFileName } from '../../utils/functions';
import { ImagePicker, Permissions, Constants } from 'expo';
import { apiFetchPostWithFormData } from '../../utils/network';
import { token, accessToken } from '../../constants/constants';
import LoadingHolder from '../../components/Loading/LoadingHolder';

export default class Profile extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      type: 0,
      file: null,
      fileData: {},
    },
      this.platformOs = Platform.OS === 'ios'
    this.loading = LoadingHolder.getLoading()
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });
    if (!result.cancelled) {
      let formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        type: this.platformOs ? result.type : 'image/' + result.type,
        name: getFileName(result.uri)
      });
      this.loading.show()
      apiFetchPostWithFormData(`user/avatar?token=${token}`, formData, accessToken).then(response => {
        this.loading.hide();
        if (response.status === 200) {
          this.props.fetchUserDetail()
        } else {
          alert('Your file upload was failed due to a network issue')
        }
      })
    }
  };

  getFileName(path) {
    return path.replace(/^.*[\\\/]/, '')
  }

  changeTab = type => {
    this.setState({ type });
    this.props.changeTab(type);
  }

  render() {
    const { userDetail } = this.props;

    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollViewContainer}>
          <View>
            <Text style={[styles.headerText, styles.headerWrapper]}>Profile</Text>
          </View>
          <View style={styles.headerImageView}>
            <TouchableOpacity onPress={this.pickImage} style={styles.imageView}>
              <Image
                style={userDetail.avatar ? styles.imageUpload : styles.tack}
                source={userDetail.avatar ? { uri: userDetail.avatar } : require("../../assets/images/rechtack156.png")}
                resizeMode='cover'
              />
              {
                !userDetail.avatar &&
                <Image
                  style={[styles.crossImage, styles.cameraImage]}
                  source={require("../../assets/images/camera.png")}
                />
              }

            </TouchableOpacity>
            <Text style={styles.userName}>{this.props.userDetail.username}</Text>
          </View>
          <Tabbar
            profile={this.props.profile}
            posts={this.props.posts}
            tags={this.props.tags}
            more={this.props.more}
            changeTab={this.changeTab} />
          {
            this.state.type == 0 &&
            <ProfileDeatail
              userDetail={this.props.userDetail}
              following={this.props.following}
              followingTagsCount={this.props.followingTagsCount}
            />
          }
          {
            this.state.type == 2 &&
            <VotePosts fetchPosts={this.props.fetchPosts} posts={this.props.likePosts} />
          }
          {
            this.state.type == 3 &&
            <SettingForms userDetail={this.props.userDetail} updateProfile={this.props.updateProfile} deleteUser={this.props.deleteUser} />
          }
        </ScrollView>
      </View>
    );
  }
}