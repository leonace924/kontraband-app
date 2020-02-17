import React from 'react';
import { StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import AppNavigator from './App/config/AppNavigator';
import rootReducer from './App/reducers';
import rootSaga from './App/sagas';
import { MenuProvider } from 'react-native-popup-menu';
import { ThemeContext } from "./App/context";
import Loading from './App/components/Loading';
import LoadingHolder from './App/components/Loading/LoadingHolder';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      theme : 'light'
    };
  }

  componentDidMount = async () => {
    let theme = await AsyncStorage.getItem('theme');
    this.setState({ theme: theme ? theme : 'light' })
  }

  toggleTheme = () => {
    this.setState( preState => ({ theme : preState.theme == 'light' ? 'dark' : 'light' }), () => {
      AsyncStorage.setItem('theme', this.state.theme);
    });
  }

  render(){
    return (
        <MenuProvider>
          <ThemeContext.Provider value={{ theme : this.state.theme, switchTheme : this.toggleTheme }}>
            <View style={styles.container}>
              <StatusBar
                backgroundColor="#222020"
                barStyle="light-content"
              />
              <Provider store={store}>
                <AppNavigator />
              </Provider>
              <Loading ref={(ref) => LoadingHolder.setLoading(ref)}/>
            </View>
          </ThemeContext.Provider>
        </MenuProvider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
});
