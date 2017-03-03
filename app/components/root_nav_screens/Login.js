import React, { Component, PropTypes } from 'react';
import { AlertIOS } from 'react-native';
import { Container, Icon, Form, Content, Text, Button, Item, Input } from 'native-base';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'


export default class Login extends Component {
  state = {
    username:'',
    passwordHash:''
  };

  onLogin = () => {
    /*
    AlertIOS.alert(
     'TODO:',
     'Implement Login Auth.'
    );
    */
    this.props.onNavigationChange('push', 'main');
  };

  render() {
    return (
      <Container>
        <SmartHeader
          onPressLeftButton={this.props.onPopRoute}
          leftButtonIconName='arrow-back'
          title='Login'
        />
        <Content>
          <Form style={Mystyles.objss.login_form}>
            <Item underline>
              <Icon name='contact' style={Mystyles.objss.login_icon}></Icon>
              <Input
                style={Mystyles.objss.login_input}
                onChangeText={(text) => this.setState({question:text})}
                placeholder='Username'
              />
            </Item>
            <Item underline>
              <Icon name='lock' style={Mystyles.objss.login_icon}></Icon>
              <Input
                style={Mystyles.objss.login_input}
                onChangeText={(text) => this.setState({passwordHash:text})}
                placeholder='Password'
                secureTextEntry={true}
              />
            </Item>
          </Form>
          <Button
            outline bordered
            style={Mystyles.objss.login_button}
            onPress={this.onLogin}>
            <Text>Login</Text>
          </Button>

        </Content>
      </Container>
    );
  }
}
