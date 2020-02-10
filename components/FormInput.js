/* @flow weak */

import React, { PureComponent } from 'react';
import {
  View,Text, StyleSheet, TextInput
} from 'react-native';
import PartySelect from './partyComponents/PartySelect';
import PlayerSelect from './playerComponents/PlayerSelect';

import Colors from '../constants/Colors';

class FormInput extends PureComponent {
  state = {
    active: false,
  };
  _onChangeValue = text => {
    console.log("ChangedValue in input form", "props.name:", this.props.name, "value received:", text);
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
          { type == 'text-input' ?
            (
              <View>
                <Text style={ this.props.theme == 'light' ? [styles.light, styles.inputLabel] : [styles.dark, styles.inputLabel] }> {this.props.label} </Text>
                <TextInput
                  style={ this.state.active? [styles.textInput, styles.active] : styles.textInput }
                { ...rest }
                placeholderTextColor="rgba(60, 60, 60, 0.9)"
                onChangeText={ this._onChangeValue }
                autoFocus={ this.props.index == 0 ? true : false }
                onFocus={ this.toggleActive }
                onEndEditing={ this.toggleActive }
               />
               
              </View>
)
              :
              null
            }
            { (type == 'picker' && name == 'party') ?
              ( <PartySelect { ...rest } onChangeValue={ this._onChangeValue } label={ this.props.label }/> )
              :
              null
            }
            { (type == 'picker' && name == 'players') ?
              (<PlayerSelect values={ this.props.values } onChangeValue={ this._onChangeValue } label={ this.props.label } { ...rest} />)
              :
              null
            }
            { (type == 'picker' && name == 'enemies') ?
              ( <Text> Monster Picker here </Text> )
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
  light: {
    color: Colors.light.text
  },
  dark: {
    color: Colors.dark.text
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    padding: 5,
    fontSize: 18,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 2,
    color: "black",
    marginBottom: 5,
  },
  active: {
    borderWidth: 1,
    borderColor: '#00578A'
  }
});

export default FormInput;
