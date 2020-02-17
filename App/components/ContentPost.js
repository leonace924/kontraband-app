import React from "react";
import {StyleSheet, TouchableHighlight, Dimensions} from "react-native";
import {Image} from "react-native-expo-image-cache";
import VideoCustom from './Video';

import {calculateDynamicHeight} from '../utils/functions';
import Gif from './Gif';
import {withNavigation} from "react-navigation";
import {connect} from 'react-redux'
import GifThumbnail from "./GifThumbnail";

class ContentPost extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  handlePress = () => {
    this.props.handlePress(this.props.item)
  }

  render() {
    const {item, viewableList, shouldPlay} = this.props;
    const viewable = viewableList.includes(item.slug)
    const itemWidth = Math.round(Dimensions.get('window').width)
    const itemHeight = calculateDynamicHeight(item.height, item.width)

    if (item.post_type == 'image') {
      if (this.props.canTouch) {
        return (
          <TouchableHighlight onPress={this.handlePress}>
            <Image
              style={[styles.postImage, {
                width: itemWidth,
                height: itemHeight
              }]}
              uri={item.sizes.full}/>
          </TouchableHighlight>
        );
      }

      return (
        <Image
          style={[styles.postImage, {
            width: itemWidth,
            height: itemHeight
          }]}
          uri={item.sizes.full}/>
      );
    }

    if (item.post_type == 'gif') {
      return (
        viewable || shouldPlay ?
          <Gif
            uri={item.file}
            height={itemHeight}
          />
          : <GifThumbnail
            uri={item.sizes.full}
            width={itemWidth}
            height={itemHeight}
          />
      )
    }

    if (item.post_type == 'video')
      return (
        viewable || shouldPlay ?
          <VideoCustom
            height={itemHeight}
            item={item}
            source={{uri: item.file}}
            useNativeControls={item.post_type == 'video'}
          />
          : <Image
            style={[styles.postImage, {
              height: itemHeight
            }]
            }
            uri={item.sizes.full}/>
      );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.Post.viewableList) {
    return {
      viewableList: state.Post.viewableList
    }
  }

  return {viewableList: []}
}

export default connect(mapStateToProps)(withNavigation(ContentPost))

const styles = StyleSheet.create({
  postImage: {
    resizeMode: 'cover',
    marginBottom: 5
  }
});
