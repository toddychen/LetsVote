import React, { Component, PropTypes } from 'react';
import { View, Image, TouchableOpacity, Animated} from 'react-native';
import Dimensions from 'Dimensions';

import Mystyles from '../../../styles/Mystyles'
import SmartHeader from '../utils/SmartHeader'
import DataController from '../../../utils/DataController'

export default class Splash extends Component {
  state = {
    arrowColor: 'gold',
    backgroundColor: 'transparent', //'rgba(255,215,0,0.3)'
    bounceValue: new Animated.Value(1.1)
  };

  componentDidMount() {
    this.cycleAnimation();
  }

  cycleAnimation = () => {
    Animated.sequence([
      Animated.spring(this.state.bounceValue, {
        toValue: 1,
        friction: 1,
      }),
      Animated.timing(this.state.bounceValue, {
        toValue: 1.1,
        duration: 100,
        delay: 1000,
      })
    ]).start(() => {
      this.cycleAnimation();
    });
  };

  render() {
    return (
      <View>
        <Image
          source={require('../../../resources/images/splash.png')}
          resizeMode='stretch'
          style={{width:Dimensions.get('window').width, height:Dimensions.get('window').height}}>
          <View style={Mystyles.ss.splash_position_view}>
          </View>
          <TouchableOpacity
            style={Mystyles.ss.splash_arrow_view}
            onPress={()=>{this.props.onNavigationChange('push', 'login')}}>
            <Animated.Text
              style={{
                fontSize: 70,
                textAlign: 'center',
                backgroundColor: this.state.backgroundColor,
                color: this.state.arrowColor,
                transform: [                        // `transform` is an ordered array
                  {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                ]
              }}
            >
              {'>                  <'}
            </Animated.Text>
          </TouchableOpacity>
        </Image>
      </View>
    );
  }
}
