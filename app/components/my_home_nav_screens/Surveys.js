import React, { Component, PropTypes } from 'react';
import { View, SegmentedControlIOS, TextInput, DatePickerIOS, TouchableHighlight, AlertIOS, Image } from 'react-native';
import { Container, Icon, DeckSwiper, Card, CardItem, Left, Right, Body, Thumbnail, H2, Content, List, ListItem, Text, Button } from 'native-base';
import { Text as OriginalText } from 'react-native';
import {Pie} from 'react-native-pathjs-charts'

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'


export default class Surveys extends Component {
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

  getPieData = (survey) => {
    let data = [{
      "name": survey.option_left,
      "population": survey.count_left,
    },{
      "name": survey.option_right,
      "population": survey.count_right,
    }];
    return data;
  };

  renderLoadingView = () => {
    return (
      <View style={Mystyles.home_container}>
        <Text>
          Loading surveys...
        </Text>
      </View>
    );
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    console.log("surveys:", this.state.surveys);
    let pieChartOptions = {
      margin: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      },
      width: 160,
      height: 160,
      color: '#2980B9',
      r: 10,
      R: 75,
      legendPosition: 'topLeft',
      animate: {
        type: 'oneByOne',
        duration: 200,
        fillTransition: 100
      },
      label: {
        fontFamily: 'Arial',
        fontSize: 12,
        fontWeight: true,
        color: '#ECF0F1'
      },
      pallete: [
        {'r':244,'g':67,'b':54},
        {'r':33,'g':150,'b':243},
        {'r':190,'g':31,'b':69},
        {'r':100,'g':36,'b':199},
        {'r':214,'g':207,'b':32},
        {'r':198,'g':84,'b':45}]
    }

    return (
      <Container>
        <SmartHeader
          onPressLeftButton={this.props.onPopRoute}
          leftButtonIconName='arrow-back'
          title="Surveys"
          showSearchIcon={true}
        />
        <Content>
          <List
            dataArray={this.state.surveys}
            renderRow={(survey) =>
              <ListItem thumbnail button onPress={this.onPressListItem} style={{ paddingRight: 16}}>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail square size={80} source={{uri: DataController.HOST + '/image/' + survey.image}} />
                      <Body>
                        <Text>{survey.question}</Text>
                        <Text note>{survey.tags.join(', ')}</Text>
                      </Body>
                    </Left>
                  </CardItem>
                    <Left>
                      <Body>
                        <Pie
                        data={this.getPieData(survey)}
                        options={pieChartOptions}
                        accessorKey="population" />
                      </Body>
                      <Body style={{flex:1, flexDirection: 'row'}}>
                        <Body>
                          <OriginalText
                            style={{flex: 1, color:'#2196F3', textAlign:'right', paddingRight:8}}>
                            {survey.option_right}
                          </OriginalText>
                          <OriginalText
                            style={{flex: 1, color:'#2196F3', textAlign:'right', paddingRight:8}}>
                            {'' + survey.count_right} ({this.convert_percentage(survey.count_right, survey.count_left + survey.count_right)})
                          </OriginalText>
                        </Body>
                        <Body>
                          <OriginalText
                            style={{flex: 1, color:'#E91E63', paddingLeft:8}}>
                            {survey.option_left}
                          </OriginalText>
                          <OriginalText
                            style={{flex: 1, color:'#E91E63', paddingLeft:8}}>
                            {'' + survey.count_left}  ({this.convert_percentage(survey.count_left, survey.count_left + survey.count_right)})
                          </OriginalText>
                        </Body>
                      </Body>
                    </Left>
                  <CardItem>
                  </CardItem>
                </Card>
              </ListItem>
            }
          />
        </Content>
      </Container>
    );
  }
}
