/* @flow weak */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation

import React, { PureComponent } from 'react';
import {
  View,Text, StyleSheet, Form, Picker, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, ActivityIndicator, ScrollView, Platform
} from 'react-native';
import { Formik, FieldArray, Field } from 'formik';
import Colors from '../constants/Colors';
import { Button, TextInput, Menu } from 'react-native-paper';


class DynamicForm extends PureComponent {

  renderSelect = (input, handleChange, values, errors, i) => {
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
          selectedValue={ values[input.name]}
          onValueChange={ handleChange(input.name) }
          prompt={ input.label }
        >
        <Picker.Item name={input.name} label='Select an option' value='' />
      { input.data.map((d, index) => (
            <Field
              type="select"
              id={input.name}
              name={input.name}
              key={index}
              as={Picker.Item}
              name={input.name}
              label={d}
              value={d} />
          )

            )
        }
        </Picker>
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
            autoFocus={i==0? true : false}
            onChangeText={handleChange(input.name)}
            value={values[input.name]}
            label={input.label}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            type='text'
      />
      )
  }
  renderNumber = (input, handleChange, values, errors, i) => {
    return(
      <TextInput
            name={input.name}
            style={ styles.textInput }
            autoFocus={i==0? true : false}
            onChangeText={handleChange(input.name)}
            value={values[input.name].toString()}
            label={input.label}
            keyboardType={'number-pad'}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            type='text'
      />
      )
  }



  renderFields = (inputs, handleChange, values, errors) => {
    return inputs.map((input, i) => {
      return(
        <View key={input.name} style={styles.input} name={input.name}>
          <View>
            { (input.type == 'select'?
              this.renderSelect(input, handleChange, values, errors, i)
              :
              (input.type == 'input-number' ?
              this.renderNumber(input, handleChange, values, errors, i)
              :
              this.renderText(input, handleChange, values, errors, i) )
              )
            }

              { (errors[input.name] ?
                <Text name={input.name} style={{ fontSize: 10, color: 'red' }}>{errors[input.name]}</Text>
                : null )
              }
          </View>
        </View>
        )
      });
  }


  render() {
    const initialValues = this.props.data;

      return(
          <ScrollView keyboardShouldPersistTaps="never">
          <KeyboardAvoidingView behavior='padding' style={{flex: 1}} enabled>
          <Formik
          onSubmit={this.props.handleSubmit}
          validationSchema={this.props.validation}
          initialValues={initialValues}>
          {({ handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid }) => (
            <View>
            { this.renderFields(this.props.fields, handleChange, values, errors, touched) }
            <View style={styles.buttonContainer}>
              <Button onPress={this.props.handleCancel} style={styles.button}
              icon="cancel"
              mode="contained"
              title="Cancel"
              color="rgba(255, 61, 0, .5)">
              Cancel
              </Button>

              <Button disabled={isSubmitting || !isValid} onPress={handleSubmit} style={styles.button}
                disabled={Object.keys(errors).length > 0 ?true : false}
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
        </KeyboardAvoidingView>
        </ScrollView>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: '30%'
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
  pickerLabel: {
    fontSize: 20,
  },
});

export default DynamicForm;
