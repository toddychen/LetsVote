import React, { Component, PropTypes } from 'react';
import { Animated, View, AlertIOS, ListView } from 'react-native';
import { Container, Card, CardItem, Left, Right, Body, Thumbnail, Content, List, ListItem, Text } from 'native-base';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'

import ComparisonBar from '../utils/ComparisonBar'
import ComparisonBar2 from '../utils/ComparisonBar2'

export default class Surveys extends Component {
  state = {
    fetchedSurveys: [],
    surveys: [],
    loaded: false,
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
  };

  componentDidMount() {
    this.fetchSurveys();
    //setTimeout(() => {this.setState({loaded: false})}, 2000)
  };

  fetchSurveys = () => {
    var dc = new DataController()
    dc.fetchSurveys((responseJson) => {
      //console.log("responseJson:", responseJson)
      this.setState({
        surveys: responseJson,
        fetchedSurveys: responseJson,
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

  onSearchTextChange(searchText) {
    let searchTextLower = searchText.toLowerCase()
    const newSurveys = [];
    for (let survey of this.state.fetchedSurveys) {
      if (survey.question.toLowerCase().includes(searchTextLower) || survey.tags.includes(searchTextLower)) {
        newSurveys.push(survey)
      }
    }
    this.setState({surveys: newSurveys});
  };

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <Container>
        <SmartHeader
          onPressLeftButton={this.props.onPopRoute}
          leftButtonIconName='arrow-back'
          title="Surveys"
          showSearchIcon={true}
          onSearchTextChange={this.onSearchTextChange.bind(this)}
        />
        <Content>
          <ListView
            dataSource={this.state.ds.cloneWithRows(this.state.surveys)}
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
                  <Body>
                    <ComparisonBar
                      leftNumber={survey.count_left}
                      leftLabel={survey.option_left}
                      rightNumber={survey.count_right}
                      rightLabel={survey.option_right}
                      viewStyle={{height:18, width:300, flexDirection: 'row'}}
                      loaded={this.state.loaded}
                    />
                  </Body>
                </Card>
              </ListItem>
            }
            enableEmptySections={true}
          />
        </Content>
      </Container>
    );
  }
}
