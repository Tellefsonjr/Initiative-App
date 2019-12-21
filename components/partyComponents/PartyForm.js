/* @flow */

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Button, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import MultiStepForm from '../MultiStepForm';
import FormInput from '../FormInput';


const PartyForm = props => {
  const [ progress, setProgress ] = useState(0);
  const [ party, setParty ] = useState({
    title: "",
    players: [],
  });
  // console.log("PARTIIIIESSSSSUHH: ", parties);
  const handlePress = () => {
    console.log("CLICKED");
  };
  const handleClearPlayers = () => {
    console.log("CLEARING");
  };
  const onChangeValue = (key, value) => {
    console.log("OnChange in PartyForm:", key, value);
  };
  const handleSubmit = (party) => {
    props.addPartyHandler(party);
  };
  const handleNext = (value) => {
    setProgress( value );
  };
  const barWidth = Dimensions.get('screen').width - 30;

  const forms = [
    {
        title: 'New Party: ',
        message: 'What would you like to call this group?',
        inputs: [
          {
            name: 'title',
            type: 'text-input',
            label: 'Party Title: ',
            placeholder: 'Party title here...',
          },
        ],
    },
    {
      title: 'Choose your players: ',
      message: 'Choose your players here, or create one below!',
      inputs: [
        {
          name: 'players',
          type: 'picker',
          label: 'Selected Players: ',
          placeholder: 'Party players here...',
        }
      ],
    },
  ];
  return (
      <View style={ styles.container }>
      <ProgressBarAnimated
        style={ styles.progressBar }
        width={ barWidth }
        value={ progress }
        backgroundColorOnComplete="#6CC644"
      />
      <MultiStepForm onSubmit={ handleSubmit } initialValues={party} handleNext={ handleNext }>
            { forms.map((el, index) => (
              <MultiStepForm.Step key={ el.title }>
              { ({ onChangeValue, values, type, label, message, inputs, currentIndex }) => (
                <View style={{flex: 1}}>
                  <View style={ styles.stepHeader }>
                  <Text style={ styles.stepHeaderText }> {el.title} </Text>
                  </View>
                  {/* <Text style={ styles.messageText }> { el.message } </Text> */}
                  <View>
                    {
                      el.inputs.map(input => (
                        <FormInput
                          theme={"light"}
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
    padding: 10,
    alignItems: 'center',
  },
  stepHeaderText: {
    fontSize: 20,
    color: "black",
  },
  stepHeader: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    marginBottom: 15,
  },
});



 export default PartyForm;
