/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, Form, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import { Button, TextInput, HelperText } from 'react-native-paper';
import * as _ from 'lodash';

import { useSelector, useDispatch } from 'react-redux';

import DynamicForm from "../DynamicForm";
import validation from '../../data/PartyValidation';

const PartyForm = props => {
  const parties = useSelector(state => state.parties.parties);
  console.log("PARTIES AT ENCOUNTER FORM: ", parties);
  const propParty = props.party ? props.party : {};
  propParty.party = _.find(parties, ['id', propParty.partyId]);
  //If party, set initial values to current party
  const [ party, setParty ] = useState(
    props.party ? propParty :
    {
      id: Math.random().toString(),
      title: '',
      players: [],
    }

  );

  const fields = [
      [{label: 'Title', type: 'input', name: 'title', placeholder: 'max: 25 characters', icon: 'text-short', size: 'lrg'},]

  ];

  const handleSubmit = (party) => {
    props.handleSubmit(party);
  };
  const handleCancel = () => {
    props.cancelPartyHandler();
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={ styles.container }>
      <View sytle={styles.formHeader}>
        {
          props.party?
          <Text style={styles.formHeaderText}> Edit Party </Text>
          :
          <Text style={styles.formHeaderText}> New Party </Text>
        }
      </View>

      <View style={styles.content}>
        <DynamicForm fields={fields}
        data={party}
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



 export default PartyForm;
