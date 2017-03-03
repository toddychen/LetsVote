import React, { Component, PropTypes } from 'react';
import { View, AlertIOS, Text, Image, ImagePickerIOS, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { Container, Content, Label, Button, Badge } from 'native-base';
import TagInput from 'react-native-tag-input';
import Toast from 'react-native-simple-toast';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'

const dismissKeyboard = require('dismissKeyboard')

export default class MyProfile extends Component {
  state = {
    id: this.props.userId,
    badges: [],
    tags: [],
    new_profile_image: null,
    existing_profile_image: '',
    loaded: false
  };

  componentDidMount = () => {
    this.fetchUser();
  };

  fetchUser = () => {
    var dc = new DataController()
    dc.fetchUser(this.props.userId ,(responseJson) => {
      console.log("responseJson:", responseJson)
      this.setState({
        tags: responseJson.tags,
        badges: responseJson.badges,
        existing_profile_image: responseJson.profile_image,
        loaded: true
      });
    })
  };

  _pickImage = () => {
    // openSelectDialog(config, successCallback, errorCallback);
    ImagePickerIOS.openSelectDialog({}, imageUri => {
      this.setState({ new_profile_image: imageUri });
    }, () => console.log('Did not pick an image.'));
  };

  _onImagePickerPress = () => {
    this._pickImage();
  };

  _onSubmitPress = () => {
    var dc = new DataController()
    if (this.state.new_profile_image) {
      dc.uploadImage(
        this.state.new_profile_image,
        this.state.id + '.png',
        'profile',
        (filename) => {
          this.setState({ existing_profile_image: filename }, ()=>{
            //this.alertProfileData();
            // make the dc call to update the user
            dc.updateUser({
              id: this.state.id,
              tags: this.state.tags,
            });
            Toast.show('Profile updated successfully!');
          })
        }
      );
    } else {
      dc.updateUser({
        id: this.state.id,
        tags: this.state.tags,
      });
      Toast.show('Profile updated successfully!');
    }
  };

  _onTagChange = (tags) => {
    console.log(tags);
    this.setState({ tags: tags });
  };

  alertProfileData = () => {
    AlertIOS.alert(
      'My Profile',
      'id: ' + this.state.id + ', ' +
      'tags: ' + this.state.tags.join(', ') + ', ' +
      'existing_profile_image: ' + this.state.existing_profile_image
    );
  };

  render(){
    const badgesRendered = this.state.badges.map((badge) => {
      return (
        <Badge key={badge} warning>
          <Text style={Mystyles.ss.badge_label}>
            {badge}
          </Text>
        </Badge>
      )
    })

    return (
     <Container>
      <SmartHeader
        onPressLeftButton={this.props.onPopRoute}
        leftButtonIconName='arrow-back'
        title="My Profile"
      />
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={Mystyles.ss.profile_top_view}>
          <View style={{ flex: 3, marginBottom: 8}}>
          {this.state.new_profile_image?
            <Image style={{ height: 120, width: 120 }} source={{ uri: this.state.new_profile_image }} /> :
            <Image style={{ height: 120, width: 120 }} source={{ uri: DataController.HOST + '/image/' + this.state.existing_profile_image}} />
          }
          <TouchableOpacity
            onPress={this._onImagePickerPress}>
            <Text style={{ paddingTop: 16, color:'blue' }}>Change Profile Image</Text>
          </TouchableOpacity>
          </View>
          <View style={{ flex: 2 }}>
            <Label>Vote ID:</Label>
            <Label>{this.state.id}</Label>
            <View style={{marginTop: 8}}>
              {badgesRendered}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>

      <View style={Mystyles.ss.profile_tags_view} >
        <Label>Tags</Label>
        <TagInput
          value={this.state.tags}
          onChange={(tags) => this._onTagChange(tags)}
          numberOfLines={6}
          tagColor="darkturquoise"
          tagTextColor="white"
          inputProps={{ keyboardType: 'default', placeholder: 'Type more tags here.', autoFocus: false, }}
          tagContainerStyle={{ borderRadius: 5 }}
          separators={[',']}
        />
      </View>

      <View style={{ paddingTop: 16, paddingBottom: 16}}>
        <Button
          rounded
          style={{ alignSelf: 'center' }}
          onPress={this._onSubmitPress}
        >
          <Text>Submit</Text>
        </Button>
      </View>
    </Container>
    );
  }
}