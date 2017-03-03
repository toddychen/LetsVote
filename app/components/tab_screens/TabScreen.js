import React, { Component } from 'react';
import { NavigationExperimental } from 'react-native';
const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

import CardsPage from './CardsPage'
import NewQuestion from './NewQuestion'
import MyHomeNavigator from '../../navigators/MyHomeNavigator'


export default class TabScreen extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      //initial navigation state.
      navigationState: {
        index: 0,
        routes: [{key: 'my_home'}],
      },
    };
    this._onNavigationChange = this._onNavigationChange.bind(this);
  };

  _onNavigationChange(type, routeKey) {
    let {navigationState} = this.state;

    switch (type) {
      case 'push':
        const route = {key: routeKey};
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
    if (this.props.tab == 'vote') {
      return (
        <CardsPage
          userId={this.props.userId}
          onLogOut={this.props.onLogOut}
        />
      );
    } else if (this.props.tab == 'compose') {
      return (
        <NewQuestion
          userId={this.props.userId}
          onLogOut={this.props.onLogOut}
        />
      );
    } else if (this.props.tab == 'my_home') {
      return (
        <MyHomeNavigator
          userId={this.props.userId}
          navigationState={this.state.navigationState}
          onNavigationChange={this._onNavigationChange}
          onLogOut={this.props.onLogOut}
        />
      );
    }

  }
}