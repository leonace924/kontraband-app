import React, { PureComponent } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { connect } from 'react-redux';

import styles from './styles';
import CategoryList from "./CategoryList";
import { ThemeContext } from "../../context";
import CommonStyles from "../../utils/styles";
import ContentPost from "../../components/ContentPost";
import VoteArea from "./VoteArea";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import Social from "../../components/Social";
import PostIcon from "../../components/PostIcon";
import {fetchComments} from "../../actions/PostActions";

class PostItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      points: props.item.points
    }
  }

  navigateToPostDetail = item => this.props.navigation.navigate('PostDetail', { postSlug: item.slug });

  getPostsByTag = (tag) => {
    const params = {
      section: 'tags',
      page: 1,
      tags: tag
    }
    this.props.getPostsByTag(params);
  }

  fetchComments = () => {
    this.props.navigation.navigate('CommentList', { slug: this.props.item.slug })
  }

  icons = {
    'gif' : 'film',
    'video' : 'video',
    'image' : 'image'
  }

  render() {
    const { item, followingTagsList } = this.props;
    const tags = followingTagsList && followingTagsList.map(item => item.name) || [];

    const FontIcon = item.post_type == 'video' ? FontAwesome5 : FontAwesome;

    return (
      <ThemeContext.Consumer>
        {
          ({ theme }) => (
            <View style={styles[`${theme}__itemContainer`]}>
              <View style={styles[`${theme}__item`]} />
              <PostIcon style={styles.postIcon} points={item.points}/>
              <TouchableOpacity onPress={() => this.navigateToPostDetail(item)}>
                <View style={styles.headerView}>
                  <Text style={styles[`${theme}__postHeadingText`]}>
                    <FontIcon name={this.icons[item.post_type]} size={14} color="#c4201b" />
                    {`   `}{item.title}
                  </Text>
                </View>
              </TouchableOpacity>
              <ContentPost item={item} handlePress={this.navigateToPostDetail} />
              <View style={styles.listTag}>
                {
                  item.tags.map((tag, index) =>
                    <Text
                      key={index}
                      style={tags.includes(tag) ? [styles.tagItem, {fontWeight : 'bold'}] : styles.tagItem}
                      onPress={() => this.getPostsByTag(tag)}
                    >#{tag}</Text>
                  )
                }
              </View>
              <View style={styles.bottomBarView}>
                <VoteArea slug={item.slug} points={item.points} theme={theme} />
                <View style={[CommonStyles.flexOneRowEnd]}>
                  <TouchableOpacity style={styles.btnSocialArea} onPress={this.fetchComments}>
                    <FontAwesome name='comment-o' size={20} color='#fff'  />
                  </TouchableOpacity>
                  <Social slug={item.slug} />
                </View>
              </View>
              {
                this.props.index % 4 == 0 &&
                this.props.index > 3 &&
                <CategoryList navigateToTag={this.props.navigateToTag} />
              }
            </View>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  comments: state.Post.comments
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchComments: (slug) => dispatch(fetchComments(slug)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
