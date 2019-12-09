/* @flow weak */

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import Step from './Step';

class MultiStepForm extends PureComponent {
  static Step = Step;

  state = {
    index: 0,
    values: {
      ...this.props.initialValues
    }
  };

  _nextStep = () => {
    if( this.state.index != this.props.children.length - 1){
      this.setState(prevState => ({
        index: prevState.index + 1,
      }))
    }
  };
  _prevStep = () => {
    if( this.state.index != 0){
      this.setState(prevState => ({
        index: prevState.index - 1,
      }))
    }
  };
  _onChangeValue = (name, value) => {
    this.setState( prevState => ({
      values: {
        ...prevState.values,
        [name]: value,
      }
      }))
  };
  _onSubmit = () => {
    this.props.onSubmit(this.state.values);
  }
  render() {
    return (
      <View style={ styles.formContainer }>
        {
          React.Children.map(this.props.children, (el, index) => {
            if ( index === this.state.index) {
              return React.cloneElement(el, {
                values: this.state.values,
                currentIndex: this.state.currentIndex,
                nextStep: this._nextStep,
                prevStep: this._prevStep,
                isLast: this.state.index === this.props.children.length - 1,
                onChangeValue: this._onChangeValue,
                onSubmit: this._onSubmit
              });
            };
            return null;
          })
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 5,
  },
});
export default MultiStepForm;
