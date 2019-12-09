/* @flow weak */

import React, { PureComponent } from 'react';
import {
  View,Text, StyleSheet, TextInput
} from 'react-native';
import PartyInput from './partyComponents/PartyInput';

class FormInput extends PureComponent {
  state = {
    active: false,
  };
  _onChangeValue = text => {
    this.props.onChangeValue(this.props.name, text);
  };
  toggleActive = () => {
    this.setState(prevState => ({
      active: !prevState.active,
    }));
  };
  render() {
    const { onChangeValue, name, type, ...rest } = this.props;
      return(
        <View>
          <Text style={ styles.inputLabel }> {this.props.label} </Text>
          { type == 'text-input' ?
            (

              <TextInput
                style={ this.state.active? [styles.textInput, styles.active] : styles.textInput }
              { ...rest }
              onChangeText={ this._onChangeValue }
              onFocus={ this.toggleActive }
              onEndEditing={ this.toggleActive }
             />)
              :
              null
            }
            { (type == 'character-picker' && name == 'party') ?
              ( <PartyInput />)
              :
              null
            }
            { (type == 'character-picker' && name == 'enemies') ?
              (<Text> Enter Multi-Select here </Text>)
              :
              null
            }
        </View>
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  textInput: {
    padding: 5,
    fontSize: 18,
  },
  active: {
    borderWidth: 1,
    borderColor: '#00578A'
  }
});

export default FormInput;
