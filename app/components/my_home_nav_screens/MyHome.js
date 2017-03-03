import React, { Component, PropTypes } from 'react';
import { AlertIOS } from 'react-native';
import { Container, Icon, Left, Body, Content, ListItem, Text } from 'native-base';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'


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