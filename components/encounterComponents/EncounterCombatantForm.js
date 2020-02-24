/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation
//TO DO: Add Picker-style option for character classes

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, Form, TouchableWithoutFeedback, ScrollView, Platform} from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText, ToggleButton } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DynamicForm from "../DynamicForm";
import validation from '../../data/CombatantValidation';

const EncounterCombatantForm = props => {
  const [combatants, setCombatants] = useState(props.combatants);
  const [ autoRoll, setAutoRoll ] = useState( props.autoRoll );
  const [ combatantCount , setCombatantCount ] = useState( {
    monsters: combatants.filter( c => c.cType == 'monster' && c.initiative != 0).length,
    players: combatants.filter( c => c.cType == 'player' && c.initiative != 0).length,
  });

  const fields = [];

  const returnFields = (combatants) => {
    combatants.forEach( (combatant, index) => {
      if((combatant.cType == 'player' && autoRoll.players == false) || (combatant.cType == 'monster' && autoRoll.monsters == false)){
          fields.push(
          {label: `${combatant.name} Initiative +${combatant.initiativeBonus}`, type: 'input-number', name: `[${index}].initiative`, placeholder: 'Initiative (max 20)'}
          )
      }
      });
    return(fields);
  }

  const handleSubmit = (combatants) => {
    combatants.map( combatant => {
      combatant.initiative = parseInt(combatant.initiative, 10) + combatant.initiativeBonus;
    });
    props.handleSubmit(combatants);
  };
  const handleCancel = () => {
    props.handleCancel();
  };

  return (
    <View style={ styles.statusContainer }>
      <View style={ styles.statusItem }>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={ styles.statusLabel}> Monsters </Text>
          <Text style={ styles.statusLabel, combatantCount.monsters == props.monsterCount? styles.countReady : styles.countNotReady }>
            { combatantCount.monsters } / { props.monsterCount }
          </Text>
          <Icon name="emoticon-devil-outline" size={20} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={ styles.statusLabel}> Players </Text>
          <Text style={ styles.statusLabel, combatantCount.players == props.playerCount ? styles.countReady : styles.countNotReady }>
            { combatantCount.players } / { props.playerCount }
          </Text>
          <Icon name="account-outline" size={20} />
        </View>
      </View>
      <View style={ styles.formContainer }>
        <DynamicForm fields={returnFields(combatants)}
        data={combatants}
        validation={validation}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    height: '90%',
    padding: 10,
  },
  statusContainer: {

  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statusLabel: {
    fontSize: 18,
  },
  countReady: {
    color: 'green',
    fontSize: 18,
  },
  countNotReady: {
    color: 'red',
    fontSize: 20,
  },
});



 export default EncounterCombatantForm;
