import React, { Component, PropTypes } from 'react';
import { Icon, Left, Right, Body, Text, Button, Header, Title, Item,Input } from 'native-base';


export class SmartHeader extends Component {
  state = {
    searchMode: false,
  };

  selectSearchMode = () => {
    this.setState({searchMode: true});
  };

  cancelSearchMode = () => {
    this.setState({searchMode: false});
  };

  renderSearchIcon = () => {
    if (this.props.showSearchIcon) {
      return (
        <Right>
          <Button transparent onPress={this.selectSearchMode}>
            <Icon name='search'/>
          </Button>
        </Right>
      );
    } else {
      return (
        <Right />
      );
    }
  };

  render() {
    let searchIcon = this.renderSearchIcon();
    if (this.state.searchMode) {
      return (
        <Header searchBar rounded>
          <Item>
              <Icon name="search" />
              <Input placeholder="Search" />
              <Icon active name="archive" />
          </Item>
          <Button transparent onPress={this.cancelSearchMode}>
              <Text>Cancel</Text>
          </Button>
        </Header>
      );
    } else {
      return (
        <Header>
          <Left>
            <Button transparent onPress={this.props.onPressLeftButton}>
              <Icon name={this.props.leftButtonIconName} />
            </Button>
          </Left>
          <Body>
            <Title>{this.props.title}</Title>
          </Body>
          {searchIcon}
        </Header>
      );
    }
  }
}