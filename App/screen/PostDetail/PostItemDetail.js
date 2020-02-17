import React from "react";
import { View, Text, ScrollView, TouchableOpacity, AsyncStorage } from "react-native";
import {withNavigation} from "react-navigation";

import styles from './styles';
import { connect } from 'react-redux';
import { ThemeContext } from "../../context";
import { apiFetch } from '../../utils/network';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import CategoryList from '../Home/CategoryList';
import RecommendationItem from './RecommendationItem';
import { fetchPostDetail, fetchPosts } from '../../actions/PostActions';
import ContentPost from '../../components/ContentPost';
import Social from "../../components/Social";
import PostIcon from "../../components/PostIcon";
import LoadingHolder from '../../components/Loading/LoadingHolder';

class PostItemDetail extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      points: 0,
      active: null
    };
    this.loading = LoadingHolder.getLoading()
  }

  componentDidUpdate(preProps) {
    if(preProps.item === undefined && this.props.item !== undefined){
      this.checkVoteStatus()
      this.setState({ points: this.props.item.points })
    }

    if (preProps.item !== undefined && preProps.item.slug !== this.props.item.slug) {
      this.checkVoteStatus()
      this.setState({ points: this.props.item.points })
    }
  }

  onVoteLike = async () => {
    if(this.state.active === 'like')
      return;

    try {
      await AsyncStorage.setItem(`@post${this.props.item.slug}`, 'like');
      this.onVote('like');
    } catch (error) {

    }
  }

  onVoteDisLike = async () => {
    if(this.state.active === 'dislike')
      return;

    try {
      await AsyncStorage.setItem(`@post${this.props.item.slug}`, 'dislike');
      this.onVote('dislike');
    } catch (error) {

    }
  }

  onVote(type) {
    const parameters = `vote/${this.props.item.slug}/${type}?`
    apiFetch(parameters, '')
      .then(resp => resp.json())
      .then(result => {
        this.setState({ points: result.points, active: type })
      })
      .catch(err => {
      })
  }

  navigatePrevPost = () => {
    const { item } = this.props;
    const params = {
      slug: item.paging.prev
    }
    this.props.fetchPostDetail(params);
  }


  navigateNextPost = () => {
    const { item } = this.props;
    const params = {
      slug: item.paging.next
    }
    this.props.fetchPostDetail(params);
  }

  navigateToPost = () => {
    this.list.scrollTo({ x: 0, y : 0, animated : true})
  }

  navigateToTag = (tag) => {
    this.props.navigation.navigate('Home',
      {
        fromTags: true,
        refresh : false,
        params: {
          section: 'tags',
          page: 1,
          tags: tag,
          date: '',
        }
      }
    );
  }

  getPostsByTag = (tag) => {
    const params = {
      section: 'tags',
      page: 1,
      tags: tag
    }
    this.props.fetchPosts(params);
    this.props.navigation.navigate('Home')
  }

  pressReport = () => {
    this.props.navigation.navigate('Report', { slug: this.props.item.slug });
  }


  fetchComments = () => {
    this.props.navigation.navigate('CommentList', { slug: this.props.item.slug })
  }

  checkVoteStatus = async () => {
    try {
      const status = await AsyncStorage.getItem(`@post${this.props.item.slug}`);
      this.setState({ active: status })
    } catch (error) {
    }
  }

  render() {
    if (!this.props.item) {
      return null
    }
    const { item } = this.props;

    return (
      <ScrollView ref={list => this.list = list} >
        <ThemeContext.Consumer>
          {
            ({ theme }) => (
              <View style={styles[`${theme}__contentContainer`]}>
                <View style={styles[`${theme}__viewSpace`]} />
                <View style={styles.headerView}>
                  <TouchableOpacity style={styles.headerLeft} onPress={item.paging.prev ? this.navigatePrevPost : null}>
                    {
                      item.paging.prev && <AntDesign name='caretleft' size={24} color="#c4201b" />
                    }
                  </TouchableOpacity>
                  <View style={styles.headerCenter}>
                    <Text style={styles[`${theme}__postHeadingText`]}>{item.title}</Text>
                  </View>
                  <TouchableOpacity style={styles.headerRight} onPress={item.paging.next ? this.navigateNextPost : null} >
                    {
                      item.paging.next && <AntDesign name="caretright" size={24} color="#c4201b" />
                    }
                  </TouchableOpacity>
                </View>
                <ContentPost item={item} canTouch={false} shouldPlay={true} />
                <View style={styles.tags}>
                  {
                    item.tags.map((tag, index) =>
                      <Text
                        key={index}
                        style={styles.tagItem}
                        onPress={() => this.getPostsByTag(tag)}
                      >#{tag}</Text>
                    )
                  }
                </View>
                <View style={styles.bottomBarView}>
                  <TouchableOpacity style={this.state.active === 'like' ? [styles.bottomImageViews, { backgroundColor: '#b9f8bc' }] : styles.bottomImageViews}
                    onPress={this.onVoteLike}>
                    <FontAwesome name='caret-up' size={35} color="#000" />
                  </TouchableOpacity>
                  <View style={styles.pointArea}>
                    <View style={styles.pointAreaLeft}>
                      <Text style={styles[`${theme}__countText`]}>{this.state.points}</Text>
                      <Text style={styles[`${theme}__pointTxt`]}>points</Text>
                    </View>
                    <View style={styles.pointAreaRight}>
                      <PostIcon size={50} points={this.state.points} />
                    </View>
                  </View>
                  <TouchableOpacity style={this.state.active === 'dislike' ? [styles.bottomImageViews, , { backgroundColor: '#f8b9b9' }] : styles.bottomImageViews}
                    onPress={this.onVoteDisLike}>
                    <FontAwesome name='caret-down' size={35} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.shareArea}>
                  <TouchableOpacity style={styles.btnSocialArea} onPress={this.fetchComments}>
                    <FontAwesome name='comment-o' size={20} color='#fff' />
                  </TouchableOpacity>
                  <Social slug={item.slug} style={styles.btnSocialArea} />
                  <TouchableOpacity style={[styles.btnSocialArea, { flex: 0.4 }]} onPress={this.pressReport}>
                    <FontAwesome5 name='flag' size={20} color='#fff' />
                  </TouchableOpacity>
                </View>
                <Text style={styles[`${theme}__title`]}>YOU MAY ALSO LIKE</Text>
                {
                  item.recommendations.map((post, index) =>
                    index !== 3 ?
                      <RecommendationItem post={post} key={index} navigateToPost={this.navigateToPost} />
                      : <View key={index}>
                        <RecommendationItem post={post} navigateToPost={this.navigateToPost} />
                        <Text style={styles[`${theme}__title`]}>BROWSE TAGS</Text>
                        <CategoryList
                          style={styles.categoryList}
                          navigateToTag={this.navigateToTag}
                        />
                      </View>
                  )
                }

              </View>
            )
          }
        </ThemeContext.Consumer>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetail: (params) => dispatch(fetchPostDetail(params)),
    fetchPosts: (params) => dispatch(fetchPosts(params))
  };
}

export default connect(null, mapDispatchToProps)(withNavigation(PostItemDetail));