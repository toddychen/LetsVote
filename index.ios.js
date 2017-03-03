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

import App from './app/App'

class LetsVote extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('LetsVote', () => LetsVote);
