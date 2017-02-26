import React from 'react-native';
import { StyleSheet } from 'react-native';

const Mystyles = StyleSheet.create({
  home_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  home_welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  home_instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  menu_text: {
    fontSize: 24,
    textAlign: 'left',
    margin: 10,
  },
  menu_separator: {
    marginBottom: 1,
    borderBottomWidth: 1,
    borderBottomColor:'gray'
  },
  buttonStyle5: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    width: 120,
    height: 30
  },
  textStyle: {
    color: 'white'
  },
  card_question: {
    fontSize: 22,
    margin: 4,
  },
  card_tags: {
    fontSize: 15,
    margin: 4,
    color: '#919191',
  },
  navigator: {
    flex: 1,
  },
  profile_top_view: {
    marginTop: 32,
    marginLeft: 32,
    marginRight: 32,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray'
  },
  profile_tags_view: {
    flex: 1,
    marginTop: 16,
    marginLeft: 32,
    marginRight: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'darkgray'
  },
  badge_label: {
    color: 'white',
  },
  badge_view: {
    backgroundColor: 'green',
  }
});

module.exports = Mystyles