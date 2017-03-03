import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';
import { NavigationExperimental } from 'react-native';
const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

import RootNavigator from './navigators/RootNavigator'


export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      // This defines the initial navigation state.
      navigationState: {
        index: 0,
        routes: [{key: 'splash'}],
      },
    };
    this._onNavigationChange = this._onNavigationChange.bind(this);
  }

  _onNavigationChange(type, routeKey) {
    let {navigationState} = this.state;
    switch (type) {
      case 'push':
        const route = {key: routeKey};
        //const route = {key: 'Route-' + Date.now()};
        navigationState = NavigationStateUtils.push(navigationState, route);
        break;
      case 'pop':
        navigationState = NavigationStateUtils.pop(navigationState);
        break;
    }

    if (this.state.navigationState !== navigationState) {
      this.setState({navigationState});
    }
  }

  render() {
    return (
      <RootNavigator
        navigationState={this.state.navigationState}
        onNavigationChange={this._onNavigationChange}
      />
    );
  }

}
