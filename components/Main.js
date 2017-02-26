import React, { Component, PropTypes } from 'react';
import { NavigationExperimental } from 'react-native';
import CardsPage from './CardsPage'
import NewQuestion from './NewQuestion'
import { MyHomeNavigator, MyHome } from './MyHome'
import Surveys from './Surveys'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

export default class Main extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      // This defines the initial navigation state.
      navigationState: {
        index: 0, // Starts with first route focused.
        routes: [{key: 'my_home'}], // Starts with only one route.
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
    } else if (this.props.tab == 'new') {
      return (
        <NewQuestion
          userId={this.props.userId}
          onLogOut={this.props.onLogOut}
        />
      );
    } else if (this.props.tab == 'me') {
      return (
        <MyHomeNavigator
          userId={this.props.userId}
          navigationState={this.state.navigationState}
          onNavigationChange={this._onNavigationChange}
          onExit={this._exit}
          onLogOut={this.props.onLogOut}
        />
      );
    }
  }

}