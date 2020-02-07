/* @flow */
//TO DO: Add Form Validation with Yup

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, Form } from 'react-native';
import MultiStepForm from '../MultiStepForm';
import FormInput from '../FormInput';
import { Formik } from 'formik';
import { Button, TextInput, HelperText } from 'react-native-paper';

import DynamicForm from "../DynamicForm";
import validation from '../../data/EncounterValidation';

const EncounterForm = props => {
  const [ encounter, setEncounter ] = useState( {
    title: "",
    campaign: "",
    description: "",
    difficulty: 0,
    party: {
      id: '',
      title: '',
      players: []
    },
    enemies: [],
    allies: []
  });

  const fields = [
    {label: 'Title', type: 'input', name: 'title', placeholder: 'Encounter Title (Required)'},
    {label: 'Campaign', type: 'input', name: 'campaign', placeholder: 'Campaign (Optional)'},
    {label: 'Description', type: 'input', name: 'description', placeholder: 'Description (Optional)'},

  ];

  const handleSubmit = (encounter) => {
    props.addEncounterHandler(encounter);
  };
  const handleCancel = () => {
    props.cancelEncounterHandler();
  };


  return (
    <View style={ styles.container }>
      <View sytle={styles.formHeader}>
        <Text style={styles.formHeaderText}> New Encounter </Text>
      </View>


    <View style={styles.content}>
      <DynamicForm fields={fields}
      data={encounter}
      validation={validation}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      />
    </View>


    {/*<MultiStepForm onSubmit={ handleSubmit } initialValues={encounter} handleNext={ handleNext }>
          { forms.map((el, index) => (
            <MultiStepForm.Step key={ el.title }>
            { ({ onChangeValue, values, type, label, message, inputs, currentIndex }) => (
              <View style={{flex: 1}}>
                <View style={ styles.stepHeader }>
                <Text style={ styles.stepHeaderText }> {el.title} </Text>
                </View>
                <View>
                  {
                    el.inputs.map((input, index) => (
                      <FormInput
                        theme={"light"}
                        index={index}
                        key={input.name}
                        onChangeValue={ onChangeValue }
                        placeholder={ input.placeholder }
                        value={ values[input.name] }
                        name={ input.name }
                        type={ input.type }
                        label={ input.label }
                      />
                      ))
                  }
                </View>
              </View>
              )

            }
            </MultiStepForm.Step>
            ))}
      </MultiStepForm>*/}
    </View>
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
