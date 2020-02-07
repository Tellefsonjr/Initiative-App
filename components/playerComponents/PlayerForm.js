/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation
//TO DO: Add Picker-style option for character classes

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, Form } from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText } from 'react-native-paper';

import DynamicForm from "../DynamicForm";
import validation from '../../data/PlayerValidation';

const PlayerForm = props => {
  const [ player, setPlayer ] = useState( {
    id: new Date().toString(),
    name: '',
    className: '',
    hp: 0,
    initiativeBonus: 0,
    initiative: 0,
  });

  const fields = [
    {label: 'Name', type: 'input', name: 'name', placeholder: 'Player name (Required)'},
    {label: 'Class', type: 'input', name: 'className', placeholder: 'Class name (Required)'},
    // {label: 'Class', type: 'select', name: 'className', data: ['Artificer', 'Barbarian', 'Bard', 'Blood Hunter', 'Cleric', 'Druid', 'Fighter', 'Monk', 'Paladin', 'Ranger', 'Rogue', 'Sorcerer', 'Warlock', 'Wizard', 'Other'], value: 'Please Select'},
    {label: 'HP Total', type: 'input-number', name: 'hp', placeholder: 'HP Total (Optional)'},
    {label: 'Initiative Bonus', type: 'input-number', name: 'initiativeBonus', placeholder: 'Initiative Bonus (Optional)'},
  ];

  const handleSubmit = (player) => {
    console.log("SUBMITTING THIS THING: ", player);
    player.hp = parseInt(player.hp, 10);
    player.initiativeBonus = parseInt(player.hp, 10);
    console.log("Transformed this to ints:", player);
    props.addPlayerHandler(player);
  };
  const handleCancel = () => {
    props.cancelPlayerHandler();
  };


  return (
    <View style={ styles.container }>
      <View sytle={styles.formHeader}>
        <Text style={styles.formHeaderText}> New Player </Text>
      </View>

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
    backgroundColor: 'white',
  },
  formHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 15,
  },
  formHeaderText: {
    fontSize: 20,
    paddingLeft: 16,
    color: "black",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    padding: 16,
  },
  button: {
    marginTop: 16,
    width: "30%",
  },
  input: {
    marginBottom: 10,
  }
});



 export default PlayerForm;
