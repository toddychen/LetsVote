import React, { Component, PropTypes } from 'react';
import { View, SegmentedControlIOS, TextInput, DatePickerIOS, TouchableHighlight, AlertIOS, Image } from 'react-native';
import { Container, Icon, DeckSwiper, Card, CardItem, Left, Right, Body, Thumbnail, H2, Content, List, ListItem, Text, Button, Header, Item, Input } from 'native-base';
import Mystyles from '../styles/Mystyles'
import { Text as OriginalText } from 'react-native';
import {SmartHeader} from './SmartHeader'
import DataController from '../utils/DataController'


export default class Votes extends Component {
  state = {
    surveys: [],
    loaded: false
  };

  componentDidMount() {
    this.fetchSurveys();
  };

  fetchSurveys = () => {
    var dc = new DataController()
    dc.fetchSurveys((responseJson) => {
      //console.log("responseJson:", responseJson)
      this.setState({
        surveys: responseJson,
        loaded: true
      });
    })
  };

  convert_percentage(count, total) {
    return Math.round(((count / total) * 100)) + '%';
  };

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
          onPressLeftButton={this.props.onPopRoute}
          leftButtonIconName='arrow-back'
          title='Votes'
          showSearchIcon={true}
        />
        <Content>
          <List
            dataArray={this.state.surveys}
            renderRow={(survey) =>
              <ListItem onPress={this.onPressListItem}>
                <View style={{width: 64}}>
                  <Thumbnail square size={80} source={{uri: DataController.HOST + '/image/' + survey.image}} />
                </View>
                <View style={{flex: 1}}>
                  <OriginalText>{survey.question}</OriginalText>
                  <OriginalText style={{color:'deepskyblue', fontSize: 12, textAlign: 'left'}}>{survey.tags.join(', ')}</OriginalText>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                      <OriginalText
                        style={{color:(survey.my_vote == 'left') ? 'red': 'lightslategray', fontSize: 12 }}>
                        {survey.option_left} ({this.convert_percentage(survey.count_left, survey.count_left + survey.count_right)})
                      </OriginalText>
                    </View>
                    <View style={{flex: 1}}>
                      <OriginalText
                        style={{color:(survey.my_vote == 'right') ? 'red': 'lightslategray', fontSize: 12 }}>
                        {survey.option_right} ({this.convert_percentage(survey.count_right, survey.count_left + survey.count_right)})
                      </OriginalText>
                    </View>
                  </View>
                </View>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}
