import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, Dimensions, Platform } from 'react-native';

import { connect } from 'react-redux';
import PostAnnounce from './PostAnnounce';
import { token } from '../../constants/constants';
import { MaterialIcons } from '@expo/vector-icons';
import { getFileName } from '../../utils/functions';
import { tracking } from '../../utils/functions';
import { withNavigationFocus } from 'react-navigation';
import { fetchAllTags } from '../../actions/PostActions';
import * as VideoThumbnails from 'expo-video-thumbnails';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { Permissions } from 'expo';
import MultiSelect from '../../components/MultiSelect/index';
import { apiFetchPostWithFormData } from '../../utils/network';
import LoadingHolder from '../../components/Loading/LoadingHolder';

class PostCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      countCharacters: 0,
      items: [],
      selectedItems: [],
      file: null,
      fileData: {},
      uploadSuccess: false
    },
      this.platformOs = Platform.OS === 'ios'
    this.loading = LoadingHolder.getLoading()
  }

  componentDidMount() {
    let items = [];
    if (this.props.allTags) {
      this.props.allTags.forEach((element, index) => {
        let item = {}
        item.id = index;
        item.name = element.name
        items.push(item)
      });
    }
    this.setState({ items })
    this.getPermissionAsync();
    tracking('PostCreate');
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home')
  }

  onChangeTitle(title) {
    this.setState({ title, countCharacters: title.length })
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  };

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
      this.setState({ fileData: result }, () => { this.setState({ file: true }); });
    }
  };

  generateThumbnail = async (url) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        url,
        {
          time: 2000,
        }
      );
      this.setState({ file: uri });
    } catch (e) {
      console.warn(e);
    }
  };

  getTagsParam = (items) => {
    return items.join(',')
  }

  uploadPost = () => {
    const { title, fileData, selectedItems } = this.state;

    let formData = new FormData()
    formData.append('post[title]', title)
    formData.append('post[tags]', this.getTagsParam(selectedItems))
    formData.append('post[nsfw]', false)
    if (fileData.uri) {
      formData.append('post[file]', {
        uri: fileData.uri,
        type: this.platformOs ? fileData.type : 'image/' + fileData.type,
        name: getFileName(fileData.uri)
      })
    }
    
    this.loading.show();
    apiFetchPostWithFormData(`upload?token=${token}`, formData).then(response => {
      this.loading.hide();
      if (response.status === 200) {
        this.setState({ uploadSuccess: true })
      } else {
        alert('Your file upload was failed due to a network issue')
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.isFocused !== prevProps.isFocused) {
      this.setState({
        title: '',
        countCharacters: 0,
        items: [],
        selectedItems: [],
        file: null,
        fileData: {},
        uploadSuccess: false
      })
    }
  }

  render() {
    const { selectedItems, file, uploadSuccess } = this.state;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.head}>
          <View style={styles.headLeft} />
          <Text style={styles.txtCreate}>CREATE POST</Text>
          <MaterialIcons name='clear' size={24} color="black" onPress={this.navigateToHome} style={styles.exit} />
        </View>
        {
          uploadSuccess
            ? <PostAnnounce navigateToHome={this.navigateToHome} />
            : <View>
              {
                file
                  ?
                  <TouchableOpacity onPress={this.pickImage}>
                    <Image
                      style={[{ height: (Dimensions.get('window').width - 24) * (this.state.fileData.height / this.state.fileData.width) }, styles.imageDisplay]}
                      resizeMode="contain"
                      source={{ uri: this.state.fileData.uri }}
                    />
                  </TouchableOpacity>
                  :
                  <TouchableOpacity style={styles.btnFile} onPress={this.pickImage} >
                    <Text style={styles.txtFile}>GIVE US SOMETHING</Text>
                    <Text style={styles.txtFile}>FUNNY RIGHT HERE</Text>
                    <Image style={styles.upload} source={require('../../assets/images/upload.png')} />
                    <Text style={styles.txtUpload}>UPLOAD</Text>
                  </TouchableOpacity>
              }

              <Text style={styles.title}>Title</Text>
              <View style={styles.inputSection}>
                <TextInput
                  multiline={true}
                  style={styles.input}
                  placeholder="Drop some fancy title..."
                  onChangeText={(title) => this.onChangeTitle(title)}
                  value={this.state.title}
                  underlineColorAndroid="transparent"
                />
                <Text>{this.state.countCharacters}/150</Text>
              </View>
              <MultiSelect
                hideTags
                items={this.state.items}
                uniqueKey="id"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Pick Tags"
                searchInputPlaceholderText="Search Tags..."
                tagRemoveIconColor="rgb(196, 33, 28)"
                tagBorderColor="rgb(196, 33, 28)"
                tagTextColor="rgb(196, 33, 28)"
                selectedItemTextColor="rgb(196, 33, 28)"
                selectedItemIconColor="rgb(196, 33, 28)"
                itemTextColor="#CCC"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="rgb(196, 33, 28)"
                submitButtonText="SELECT"
              />
              <View style={styles.selectedItem}>
                {
                  this.multiSelect &&
                  this.multiSelect.getSelectedItemsExt(selectedItems)}
              </View>
              <TouchableOpacity style={styles.btnUpload} onPress={this.uploadPost} >
                <Text style={styles.textBtnUpload}>UPLOAD NOW</Text>
              </TouchableOpacity>
            </View>
        }

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  exit: {
    flex: 1

  },
  btnFile: {
    height: 280,
    borderWidth: 1,
    borderColor: 'rgb(196, 33, 28)',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    padding: 12
  },
  txtFile: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    color: 'rgb(196, 33, 28)',
    marginTop: 24,
  },
  inputSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgb(219, 219, 219)',
    borderRadius: 5,
    height: 48,
    padding: 4,
    marginTop: 16,
    marginBottom: 24
  },
  input: {
    backgroundColor: '#fff',
    color: '#424242',
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  },
  head: {
    flexDirection: 'row'
  },
  txtCreate: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 8
  },
  upload: {
    width: 80,
    height: 72,
    marginTop: 64,
    marginBottom: 8
  },
  txtUpload: {
    color: 'rgb(196, 33, 28)',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headLeft: {
    flex: 1
  },
  btnUpload: {
    width: '70%',
    height: 48,
    borderRadius: 3,
    backgroundColor: 'rgb(196, 33, 28)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 96
  },
  textBtnUpload: {
    fontSize: 24,
    color: '#fff'
  },
  selectedItem: {
    marginBottom: 64
  },
  imageDisplay: {
    width: '100%',
    marginTop: 24
  }
})

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  allTags: state.Post.allTags
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTags: () => dispatch(fetchAllTags()),
  };
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(PostCreate));

