/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';

import Main from './components/Main'

import { Container, Header, Title, Content, Button, Footer, FooterTab, Text, Body, Left, Right, Icon } from 'native-base';
import Mystyles from './styles/Mystyles'


export default class LetsVote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'vote',
      tabTitle: "Let's Vote",
      userId: 'yicyahoo'
    };
  }


  toggleTabVote = () => {
    this.setState({
      tab: 'vote',
      tabTitle: "Let's Vote"
    });
  };

  toggleTabNew = () => {
    this.setState({
      tab: 'new',
      tabTitle: "Compose"
    });
  };

  toggleTabMe = () => {
    this.setState({
      tab: 'me',
      tabTitle: "My Home"
    });
  };

  _onLogOut = () => {
    AlertIOS.alert(
     'Logout',
     'TODO: implement logout'
    );
  };

  render() {
    return (
      <Container>
        <Main
          userId={this.state.userId}
          tab={this.state.tab}
          onLogOut={this._onLogOut}
        />
        <Footer>
          <FooterTab>
            <Button active={this.state.tab == 'vote'} onPress={() => this.toggleTabVote()} >
              <Icon active={this.state.tab == 'vote'} name="hand" />
              <Text>Vote</Text>
            </Button>
            <Button active={this.state.tab == 'new'} onPress={() => this.toggleTabNew()} >
              <Icon active={this.state.tab == 'new'} name="create" />
              <Text>New</Text>
            </Button>
            <Button active={this.state.tab == 'me'} onPress={() => this.toggleTabMe()} >
              <Icon active={this.state.tab == 'me'} name="home" />
              <Text>Me</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}

AppRegistry.registerComponent('LetsVote', () => LetsVote);
