import React from 'react-native';
import { StyleSheet } from 'react-native';

const Mystyles = {
  ss: StyleSheet.create({
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
      fontSize: 20,
      margin: 8,
    },
    card_tags: {
      fontSize: 15,
      margin: 8,
      marginTop: 0,
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
    },
    splash_position_view: {
      flex: 1
    },
    splash_arrow_view: {
      height: 135
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#8BC645',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      backgroundColor: 'blue',
      right: 75
    },
    votes_rowFront: {
      alignItems: 'center',
      backgroundColor: '#E9E9EF',
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1,
      justifyContent: 'center',
      //height: 50,
    },
    votes_rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      //paddingLeft: 15,
    },
    votes_backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75
    },
    votes_backRightBtnRight: {
      backgroundColor: 'red',
      right: 0
    },
  }),
  objss: {
    login_form: {
      paddingTop: 160,
      paddingBottom: 16,
      paddingLeft: 48,
      paddingRight: 64
    },
    login_icon: {
      width: 45,
      textAlign: 'center'
    },
    login_input: {
      height:45
    },
    login_button: {
      alignSelf: 'center'
    },
  }
};

module.exports = Mystyles