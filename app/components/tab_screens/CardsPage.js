import React, { Component, PropTypes } from 'react';
import { View, AlertIOS, Text, Image } from 'react-native';
import { Container, Icon, DeckSwiper, Card, CardItem, Body, Button } from 'native-base';
import Toast from 'react-native-simple-toast';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'


export default class CardsPage extends Component {
  state = {
    cardIndex:0,
    cardCount:0,
    vote:null,
    cards: [],
    loaded: false
  };

  componentDidMount() {
    this.fetchSurveys();
  };

  fetchSurveys = () => {
    var dc = new DataController()
    dc.fetchSurveys((responseJson) => {
      console.log("responseJson:", responseJson)
      this.setState({
        cards: responseJson,
        cardCount: responseJson.length,
        loaded: true
      });
    })
  };

  _onSwipeLeft = () => {
    this.setState({
      vote: 'left',
      cardIndex: this._incrementIndex(this.state.cardIndex)
    }, ()=>{
      //this._alertSelection();
      this.vote();
    });
  };

  _onSwipeRight = () => {
    this.setState({
      vote: 'right',
      cardIndex: this._incrementIndex(this.state.cardIndex)
    }, ()=>{
      //this._alertSelection();
      this.vote();
    });
  };

  vote = () => {
    var dc = new DataController();
    dc.vote({
      user_id: this.props.userId,
      survey_id: this.state.cards[this._previousIndex(this.state.cardIndex)].id,
      vote: this.state.vote
    });
  };

  onSkipButton = () => {
    Toast.show('TODO: implement onSkipButton');
  };

  _previousIndex = (index) => {
    if (index == 0) {
      return this.state.cardCount - 1;
    }
    return index - 1;
  };

  _incrementIndex = (index) => {
    if (index == this.state.cardCount - 1) {
      return 0;
    }
    return index + 1;
  };

  _alertSelection = () => {
    AlertIOS.alert(
     'You Voted:',
     'vote: ' + this.state.vote + ', ' +
     'card index: ' + this._previousIndex(this.state.cardIndex), ', ' +
     'question' + this.state.cards[this._previousIndex(this.state.cardIndex)].id + ', '
    );
  };

  renderLoadingView = () => {
    return (
      <View style={Mystyles.ss.home_container}>
        <Text>
          Loading surveys...
        </Text>
      </View>
    );
  };

  render(){
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    //console.log("cards:", this.state.cards);
    return (
      <Container>
        <SmartHeader
          onPressLeftButton={()=>{
            console.log('In onPressLeftButton');
            this.props.onLogOut();
          }}
          leftButtonIconName='power'
          title='Lets Vote!'
        />
        <View style={{ padding: 16, flex: 1 }}>
          <DeckSwiper
            dataSource={this.state.cards}
            renderItem={item =>
              <Card style={{ elevation: 3 }}>
                <CardItem cardBody>
                  <Body>
                    <Text style={Mystyles.ss.card_question}>{item.question}</Text>
                    <Text style={Mystyles.ss.card_tags}>{item.tags.join(', ')}</Text>
                  </Body>
                </CardItem>
                <CardItem cardBody>
                  <Image style={{ resizeMode: 'stretch', width: null, flex: 1, height: 250 }} source={{uri: DataController.HOST + '/image/' + item.image}} />
                </CardItem>
                <CardItem>
                  <Icon name="arrow-dropleft-circle" style={{ width: 50, fontSize: 50, color: '#ED4A6A', paddingRight: 0 }} />
                  <Text>{item.option_left}</Text>
                  <Body></Body>
                  <Text>{item.option_right}</Text>
                  <Icon name="arrow-dropright-circle" style={{ width: 50, fontSize: 50, color: '#ED4A6A', paddingLeft: 8}} />
                </CardItem>
              </Card>
            }
            onSwipeRight={this._onSwipeRight}
            onSwipeLeft={this._onSwipeLeft}
          />
        </View>
        <View style={{ paddingBottom: 30, flexDirection: 'row', justifyContent: 'center' }}>
          <Button
            primary transparent
            onPress={this.onSkipButton}>
            <Icon name="close-circle" style={{fontSize: 50, color: 'dodgerblue' }}/>
          </Button>
        </View>
      </Container>
    );
  }
}