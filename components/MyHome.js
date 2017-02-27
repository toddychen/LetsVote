import React, { Component, PropTypes } from 'react';
import { View, SegmentedControlIOS, TextInput, DatePickerIOS, TouchableHighlight, AlertIOS, Image, NavigationExperimental } from 'react-native';
import { Container, Icon, DeckSwiper, Card, CardItem, Left, Right, Body, Thumbnail, H2, Content, List, ListItem, Text, Button, Header, Title } from 'native-base';
import Mystyles from '../styles/Mystyles'
import { Text as OriginalText } from 'react-native';

import Surveys from './Surveys'
import Votes from './Votes'
import MyProfile from './MyProfile'
import {SmartHeader} from './SmartHeader'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;



export class MyHomeNavigator extends Component {
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
        style={Mystyles.navigator}
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
          onExit={this.props.onExit}
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
          onExit={this.props.onExit}
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
          onExit={this.props.onExit}
        />
      );
    } else if (sceneProps.scene.key == 'scene_my_votes') {
      return (
        <Votes
          userId={this.props.userId}
          route={sceneProps.scene.route}
          onPushRoute={this.props.onNavigationChange}
          onPopRoute={this._onPopRoute}
          onExit={this.props.onExit}
        />
      );

    }

  }
}

export default class MyHome extends Component {

  onPressListItem() {
    AlertIOS.alert(
     'ListItemClicked',
     'Info:'
    );
  };

  render() {
    return (
      <Container>
        <SmartHeader
          onPressLeftButton={this.props.onLogOut}
          leftButtonIconName='power'
          title="MyHome"
        />
        <Content>
          <ListItem icon button onPress={this.props.onNavigationChange.bind(null, 'push', 'my_profile')}>
            <Left>
              <Icon name="contact" style={{color: '#ffc125'}}/>
            </Left>
            <Body>
              <Text>My Profile</Text>
            </Body>
          </ListItem>
          <ListItem icon button onPress={this.props.onNavigationChange.bind(null, 'push', 'my_surveys')}>
            <Left>
              <Icon name="create" style={{color: 'green'}}/>
            </Left>
            <Body>
              <Text>My Surveys</Text>
            </Body>
          </ListItem>
          <ListItem icon button onPress={this.props.onNavigationChange.bind(null, 'push', 'my_votes')}>
            <Left>
              <Icon name="hand" style={{color: 'purple'}}/>
            </Left>
            <Body>
              <Text>My Votes</Text>
            </Body>
          </ListItem>
        </Content>
      </Container>
    );
  }
}