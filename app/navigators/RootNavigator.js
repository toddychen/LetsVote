import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';

import Mystyles from '../../styles/Mystyles'
import Splash from '../components/root_nav_screens/Splash'
import Login from '../components/root_nav_screens/Login'
import Main from '../components/root_nav_screens/Main'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;


export default class RootNavigator extends Component {
  constructor(props, context) {
    super(props, context);

    //this._onPushRoute = this.props.onNavigationChange;
    this._onPopRoute = this.props.onNavigationChange.bind(this, 'pop', '');
    this._renderScene = this._renderScene.bind(this);

    this.state = {
      userId: '',
      authorized: false
    };
  }

  _onLogOut = () => {
    //console.log('In _onLogOut in RootNavigator');
    this._onPopRoute();
    this.setState({
      userId: '',
      authorized: false
    })
  };

  render() {
    return (
      <NavigationCardStack
        onNavigateBack={this._onPopRoute}
        navigationState={this.props.navigationState}
        renderScene={this._renderScene}
        style={Mystyles.navigator}
        enableGestures={false}
      />
    );
  }

  _renderScene(sceneProps) {
    console.log('sceneProps.scene.key: ', sceneProps.scene.key);

    if (sceneProps.scene.key == 'scene_splash'){
      return (
        <Splash
          route={sceneProps.scene.route}
          onNavigationChange={this.props.onNavigationChange}
        />
      );
    } else if (sceneProps.scene.key == 'scene_login') {
      return (
        <Login
          route={sceneProps.scene.route}
          onNavigationChange={this.props.onNavigationChange}
          onPopRoute={this._onPopRoute}
        />
      );
    } else if (sceneProps.scene.key == 'scene_main') {
      return (
        <Main
          userId='yicyahoo'
          route={sceneProps.scene.route}
          onLogOut={this._onLogOut}
        />
      );
    }

  }
}
