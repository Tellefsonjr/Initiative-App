/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation
//TO DO: Add Picker-style option for character classes

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, Form, TouchableWithoutFeedback} from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText, ToggleButton } from 'react-native-paper';
import * as _ from 'lodash';
import DynamicForm from "../DynamicForm";
import validation from '../../data/MonsterValidation';

const MonsterForm = props => {
  const [ monster, setMonster ] = useState( {
    id: new Date().toString(),
    name: '',
    type: '',
    size: '',
    cr: '',
    stats: {
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
    {label: 'Name', type: 'input', name: 'name', placeholder: 'Monster name (Required)', size: 'lrg'},
    // {label: 'Class', type: 'input', name: 'className', placeholder: 'Class name (Required)'},
    {label: 'Select Type', type: 'select', name: 'type', default: 'default', size: 'lrg', data: [
      'Abberation',
      'Beast',
      'Celestial',
      'Construct',
      'Dragon',
      'Elemental',
      'Fey',
      'Fiend',
      'Giant',
      'Humanoid',
      'Monstrosity',
      'Ooze',
      'Plant',
      'Swarm',
      'Undead',
      ], value: 'Please Select'},
    [
      {label: 'Size', type: 'input-number', name: 'size', placeholder: 'Size (Required)', size: 'med'},
      {label: 'Challenge Rating', type: 'input-number', name: 'cr', placeholder: 'Challenge Rating (Required)', size: 'med'},
    ],
    [
      {label: 'HP Total', type: 'input-number', name: 'stats.maxHp', placeholder: 'HP Total (Required)', size: 'sm'},
      {label: 'Armor Class', type: 'input-number', name: 'stats.ac', placeholder: 'Armor Class (Required)', size: 'sm'},
      {label: 'Initiative Bonus', type: 'input-number', name: 'stats.initiativeBonus', placeholder: 'Initiative Bonus (Required)', size: 'sm'},
    ],
  ];

  const handleSubmit = (monster) => {
    console.log("SUBMITTING CR: ", monster.cr);
    monster.stats.hp = parseInt(monster.hp, 10);
    monster.stats.initiativeBonus = parseInt(monster.hp, 10);
    props.handleSubmit(monster);
  };
  const handleCancel = () => {
    props.handleCancel();
  };

  const populateFields = (fields) => {
    let newFields = fields;
    let abilityScores = _.keys(monster.stats.abilityScores);
    let abilityScoreFields = [];
    abilityScores.map( abilityScore => {
        abilityScoreFields.push({label: _.startCase(abilityScore), type: 'input-number', name: `stats.abilityScores.${abilityScore}`, placeholder: 'max: 30', size: 'sm'})
        }
      );
    newFields.push(_.slice(abilityScoreFields, 0, 3), _.slice(abilityScoreFields, 3, abilityScoreFields.length));
    return( newFields );
  };
  return (
    <View style={ styles.container }>
      <View style={styles.content}>
              <DynamicForm fields={populateFields(fields)}
              data={monster}
              validation={validation}
              handleCancel={handleCancel}
              handleSubmit={handleSubmit}
              />
      </View>
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



 export default MonsterForm;
