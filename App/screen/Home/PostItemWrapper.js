import React from "react";
import PostItem from './PostItem'
import CommonStyles from "../../utils/styles";
import { ADMOB_IOS, ADMOB_ANDROID } from "../../constants/constants";
import {Platform, StyleSheet, View} from "react-native";
import {
  AdMobBanner,
} from 'expo-ads-admob';
import CategoryList from "./CategoryList";

export default class PostItemWrapper extends React.PureComponent
{
  constructor(props) {
    super(props);
  }

  getPostsByTag = params => {
    this.props.getPostsByTag(params);
  }

  render() {
    const {index, item} = this.props;
    const adId = Platform.OS === 'ios' ? ADMOB_IOS: ADMOB_ANDROID

    return (
      <View style={CommonStyles.alignItemsCenter}>
        {
          (index % 4 === 0 && index !== 0) &&
            <AdMobBanner
              style={styles.ggAd}
              bannerSize="mediumRectangle"
              adUnitID={adId} />
        }
        <PostItem
          item={item}
          followingTagsList={this.props.followingTagsList}
          index={index}
          navigation={this.props.navigation}
          getPostsByTag={this.getPostsByTag}
          navigateToTag={this.props.navigateToTag}
        />
        {
          (index % 25 === 0 && index !== 0) &&
            <CategoryList
              style={styles.ggAd}
              navigateToTag={this.props.navigateToTag}
            />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ggAd : {
    marginTop: 12, 
    marginBottom: 12
  }
})
