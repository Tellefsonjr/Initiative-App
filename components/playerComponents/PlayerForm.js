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
import validation from '../../data/PlayerValidation';

const PlayerForm = props => {
  const [ player, setPlayer ] = useState( {
    id: new Date().toString(),
    name: '',
    className: '',
    hp: '',
    initiativeBonus: '',
    initiative: '',
  });

  const fields = [
    {label: 'Name', type: 'input', name: 'name', placeholder: 'Player name (Required)'},
    // {label: 'Class', type: 'input', name: 'className', placeholder: 'Class name (Required)'},
    {label: 'Select Class', type: 'select', name: 'className', default: 'default', data: ['Artificer', 'Barbarian', 'Bard', 'Blood Hunter', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Other'], value: 'Please Select'},
    {label: 'HP Total', type: 'input-number', name: 'hp', placeholder: 'HP Total (Optional)'},
    {label: 'Initiative Bonus', type: 'input-number', name: 'initiativeBonus', placeholder: 'Initiative Bonus (Optional)'},
  ];

  const handleSubmit = (player) => {
    player.hp = parseInt(player.hp, 10);
    player.initiativeBonus = parseInt(player.hp, 10);
    props.handleSubmit(player);
  };
  const handleCancel = () => {
    props.handleCancel();
  };


  return (
    <View style={ styles.container }>
      <View style={styles.content}>
              <DynamicForm fields={fields}
              data={player}
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



 export default PlayerForm;
