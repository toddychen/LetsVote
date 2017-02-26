import React, { Component, PropTypes } from 'react';
import { View, SegmentedControlIOS, TextInput, DatePickerIOS, TouchableHighlight, AlertIOS, Text, Image, ImagePickerIOS, TouchableOpacity } from 'react-native';
import { Container, Icon, DeckSwiper, Card, CardItem, Left, Right, Body, Thumbnail, H2, Input, Content, Form, Item, Label, Button } from 'native-base';
import Mystyles from '../styles/Mystyles'
import {SmartHeader} from './SmartHeader'
import DataController from '../utils/DataController'

export default class NewQuestion extends Component {
  state = {
    question: '',
    body: '',
    image: '',
    new_image: null,
    tags: [],
    option_left: '',
    option_right: ''
  };


  _pickImage = () => {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ new_image: imageUri });
    }, error => console.error(error));
  };

  _onImagePickerPress = () => {
    this._pickImage();
  };

  _onSubmitPress = () => {
    var dc = new DataController()
    if (this.state.new_image) {
      dc.uploadImage(
        this.state.new_image,
        'survey_image_template.jpg',
        'survey',
        (filename) => {
          this.setState({ image: filename }, ()=>{
            AlertIOS.alert(
              'My Profile',
              'question: ' + this.state.question + ', ' +
              'tags: ' + this.state.tags.join(', ') + ', ' +
              'body: ' + this.state.body + ', ' +
              'option_left: ' + this.state.option_left + ', ' +
              'option_right: ' + this.state.option_right + ', ' +
              'image: ' + this.state.image + ', '
            );
            // make the dc call to update the user
            let filenameArray = filename.split('.')[0].split('_');
            let id = filenameArray[filenameArray.length-1];
            dc.createSurvey({
              question: this.state.question,
              body: this.state.body,
              tags: this.state.tags,
              option_left: this.state.option_left,
              option_right: this.state.option_right,
              count_left: 0,
              count_right: 0,
              image: this.state.image,
            })
          })
        }
      );
    } else {
      dc.createSurvey({
        question: this.state.question,
        body: this.state.body,
        tags: this.state.tags,
        option_left: this.state.option_left,
        option_right: this.state.option_right,
        count_left: 0,
        count_right: 0,
        image: '',
      })
    }

    /*
    AlertIOS.alert(
      'Your Survey',
      'question: ' + this.state.question + ', ' +
      'tags: ' + this.state.tags.join(', ') + ', ' +
      'body: ' + this.state.body + ', ' +
      'option_left: ' + this.state.option_left + ', ' +
      'option_right: ' + this.state.option_right + ', ' +
      'image: ' + ', '
    );
    */
  };


  render(){
    return (
     <Container>
      <SmartHeader
        onPressLeftButton={this.props.onLogOut}
        leftButtonIconName='power'
        title="Compose"
      />
      <Content style={{ padding: 16 }}>
        <Form>
          <Item stackedLabel underline>
            <Label>Question</Label>
            <Input
              style={{height:25}}
              onChangeText={(text) => this.setState({question:text})}
            />
          </Item>
          <Item stackedLabel underline>
            <Label>Tag(s)</Label>
            <Input
              style={{height:25, fontSize: 14}}
              onChangeText={(text) => this.setState({tags:text.split(',')})}
            />
          </Item>
          <Item underline>
            <Input
              style={{height:75, fontSize: 14}}
              placeholder='Additional Body (Optional)'
              editable={true}
              multiline={true}
              numberOfLines={3}
              onChangeText={(text) => this.setState({body:text})}
            />
          </Item>
          <Item underline>
            <Icon name="arrow-dropleft-circle" style={{ color: '#ED4A6A' }} />
            <Input
              placeholder='Answer A'
              style={{fontSize: 14}}
              onChangeText={(text) => this.setState({option_left:text})}
            />
            <Icon name="arrow-dropright-circle" style={{ color: '#ED4A6A', paddingLeft: 12}} />
            <Input
              placeholder='Answer B'
              style={{fontSize: 14}}
              onChangeText={(text) => this.setState({option_right:text})}
            />
          </Item>
          <View style={{ flex: 1, padding: 16 }}>
            <TouchableOpacity
              onPress={this._onImagePickerPress}>
              <Text style={{ paddingBottom: 16, color:'blue' }}>Select Image (Optional)</Text>
            </TouchableOpacity>
            {this.state.new_image?
              <Image style={{ height: 180 }} source={{ uri: this.state.new_image }} /> :
              null
            }
          </View>
        </Form>
        <View style={{ paddingTop: 8}}>
        <Button
          rounded
          style={{ alignSelf: 'center' }}
          onPress={this._onSubmitPress}
        >
          <Text>Submit</Text>
        </Button>
        </View>
      </Content>
    </Container>
    );
  }
}