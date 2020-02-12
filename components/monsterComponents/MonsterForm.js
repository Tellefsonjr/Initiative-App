/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation
//TO DO: Add Picker-style option for character classes

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, Form, TouchableWithoutFeedback} from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText, ToggleButton } from 'react-native-paper';

import DynamicForm from "../DynamicForm";
import validation from '../../data/MonsterValidation';

const MonsterForm = props => {
  const [ monster, setMonster ] = useState( {
    id: new Date().toString(),
    name: '',
    type: '',
    size: '',
    cr: '',
    hp: '',
    ac: '',
    initiativeBonus: '',
    initiative: '',
  });

  const fields = [
    {label: 'Name', type: 'input', name: 'name', placeholder: 'Monster name (Required)'},
    // {label: 'Class', type: 'input', name: 'className', placeholder: 'Class name (Required)'},
    {label: 'Select Type', type: 'select', name: 'type', default: 'default', data: [
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
    {label: 'Challenge Rating', type: 'input-number', name: 'cr', placeholder: 'Challenge Rating (Required)'},
    {label: 'HP Total', type: 'input-number', name: 'hp', placeholder: 'HP Total (Required)'},
    {label: 'Armor Class', type: 'input-number', name: 'ac', placeholder: 'Armor Class (Required)'},
    {label: 'Initiative Bonus', type: 'input-number', name: 'initiativeBonus', placeholder: 'Initiative Bonus (Required)'},
  ];

  const handleSubmit = (monster) => {
    monster.hp = parseInt(monster.hp, 10);
    monster.initiativeBonus = parseInt(monster.hp, 10);
    props.handleSubmit(monster);
  };
  const handleCancel = () => {
    props.handleCancel();
  };


  return (
    <View style={ styles.container }>
      <View style={styles.content}>
              <DynamicForm fields={fields}
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
