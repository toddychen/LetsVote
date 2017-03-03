import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';
const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

import Mystyles from '../../styles/Mystyles'
import MyHome from '../components/my_home_nav_screens/MyHome'
import MyProfile from '../components/my_home_nav_screens/MyProfile'
import Surveys from '../components/my_home_nav_screens/Surveys'
import Votes from '../components/my_home_nav_screens/Votes'


export default class MyHomeNavigator extends Component {
  constructor(props, context) {
    super(props, context);
    this._onPopRoute = this.props.onNavigationChange.bind(null, 'pop', '');
    this._renderScene = this._renderScene.bind(this);
  }

  render() {
    return (
      <NavigationCardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        style={Mystyles.ss.navigator}
        enableGestures={false}
      />
    );
  }

  _renderScene(sceneProps) {
    console.log('sceneProps.scene.key: ', sceneProps.scene.key);
    if (sceneProps.scene.key == 'scene_my_home'){
      return (
        <MyHome
          route={sceneProps.scene.route}
          onNavigationChange={this.props.onNavigationChange}
          onPopRoute={this._onPopRoute}
          onLogOut={this.props.onLogOut}
        />
      );
    } else if (sceneProps.scene.key == 'scene_my_profile') {
      return (
        <MyProfile
          userId={this.props.userId}
          route={sceneProps.scene.route}
          onPushRoute={this.props.onNavigationChange}
          onPopRoute={this._onPopRoute}
        />
      );
    } else if (sceneProps.scene.key == 'scene_my_surveys') {
      return (
        <Surveys
          userId={this.props.userId}
          list_type='survey'
          route={sceneProps.scene.route}
          onPushRoute={this.props.onNavigationChange}
          onPopRoute={this._onPopRoute}
        />
      );
    } else if (sceneProps.scene.key == 'scene_my_votes') {
      return (
        <Votes
          userId={this.props.userId}
          route={sceneProps.scene.route}
          onPushRoute={this.props.onNavigationChange}
          onPopRoute={this._onPopRoute}
        />
      );
    }

  }
}
