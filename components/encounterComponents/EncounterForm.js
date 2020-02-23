/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, Form, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText } from 'react-native-paper';

import { useSelector, useDispatch } from 'react-redux';

import DynamicForm from "../DynamicForm";
import validation from '../../data/EncounterValidation';

const EncounterForm = props => {
  const parties = useSelector(state => state.parties.parties);
  console.log(parties);
  //If encounter, set initial values to current encounter
  const [ encounter, setEncounter ] = useState(
    props.encounter ? props.encounter :
    {
      id: new Date().toString(),
      title: "",
      campaign: "",
      description: "",
      difficulty: 0,
      party: {
        id: new Date().toString(),
        title: '',
        players: []
      },
      monsters: [],
      allies: [],
      active: false,
      settings: {
        autoRoll: {
          monsters: true, players: true
          },
      },
      state: {
        round: 0,
        turn: 0,
        order: [],
      },
      combatants: [],
    }
  );
  const defaultParty = {
    id: new Date().toString(),
    title: '',
    players: []
  };

  const fields = [
    {label: 'Title', type: 'input', name: 'title', placeholder: 'Encounter Title (Required)'},
    {label: 'Campaign', type: 'input', name: 'campaign', placeholder: 'Campaign (Optional)'},
    {label: 'Description', type: 'input', name: 'description', placeholder: 'Description (Optional)'},
    {label: 'Party', type: 'select', subType: 'party', name: 'party', data: parties, default: defaultParty, },
    {label: 'Auto Roll - Monsters', type: 'switch', name: 'settings.autoRoll.monsters', size: 'med'},
    {label: 'Auto Roll - Players', type: 'switch', name: 'settings.autoRoll.players', size: 'med' },
  ];

  const handleSubmit = (encounter) => {
    props.handleSubmit(encounter);
  };
  const handleCancel = () => {
    props.cancelEncounterHandler();
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={ styles.container }>
      <View sytle={styles.formHeader}>
        {
          props.encounter?
          <Text style={styles.formHeaderText}> Edit Encounter </Text>
          :
          <Text style={styles.formHeaderText}> New Encounter </Text>
        }
      </View>

      <View style={styles.content}>
        <DynamicForm fields={fields}
        data={encounter}
        validation={validation}
        handleCancel={handleCancel}
        handleSubmit={handleSubmit}
        />
      </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  // stepHeaderText: {
  //   fontSize: 20,
  //   color: "grey",
  // },
  // stepHeader: {
  //   borderBottomWidth: 1,
  //   borderBottomColor: 'grey',
  //   marginBottom: 15,
  // },
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
  // messageText: {
  //   alignSelf: 'center',
  //   fontSize: 16,
  //   fontStyle: 'italic',
  //   color: 'gray',
  //   marginBottom: 5,
  // },
});



 export default EncounterForm;
