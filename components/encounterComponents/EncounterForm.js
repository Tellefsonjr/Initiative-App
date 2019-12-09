/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import MultiStepForm from '../MultiStepForm';
import FormInput from '../FormInput';
import { Formik } from 'formik';

const EncounterForm = props => {
  const [ encounter, setEncounter ] = useState( {
    title: "",
    campaign: "",
    description: "",
    players: [],
    enemies: [],
    allies: []
  });
  // Form objects to render see FormInput for Form Handling UI
  const forms = [
    {
      title: 'Encounter details: ',
      message: 'Let\'s start with some info about this encounter...',
      inputs: [
        {
          name: 'title',
          type: 'text-input',
          label: 'Encounter Title: ',
          placeholder: 'Encounter title here...',
        },
        {
          name: 'campaign',
          type: 'text-input',
          label: 'Campaign name: ',
          placeholder: '(Optional) Encounter campaign here...',
        },
        {
          name: 'description',
          type: 'text-input',
          label: 'Description: ',
          placeholder: '(Optional) Encounter description here...',
        }
      ]
    },
    {
      title: 'Assemble your party: ',
      message: 'Choose your party here, or create one below!',
      inputs: [
        {
          name: 'party',
          type: 'character-picker',
          label: 'Selected Party: ',
          placeholder: 'Encounter party here...',

        }
      ],
    },
    {
      title: 'Choose your enemies: ',
      message: 'Select which enemies your players will battle against!',
      inputs: [
        {
          name: 'enemies',
          type: 'character-picker',
          label: 'Available enemies: ',
          placeholder: 'Encounter enemies here...',

        }
      ],
    },

  ];

  const handleSubmit = (encounter) => {
    props.addEncounterHandler(encounter);
  };
  return (
    <View style={ styles.container }>
      <MultiStepForm onSubmit={ handleSubmit } initialValues={encounter}>
          { forms.map(el => (
            <MultiStepForm.Step key={ el.title }>
            { ({ onChangeValue, values, type, label, message, inputs }) => (
              <View style={{flex: 1}}>
                <View style={ styles.stepHeader }>
                  <Text style={ styles.stepHeaderText }> {el.title} </Text>
                </View>
                {/* <Text style={ styles.messageText }> { el.message } </Text> */}
                <View>
                  {
                    el.inputs.map(input => (
                      <FormInput
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
      </MultiStepForm>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    padding: 5,
  },
  stepHeaderText: {
    fontSize: 20,
  },
  stepHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 15,
  },
  // messageText: {
  //   alignSelf: 'center',
  //   fontSize: 16,
  //   fontStyle: 'italic',
  //   color: 'gray',
  //   marginBottom: 5,
  // },
});



 export default EncounterForm;
