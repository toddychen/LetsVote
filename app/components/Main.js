import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  AlertIOS,
} from 'react-native';

import { Container, Header, Title, Content, Button, Footer, FooterTab, Text, Body, Left, Right, Icon } from 'native-base';
import Mystyles from '../styles/Mystyles'
import TabScreen from './TabScreen'


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: 'vote',
      tabTitle: "Let's Vote",
      userId: 'yicyahoo'
    };
  };

  toggleTabVote = () => {
    this.setState({
      tab: 'vote',
      tabTitle: "Let's Vote"
    });
  };

  toggleTabNew = () => {
    this.setState({
      tab: 'compose',
      tabTitle: "Compose"
    });
  };

  toggleTabMe = () => {
    this.setState({
      tab: 'my_home',
      tabTitle: "My Home"
    });
  };

  render() {
    return (
      <Container>
        <TabScreen
          userId={this.props.userId}
          tab={this.state.tab}
          onLogOut={this.props.onLogOut}
        />
        <Footer>
          <FooterTab>
            <Button active={this.state.tab == 'vote'} onPress={() => this.toggleTabVote()} >
              <Icon active={this.state.tab == 'vote'} name="hand" />
              <Text>Vote</Text>
            </Button>
            <Button active={this.state.tab == 'compose'} onPress={() => this.toggleTabNew()} >
              <Icon active={this.state.tab == 'compose'} name="create" />
              <Text>New</Text>
            </Button>
            <Button active={this.state.tab == 'my_home'} onPress={() => this.toggleTabMe()} >
              <Icon active={this.state.tab == 'my_home'} name="home" />
              <Text>Me</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }

}