/* @flow weak */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation

import React, { PureComponent } from 'react';
import {
  View,Text, StyleSheet, Form, Picker, Keyboard, TouchableWithoutFeedback, ActivityIndicator, Platform
} from 'react-native';
import { Formik, FieldArray, Field } from 'formik';
import { withFormikControl } from 'react-native-formik';
import Colors from '../constants/Colors';
import { Button, TextInput, Menu, RadioButton } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Switch from './SwitchComponent';
import * as _ from 'lodash';

class DynamicForm extends PureComponent {

  renderSelect = ( input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, i, initialValues ) => {
    return(
      <FieldArray name={input.name}>
      {(arrayHelpers) => (
        <View>
        <Picker
          name={input.name}
          style={ Platform.OS == 'ios' ? styles.pickerContainerIOS : '' }
          itemStyle={styles.pickerItemIOS}
          visible={true}
          style={ styles.pickerContainer }
          selectedValue={ values[input.name] }
          label={input.label}
          onValueChange={ (itemValue, itemIndex) => {
            setFieldValue(input.name, itemValue);
            } }
          prompt={ input.label }
        >
        {input.subType == 'party' ?
          <Picker.Item name={input.name} label='New Party' value={ initialValues.party } />
          :
          <Picker.Item name={input.name} label='Select an option' value='default' />
        }
      { input.data.map((d, index) => (
            <Field
              type="select"
              id={input.name}
              name={input.name}
              key={index}
              as={Picker.Item}
              name={input.name}
              label={input.subType == 'party' ? d.title : d }
              value={ d } />
          )

            )
        }
        </Picker>
        { //If Party && default option, render party title input
          (input.subType == 'party') ?
            ( values[input.name].id == initialValues.party.id ?
              this.renderText({label: 'Party Title', type: 'input', name: 'party.title', placeholder: '', size: 'lrg' }, handleChange, values, errors)
              :
                <TextInput style={ styles.textInput } disabled value={ values.party.title }/>
              )
              :
              null
        }
        </View>
        )}
      </FieldArray>
    )
  }

  renderText = (input, handleChange, values, errors, i) => {
    return(
      <TextInput
            name={input.name}
            style={ styles.textInput }
            onChangeText={handleChange(input.name)}
            value={values[input.name]}
            label={input.label}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            type='text'
      />
      )
  }
  renderSwitch = (input, setFieldValue, values, errors, i) => {
    return(
      <Switch
        input={input} setFieldValue={setFieldValue}
        value={ _.get( values, input.name)} errors={errors} i={i}
      />
          )
  }
  renderNumber = (input, handleChange, values, errors, i) => {
    return(
      <TextInput
            name={input.name}
            style={ [_.get(styles, `text${input.size}`), styles.textInput] }
            onChangeText={handleChange(input.name)}
            value={_.get(values, input.name).toString()}
            label={input.label}
            keyboardType={'number-pad'}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            type='text'
      />
      )
  }


  renderInput = (input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i) => {
    switch (input.type) {
      case 'select':
        return(this.renderSelect(input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, i, initialValues));
      case 'input-number':
        return(this.renderNumber(input, handleChange, values, errors, i));
      case 'switch':
        return(this.renderSwitch(input, setFieldValue, values, errors, i));
      case 'input':
        return(this.renderText(input, handleChange, values, errors, i));
      return(null);
    }
  }
  renderFields = (inputs, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues) => {
    return(
      <View>
      {inputs.map((input, i) => {
        if(input.length > 1){
          return(
            <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-around'}} name={i}>
            {input.map((subInput, index) => {
            return(
                <View key={subInput.name} style={ subInput.size? [_.get(styles, subInput.size), styles.input]: ''}>
                  {
                    this.renderInput(subInput, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, index)

                  }
                  { (errors[subInput.name] ?
                    <Text name={subInput.name} style={{ fontSize: 10, color: 'red' }}>{errors[subInput.name]}</Text>
                    : null )
                  }
                </View>
              );
            })}
            </View>
          );
        } else {
          return(
            <View key={input.name} style={ input.size? [_.get(styles, input.size), styles.input]: ''}  name={input.name}>
              <View>
                {
                  this.renderInput(input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i)

                }

                  { (errors[input.name] ?
                    <Text name={input.name} style={{ fontSize: 10, color: 'red' }}>{errors[input.name]}</Text>
                    : null )
                  }
              </View>
            </View>
            )
        }
        })
      }
      </View>
    )
  }


  render() {
    const initialValues = this.props.data;

      return(
        <View style={ styles.container }>
        <KeyboardAwareScrollView
          enableOnAndroid={true}
          extraScrollHeight={ Platform.OS == 'ios' ? -50 : 50}
        >

            <Formik
            onSubmit={this.props.handleSubmit}
            validationSchema={this.props.validation}
            validateOnBlur={true}
            initialValues={initialValues}>
            {({handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues }) => (
              <View style={{ height: '100%' }}>
              { this.renderFields(this.props.fields, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues) }
              <View style={styles.buttonContainer}>
                <Button onPress={this.props.handleCancel} style={styles.button}
                icon="cancel"
                mode="contained"
                title="Cancel"
                color="rgba(255, 61, 0, .5)">
                Cancel
                </Button>

                <Button disabled={isSubmitting || !isValid} onPress={handleSubmit} style={styles.button}
                  disabled={ isSubmitting || Object.keys(errors).length > 0 ? true : false}
                  type="submit"
                  icon={isSubmitting? <ActivityIndicator size="small" color="#00ff00" /> : "check-circle-outline"}
                  mode="contained"
                  title="Submit"
                  color="#00578A">
                  Submit
                </Button>
              </View>
              </View>

            )
          }

          </Formik>
          </KeyboardAwareScrollView>
          </View>

  )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  button: {
    width: '30%'
  },
  sm: {
    width: '30%',
  },
  textsm: {
    fontSize: 14,
  },
  med: {
    width: '40%',
  },
  textmed: {
    fontSize: 16
  },
  lrg: {
    width: '100%',
  },
  textlrg: {
    fontSize: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    marginBottom: 5,
  },
  textInput: {
    height: 50,
  },
  pickerContainerIOS: {
    width: 200,
    height: 88,
  },
  pickerItemIOS: {
    height: 88,
  },
});

export default DynamicForm;
