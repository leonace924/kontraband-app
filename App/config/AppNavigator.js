import React from "react";
import { createAppContainer, createDrawerNavigator, createSwitchNavigator, createStackNavigator } from "react-navigation";
import SideMenu from '../components/SideMenu';
import Home from "../screen/Home";
import Report from "../screen/Report";
import Profile from "../screen/Profile";
import Login from "../screen/Login";
import PostDetail from "../screen/PostDetail";
import SearchResult from "../screen/SearchResult";
import SignUp from "../screen/SignUp";
import Tags from "../screen/Tags";
import Search from "../screen/Search";
import PostCreate from '../screen/PostCreate/PostCreate';
import DrawerButton from "../components/Navigation/DrawerButton";
import LogoTitle from "../components/Navigation/LogoTitle";
import PostCreateIcon from "../components/Navigation/PostCreateIcon";
import CommentList from '../screen/Comments/CommentList';

const navigationOptions = {
  headerTitle: <LogoTitle />,
  headerLeft: <DrawerButton />,
  headerRight: <PostCreateIcon />
}

const AuthStack = createSwitchNavigator(
  {
    Login: { screen: Login},
    SignUp: { screen: SignUp}
  },
  {
    initialRouteName: "Login",
    headerMode: "none"
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: Home, navigationOptions: navigationOptions },
    Report: { screen: Report, navigationOptions: navigationOptions },
    PostDetail: { screen: PostDetail, navigationOptions: navigationOptions },
    Profile: { screen: Profile, navigationOptions: navigationOptions },
    Tags: { screen: Tags, navigationOptions: navigationOptions },
    PostCreate: { screen: PostCreate, navigationOptions: navigationOptions },
    CommentList: { screen: CommentList, navigationOptions: navigationOptions },
    Search: { screen: Search, navigationOptions: navigationOptions },
    SearchResult : { screen : SearchResult, navigationOptions }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#c4201b'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const Drawer = createDrawerNavigator(
  {
    Home: { screen: HomeStack }
  },
  {
    initialRouteName: 'Home',
      contentComponent: SideMenu
  }
);

export const RootStack = createStackNavigator({
  Drawer: {
    screen: Drawer,
    navigationOptions: { header: null }
  },
});

export default createAppContainer(
  createSwitchNavigator(
    {
      RootStack,
      AuthStack
    },
    {
      initialRouteName: 'RootStack',
    }
  )
);
