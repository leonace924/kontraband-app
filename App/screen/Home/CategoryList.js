import React from "react";
import { FlatList, View, Text } from "react-native";

import styles from "./styles";
import { ThemeContext } from "../../context";
import CategoryItem from './CategoryItem';
import {fetchPopularTags} from "../../actions/PostActions";
import {connect} from "react-redux";

class CategoryList extends React.PureComponent {
  _keyExtractor = (item, index) => index + '';
  _renderItem = ({ item, index }) => (
    <CategoryItem
      item={item}
      index={index}
      navigateToTag={this.props.navigateToTag}
    />
  );

  componentDidMount() {
    this.props.fetchPopularTags({
      page: 1,
      limit: 24,
      sort: 'trending_value',
      popular: 1
    });
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({ theme }) => (
            <View style={styles[`${theme}__contentContainer`]}>
              <Text style={styles[`${theme}__itemListContainerHeader`]}>#Tags you might like:</Text>
              <FlatList
                data={this.props.popularTags}
                horizontal
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const mapStateToProps = (state) => ({
  popularTags: state.Post.popularTags,
})

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPopularTags: params => dispatch(fetchPopularTags(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);