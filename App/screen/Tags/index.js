import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView } from "react-native";

import TagItem from '../Tags/TagItem';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
import { withNavigationFocus } from 'react-navigation';
import { fetchFollowing } from '../../actions/ProfileActions';
import { fetchTags, fetchPopularTags, fetchTagsByQuery } from '../../actions/PostActions';
import { tracking } from '../../utils/functions';
import { ThemeContext } from "../../context";
import CommonStyles from "../../utils/styles";

class Tags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searching: false
    }
  }

  componentDidMount() {
    const tagParams = {
      page: 1,
      limit: 8,
      sort: 'trending_value',
      popular: 1
    }
    const searching = this.props.navigation.getParam('searching', false);
    const searchString = this.props.navigation.getParam('searchString', '');
    this.setState({
      searching,
      searchString
    });
    this.props.fetchFollowing();
    if(!searching) {
      this.props.fetchPopularTags(tagParams);
      this.props.fetchTags(0);
    }
    tracking('Tags');
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

  searchTag = () => {
    this.setState({ searching: true })
    this.props.fetchTagsByQuery(this.state.searchString);
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

  handleChgSearchTxt = searchString => this.setState({ searchString });

  componentDidUpdate(prevProps) {
    if (this.props.isFocused !== prevProps.isFocused) {
      this.setState({ searching: false, searchString: '' })
    }
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({theme}) => (
            <SafeAreaView style={CommonStyles[`${theme}__container`]}>
              <View style={styles.container}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={styles.input}
                    value={this.state.searchString}
                    placeholder="Search..."
                    onChangeText={this.handleChgSearchTxt}
                    underlineColorAndroid="transparent"
                  />
                  <AntDesign onPress={this.searchTag} style={styles.searchIcon} name="search1" size={24} color="rgb(219, 219, 219)" />
                </View>
                {
                  this.state.searching
                    ?
                    <ScrollView style={styles.listPopular}>
                      <Text style={styles.title}>YOUR SEARCH FOR {this.state.searchString.toUpperCase()}</Text>
                      {
                        this.props.queryTags &&
                          <View style={styles.wrap}>
                            {
                              this.props.queryTags.map((tag, index) => {
                                return (
                                  <TagItem followed={this.checkFollowingItem(tag.name)} navigation={this.props.navigation} key={index} tag={tag} navigateToTag={this.navigateToTag} navigateToTagQuery={this.navigateToTagQuery} query={true} />
                                )
                              })
                            }
                          </View>
                      }
                    </ScrollView>
                    :
                    <ScrollView style={styles.listPopular}>
                      {
                        this.props.isSignedIn && 
                        <View>
                          <Text style={styles.title}>YOU FOLLOW</Text>
                          <View style={styles.wrap}>
                            {
                              this.props.followingTagsList &&
                              this.props.followingTagsList.map((tag, index) => {
                                return (
                                  <TagItem followed={true} navigation={this.props.navigation} key={index} tag={tag} navigateToTag={this.navigateToTag} />
                                )
                              })
                            }
                          </View>
                        </View>
                      }
                      <Text style={styles.title}>POPULAR HASHTAGS</Text>
                      <View style={styles.wrap}>
                        {
                          this.props.tags.map((tag, index) => {
                            return (
                              <TagItem followed={this.checkFollowingItem(tag.name)} navigation={this.props.navigation} key={index} tag={tag} navigateToTag={this.navigateToTag} />
                            )
                          })
                        }
                      </View>
                      <Text style={styles.title}>DISCOVER MORE HASHTAGS</Text>
                      <View style={styles.wrap}>
                        {
                          this.props.popularTrendTags &&
                          this.props.popularTrendTags.map((tag, index) => {
                            return (
                              <TagItem followed={this.checkFollowingItem(tag.name)} navigation={this.props.navigation} key={index} tag={tag} navigateToTag={this.navigateToTag} />
                            )
                          })
                        }
                      </View>
                    </ScrollView>
                }
              </View>
            </SafeAreaView>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingBottom: 24,
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'rgb(219, 219, 219)',
    borderRadius: 5,
    height: 48,
    padding: 4,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
    marginBottom: 8
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  bottom: {
    height: 32,
    backgroundColor: 'rgb(196, 33, 28)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: '#fff',
  },
  listPopular: {
    flex: 1
  },
  item: {
    width: '44%',
    margin: '3%',
    borderColor: '#191313',
    borderWidth: 1,
    borderRadius: 3
  },
  image: {
    resizeMode: 'stretch',
    width: '100%',
    height: 180
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
    marginLeft: 12
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1
  }
})

const mapStateToProps = (state) => ({
  isSignedIn: state.Auth.isSignedIn,
  tags: state.Post.tags,
  tagsPages: state.Post.tagsPages,
  popularTrendTags: state.Post.popularTrendTags,
  queryTags: state.Post.queryTags,
  followingTagsList: state.Profile.followingTagsList
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTags: (popular) => dispatch(fetchTags(popular)),
    fetchPopularTags: (params) => dispatch(fetchPopularTags(params)),
    fetchTagsByQuery: (query) => dispatch(fetchTagsByQuery(query)),
    fetchFollowing: () => dispatch(fetchFollowing())
  };
}

export default withNavigationFocus(connect(mapStateToProps, mapDispatchToProps)(Tags));
