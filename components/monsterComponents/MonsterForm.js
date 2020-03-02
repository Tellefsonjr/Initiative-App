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
    avatar: null,
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
    [{label: 'Avatar', type: 'image-picker', name: 'avatar', size: 'tiny'},
    {label: 'Name', type: 'input', name: 'name', placeholder: 'max: 50 characters', icon: 'emoticon-devil-outline', size: 'mlrg'},],
    // {label: 'Class', type: 'input', name: 'className', placeholder: 'Class name (Required)'},
    [{label: 'Select Type', type: 'select', name: 'type', default: 'Type', icon: 'tag-outline', size: 'med',  data: [
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
      ]},
      {label: 'Select Size', type: 'select', name: 'size', default: 'Size', icon: 'ruler-square', size: 'med', data: [
        'Tiny',
        'Small',
        'Medium',
        'Large',
        'Huge',
        'Gargantuan',
        ]},],
    [ {label: 'CR', type: 'input', name: 'cr', placeholder: 'e.g: 1/4, 14', icon: 'sword-cross', size: 'med'},
      {label: 'HP Total', type: 'input-number', name: 'stats.maxHp', placeholder: 'max: 400', icon: 'heart-outline', size: 'med'},],
      [{label: 'Armor Class', type: 'input-number', name: 'stats.ac', placeholder: 'max: 30', icon: 'shield-half-full', size: 'med'},
      {label: 'Initiative Bonus', type: 'input-number', name: 'stats.initiativeBonus', placeholder: 'min: -10 max: 10', icon: 'account-alert-outline', size: 'med'},
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
    let iconList = {
      strength: 'dumbbell',
      dexterity: 'run-fast',
      constitution: 'account-heart-outline',
      intelligence: 'brain',
      wisdom: 'motion-sensor',
      charisma: 'drama-masks',
    };
    abilityScores.map( abilityScore => {
        abilityScoreFields.push({label: _.startCase(abilityScore), type: 'input-number', name: `stats.abilityScores.${abilityScore}`, placeholder: 'max: 30', icon: _.get(iconList, abilityScore), size: 'sm'})
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
