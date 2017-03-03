import React, { Component, PropTypes } from 'react';
import { View, TouchableHighlight, TouchableOpacity, AlertIOS, ListView } from 'react-native';
import { Container, Thumbnail, Content, Text } from 'native-base';
import { Text as OriginalText } from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'


export default class Votes extends Component {
  state = {
    fetchedSurveys: [],
    surveys: [],
    loaded: false,
    ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
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

  archiveRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].closeRow();
    const newSurveys = [...this.state.surveys];
    newSurveys.splice(rowId, 1);
    this.setState({surveys: newSurveys});
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
    return (
      <Container>
        <SmartHeader
          onPressLeftButton={this.props.onPopRoute}
          leftButtonIconName='arrow-back'
          title='Votes'
          showSearchIcon={true}
          onSearchTextChange={this.onSearchTextChange.bind(this)}
        />
        <Content>
          <SwipeListView
            dataSource={this.state.ds.cloneWithRows(this.state.surveys)}
            renderRow={ survey => (
              <TouchableHighlight
                onPress={ _ => console.log('You touched me') }
                style={Mystyles.ss.votes_rowFront}
                underlayColor={'#E3E3E3'}
              >
                <View style={{flexDirection: 'row', padding: 4}}>
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
                </View>
              </TouchableHighlight>
            )}
            renderHiddenRow={ (data, secId, rowId, rowMap) => (
              <View style={Mystyles.ss.votes_rowBack}>
                <TouchableOpacity style={[Mystyles.ss.votes_backRightBtn, Mystyles.ss.votes_backRightBtnRight]} onPress={ _ => this.archiveRow(secId, rowId, rowMap) }>
                  <Text style={{color: '#FFFFFF'}}>Archive</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
            disableRightSwipe={true}
            enableEmptySections={true}
          />

        </Content>
      </Container>
    );
  }
}
