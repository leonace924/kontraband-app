import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, SafeAreaView, TouchableOpacity, ActivityIndicator } from "react-native";
import { withNavigationFocus } from 'react-navigation';
import debounce from "lodash/debounce";
import { apiFetch } from '../../utils/network';
import {constants} from "../../constants";
import { ThemeContext } from "../../context";
import { themes } from "../../utils/styles";
import { tracking } from '../../utils/functions';

class Search extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      tags: [],
      loading : false
    }
    this.inThrottle = false;
  }

  componentDidMount() {
    tracking('Search');
  }

  navigateToTag = (tag) => {
    this.props.navigation.navigate('SearchResult', {
      searchStr : tag
    });
  }

  search = () => {
    if (!this.inThrottle) {
      this.setState({loading : true});
      apiFetch(`search/autocomplete?query=${this.state.searchString}`, constants.accessToken).then( async (resp) => {
        const tags = await resp.json();
        this.setState({
          loading : false,
          tags
        });
      }).catch( () => {
        this.setState({loading : false});
      });
      this.inThrottle = true
      setTimeout(() => this.inThrottle = false, 150)
    }
  }

  handleSearch = ({nativeEvent: { text }}) => {
    this.props.navigation.navigate('SearchResult', {
      searchStr: text
    });
  }

  handleChgSearchTxt = searchString => {
    this.setState({ searchString }, debounce(this.search, 150));
  };

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({ theme }) => (
            <SafeAreaView style={styles[`${theme}__safeAreaView`]}>
              <View style={styles.container}>
                <View style={styles.searchSection}>
                  <TextInput
                    style={styles.input}
                    value={this.state.searchString}
                    placeholder="Search..."
                    onChangeText={this.handleChgSearchTxt}
                    returnKeyType={"search"}
                    onSubmitEditing={this.handleSearch}
                  />
                  {
                    this.state.loading &&
                    <View style={styles.loading}>
                      <ActivityIndicator size='small' color='#c4201b'/>
                    </View>
                  }
                </View>
                <ScrollView style={styles.listPopular}>
                  {
                    this.state.tags.map( (item, idx) => (
                    <TouchableOpacity key={`${idx}btn`} style={styles.btn} onPress={() => this.navigateToTag(item)}>
                      <Text style={styles.btnTxt}>#{item}</Text>
                    </TouchableOpacity>
                    ))
                  }
                </ScrollView>
              </View>
            </SafeAreaView>
          )
        }
      </ThemeContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  loading : {
    position : 'absolute',
    flexDirection : 'row',
    justifyContent : 'flex-end',
    alignItems : 'center',
    top : 0,
    left : 0,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 25,
    height: 48,
    width : '100%',
    zIndex: 5
  },
  btn : {
    paddingVertical : 5,
    paddingHorizontal : 8
  },
  btnTxt : {
    fontWeight : 'bold',
    color : '#c4201b',
  },
  light__safeAreaView: {
    flex: 1,
    backgroundColor : themes.lightTheme.mainColor
  },
  dark__safeAreaView: {
    flex: 1,
    backgroundColor : themes.darkTheme.mainColor
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
    borderRadius: 25,
    height: 48,
    padding: 4,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 16,
    marginBottom: 8
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingLeft: 10,
    backgroundColor: 'transparent',
    color: '#424242',
  },
  listPopular: {
    flex: 1,
    marginTop : 10,
    paddingLeft : 10
  },
})

export default withNavigationFocus(Search);
