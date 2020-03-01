/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation
//TO DO: Add Picker-style option for character classes

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, Form, TouchableWithoutFeedback, ScrollView, Platform} from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText, ToggleButton } from 'react-native-paper';
import * as _ from 'lodash';

import DynamicForm from "../DynamicForm";
import validation from '../../data/PlayerValidation';

const PlayerForm = props => {
  const [ player, setPlayer ] = useState( props.player? props.player :
    {
    id: Math.random().toString(),
    name: '',
    className: '',
    stats: {
      level: '',
      maxHp: '',
      hp: '',
      ac: '',
      initiativeBonus: '',
      deathSaves: { succeeded: 0, failed: 0 },
      abilityScores: {
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: ''
      },
      abilityScoreBonus: {
        strength: '',
        dexterity: '',
        constitution: '',
        intelligence: '',
        wisdom: '',
        charisma: ''
      },
    }
  });

  const fields = [
    {label: 'Name', type: 'input', name: 'name', placeholder: 'max: 50 characters', size: 'lrg'},
    // {label: 'Class', type: 'input', name: 'className', placeholder: 'Class name (Required)'},
    {label: 'Select Class', type: 'select', name: 'className', default: 'default', size: 'lrg',
      data: ['Artificer', 'Barbarian', 'Bard', 'Blood Hunter', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard'], value: 'Please Select'},
    [
      {label: 'Level', type: 'input-number', name: 'stats.level', placeholder: 'max: 20', size: 'med'},
      {label: 'HP Total', type: 'input-number', name: 'stats.maxHp', placeholder: 'max: 200', size: 'med'},
    ],
    [
      {label: 'Armor Class', type: 'input-number', name: 'stats.ac', placeholder: 'max: 30', size: 'med'},
      {label: 'Initiative Bonus', type: 'input-number', name: 'stats.initiativeBonus', placeholder: 'max: 10', size: 'med'},
    ],

  ];
  const populateFields = (fields) => {
    let newFields = fields;
    let abilityScores = _.keys(player.stats.abilityScores);
    let abilityScoreFields = [];
    abilityScores.map( abilityScore => {
        abilityScoreFields.push({label: _.startCase(abilityScore), type: 'input-number', name: `stats.abilityScores.${abilityScore}`, placeholder: 'max: 30', size: 'sm'})
        }
      );
    newFields.push(_.slice(abilityScoreFields, 0, 3), _.slice(abilityScoreFields, 3, abilityScoreFields.length));
    return( newFields );
  };
  const handleSubmit = (player) => {
    // parse text to int
    player.stats.maxHp = parseInt(player.stats.maxHp, 10);
    player.stats.hp = parseInt(player.stats.maxHp, 10);
    player.stats.level = parseInt(player.stats.level, 10);
    player.stats.initiativeBonus = parseInt(player.stats.initiativeBonus, 10);
    // calc bonuses
    let abilityScores = _.keys(player.stats.abilityScores);
    abilityScores.map( key => {
      player.stats.abilityScoreBonus[key] = Math.floor((player.stats.abilityScores[key] - 10) / 2);
      });
    console.log("SAVING LEVEL: ", player.stats.level);
    props.handleSubmit(player);
  };
  const handleCancel = () => {
    props.handleCancel();
  };


  return (
    <View style={ styles.container }>
            <DynamicForm fields={populateFields(fields)}
              data={player}
              validation={validation}
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
              />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  content: {
  },
});



 export default PlayerForm;
