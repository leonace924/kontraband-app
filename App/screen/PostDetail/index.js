import React from "react";
import { SafeAreaView, View, BackHandler } from "react-native";

import styles from './styles';
import PostDetail from "./PostDetail";
import { connect } from 'react-redux';
import { tracking } from '../../utils/functions';
import { fetchPostDetail, fetchPopularTags } from '../../actions/PostActions'
import { ThemeContext } from "../../context";
import CommonStyles from "../../utils/styles";


class PostDetailContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      firstSlug: '',
      slug: '',
      backPrevScreen: false
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    const params = {
      slug: navigation.state.params.postSlug,
    }
    this.setState({ firstSlug: params.slug, slug: params.slug })
    const tagParams = {
      page: 1,
      limit: 8,
      sort: 'trending_value',
      popular: 1
    }
    this.props.fetchPostDetail(params);
    this.props.fetchPopularTags(tagParams);
    tracking('PostDetail');
  }

  componentDidUpdate(prevProps) {
    if (this.props.navigation.state.params !== prevProps.navigation.state.params) {
      const params = {
        slug: this.props.navigation.state.params.postSlug,
      }
      this.setState({ slug: params.slug })
      this.props.fetchPostDetail(params);
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
      {
        ({ theme }) => (
          <SafeAreaView style={CommonStyles[`${theme}__container`]}>
            <View style={styles.PostDetailContainer}>
              <PostDetail item={this.props.postDetail} popularTrendTags={this.props.popularTrendTags} />
            </View>
          </SafeAreaView>
        )
      }
      </ThemeContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  popularTrendTags: state.Post.popularTrendTags,
  postDetail: state.Post.postDetail
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPostDetail: (params) => dispatch(fetchPostDetail(params)),
    fetchPopularTags: (popular) => dispatch(fetchPopularTags(popular))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer);
