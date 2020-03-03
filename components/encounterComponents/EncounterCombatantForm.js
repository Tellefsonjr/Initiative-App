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
import * as _ from 'lodash';
import DynamicForm from "../DynamicForm";
import validation from '../../data/CombatantValidation';

const EncounterCombatantForm = props => {
  // console.log("FORM COMBATANTS AND Player Count: ", props.combatants, props.playerCount);
  const [combatants, setCombatants] = useState(props.combatants);
  const [ autoRoll, setAutoRoll ] = useState( props.autoRoll );
  const [ combatantCount , setCombatantCount ] = useState( {
    monsters: combatants.filter( c => c.cType == 'monster' && c.initiative != 0).length,
    players: combatants.filter( c => c.cType == 'player' && c.initiative != 0).length,
  });


  const returnFields = (combatants) => {
    let fields = [[],[]];
    combatants.forEach( (combatant, index) => {
          if( combatant.cType == 'monster'){
            fields[0].push(
            {label: `${combatant.name}`, type: 'input-number', name: `[${index}].initiative`, placeholder: 'Initiative (max 20)', rollable: true, modifier: combatant.stats.initiativeBonus, size: 'medRollable'}
            )
          } else {
            fields[1].push(
            {label: `${combatant.name}`, type: 'input-number', name: `[${index}].initiative`, placeholder: 'Initiative (max 20)', rollable: true, modifier: combatant.stats.initiativeBonus, size: 'medRollable'}
            )
          }
      });
      console.log("FIELDS :::::::: ", fields, "^^^^^ FIELDS ^^^^");
    return(fields);
  }

  const handleSubmit = (combatants) => {
    combatants.map( combatant => {
      combatant.initiative = parseInt(combatant.initiative, 10) + combatant.stats.initiativeBonus;
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={ styles.formContainer }>
          <DynamicForm fields={returnFields(combatants)}
          data={combatants}
          validation={validation}
          displayColumn={true}
          handleCancel={handleCancel}
          handleSubmit={handleSubmit}
          buttonIcons={ false }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 5,
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
