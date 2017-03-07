import React, { Component, PropTypes } from 'react';
import { Animated, Easing, View, AlertIOS, Text, Image, ImagePickerIOS, TouchableOpacity, ScrollView, TouchableWithoutFeedback } from 'react-native';

export default class ComparisonBar extends Component {
  constructor () {
    super();
    this.animatedValue = new Animated.Value(0);
    this.state = {
      loaded: false
    }
  };

  componentDidMount() {
    //this.animate();
    this.setState({
      loaded: this.props.loaded
    })
  };

  componentWillUpdate() {
    this.animate();
  };

  animate () {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start()
  };

  convert_percentage(count, total) {
    return Math.round(((count / total) * 100)) + '%';
  };

  render() {
    if (!this.state.loaded) {
      return (
        <View style={{paddingTop: 4, paddingBottom: 4}}>
        </View>
      );
    }

    this.totalWidth = this.props.viewStyle.width;
    this.totalNumber = this.props.leftNumber + this.props.rightNumber;
    this.leftWidth = this.totalWidth * ( this.props.leftNumber / this.totalNumber );
    this.rightWidth = this.totalWidth * ( this.props.rightNumber / this.totalNumber );

    let defaultViewStyle = {
      //height:20,
      //width: 300,
      flexDirection: 'row'
    };

    let widthLeft = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.leftWidth]
    })

    let widthMiddle = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.totalWidth, 0]
    })

    let widthRight = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.rightWidth]
    })

    let leftPercentage = this.convert_percentage(this.props.leftNumber, this.totalNumber );
    let rightPercentage = this.convert_percentage(this.props.rightNumber, this.totalNumber );

    return (
      <View style={{paddingTop: 4, paddingBottom: 4}}>
        <View style={[defaultViewStyle, this.props.viewStyle]}>
          <Animated.View style={{width: widthLeft, backgroundColor: '#3E50B4', flexDirection: 'row'}}>
            <Text style={{color:'white', paddingLeft: 4}}>{leftPercentage}</Text>
          </Animated.View>
          <Animated.View style={{width: widthMiddle, backgroundColor: 'lightgray', flexDirection: 'row'}}>
          </Animated.View>
          <Animated.View style={{width: widthRight, backgroundColor: '#FF3F80', flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color:'white', paddingRight: 4}}>{rightPercentage}</Text>
          </Animated.View>
        </View>
        <View style={[defaultViewStyle, this.props.viewStyle]}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{color:'#3E50B4', fontSize: 12}}>{this.props.leftLabel} ({this.props.leftNumber.toString()})</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{color:'#FF3F80', fontSize: 12}}>({this.props.rightNumber.toString()}) {this.props.rightLabel}</Text>
          </View>
        </View>
      </View>
    );
  }

}