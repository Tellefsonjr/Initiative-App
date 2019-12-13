/* @flow weak */

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Button,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FormButton from './FormButton';

class Step extends PureComponent {
  state = { }
  render() {
    return (
      <View style={ styles.stepContainer }>
        { this.props.children({
          onChangeValue: this.props.onChangeValue,
          values: this.props.values
          }) }
        <View style={ styles.buttonContainer }>
          <View style={ styles.button }>
            <FormButton icon="arrow-left" iconPosition="left" text="Previous" color={ this.props.currentIndex == 0 ? 'rgba(0, 87, 138, 0.6)' : '#00578A'} onPress={ this.props.prevStep } />
          </View>
          <View style={ styles.button }>
            { this.props.isLast ?
              <FormButton icon="checkbox-marked-circle-outline" iconPosition="right" text="Submit" color='#00578A' onPress={ this.props.onSubmit } />
              :
              <FormButton icon="arrow-right" iconPosition="right" text="Next" color='#00578A' onPress={this.props.nextStep} />
            }
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // stepContainer: {
  //   flex: 1
  // },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    width: '50%',
  },
});
export default Step;
