/* @flow weak */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}', icon: {name}, size: [sm, med, mlrg, lrg]}
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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Switch from './SwitchComponent';
import ImagePickerComponent from './ImagePickerComponent';

import * as _ from 'lodash';

class DynamicForm extends PureComponent {

  renderSelect = ( input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, i, initialValues, inputs ) => {
    return(
      <FieldArray name={input.name} >
      {(arrayHelpers) => (
        <View style={_.get(styles, `picker${input.size}`)}>
        <Picker
          name={input.name}
          style={ Platform.OS == 'ios' ? _.get(styles, `pickerContainerIOS${input.size}`) : '' }
          itemStyle={_.get(styles, `pickerItem${input.size}`)}
          visible={true}
          style={ styles.pickerContainer }
          selectedValue={ values[input.name] }
          label={input.label}
          prompt={input.label}
          onValueChange={ (itemValue, itemIndex) => {
            setFieldTouched(input.name);
            setFieldValue(input.name, itemValue);
            } }
          prompt={ input.label }
        >
        {input.subType == 'party' ?
          <Picker.Item name={input.name} label='New Party' value={ initialValues.party } />
          :
          <Picker.Item name={input.name} label={input.default} value='default' />
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
              this.renderText({label: 'Party Title', type: 'input', name: 'party.title', placeholder: '', icon: 'account-group-outline', size: 'lrg' }, handleChange, values, errors, setFieldTouched, i, inputs)
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

  renderText = (input, handleChange, values, errors, setFieldTouched, i, inputs, nextInput) => {
    return(
      <TextInput
            name={input.name}
            style={ [_.get(styles, `text${input.size}`), styles.textInput] }
            onChangeText={handleChange(input.name)}
            value={values[input.name]}
            label={input.label}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            ref={(inputRef) => {  this[input.name] = inputRef; }}
            blurOnSubmit={ nextInput != 'none' ? false : true }
            onBlur={ () => setFieldTouched(input.name)}
            enablesReturnKeyAutomatically={true}
            returnKeyType={ nextInput != 'none' ? 'next' : 'done' }
            onSubmitEditing={() => {
              nextInput != 'none' && nextInput?  this[nextInput].focus() : this[input.name].blur();
              }}
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
  renderNumber = (input, values, errors, touched, isValid, setFieldValue, setFieldTouched, i, inputs, nextInput) => {
    return(
      <TextInput
            name={input.name}
            style={ [_.get(styles, `text${input.size}`), styles.textInput] }
            onChangeText={ (value) => {
              let newValue = parseInt(value, 10);
              newValue = isNaN(newValue) ? '' : newValue;
              setFieldValue(input.name, newValue);
            }
            }
            value={_.get(values, input.name).toString()}
            label={input.label}
            keyboardType={'numbers-and-punctuation'}
            placeholder={input.placeholder}
            theme={{colors: {primary: 'blue'}}}
            ref={(inputRef) => {  this[input.name] = inputRef; }}
            blurOnSubmit={ nextInput != 'none' && nextInput ? false : true }
            onFocus={ () => setFieldTouched(input.name)}
            enablesReturnKeyAutomatically={true}
            returnKeyType={ nextInput != 'none' ? 'next' : 'done' }
            onSubmitEditing={() => {
              nextInput != 'none' && nextInput?  this[nextInput].focus() : this[input.name].blur();
              }}
            type='text'
      />
      )
  };
  renderImagePicker = (input, setFieldValue, handleChange, values, errors, i) => {
    return(
      <ImagePickerComponent value={ _.get( values, input.name)}
                input={input}
                errors={errors} i={i}
                setFieldValue={setFieldValue}
             />
          )
  }

  renderInput = (input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i, inputs, nextInput) => {
    switch (input.type) {
      case 'select':
        return(this.renderSelect(input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, i, initialValues, inputs));
      case 'input-number':
        return(this.renderNumber(input, values, errors, touched, isValid, setFieldValue, setFieldTouched, i, inputs, nextInput));
      case 'switch':
        return(this.renderSwitch(input, setFieldValue, values, errors, i));
      case 'image-picker':
        return(this.renderImagePicker(input, setFieldValue, handleChange, values, errors, i));
      case 'input':
        return(this.renderText(input, handleChange, values, errors, setFieldTouched, i, inputs, nextInput));
      return(null);
    }
  };
  renderFields = (inputs, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues) => {
    return(
      <View>
      {inputs.map((input, i) => {
        if(input.length > 1){
          return(
            <View key={i} style={ _.some(input, ['size', 'lrg']) ? styles.column : styles.row } name={i}>
            {input.map((subInput, index) => {
              let nextInput = input[index+1]? input[index+1].name : _.isArray(inputs[i+1]) ? inputs[i+1][0].name :  'none';
              console.log("ERRORS: ", _.get(errors, subInput.name), _.get(touched, subInput.name));
            return(
                <View key={subInput.name} style={ subInput.size? [_.get(styles, subInput.size), styles.input]: ''}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                  { subInput.icon && subInput.type != 'switch' ? <Icon name={subInput.icon} size={24} color='black' /> : null }
                  {
                    this.renderInput(subInput, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i, inputs, nextInput)

                  }
                  </View>
                  { (_.get(errors, subInput.name) && _.get(touched, subInput.name) ?
                    <Text name={subInput.name} style={{ fontSize: 10, color: 'red' }}>{_.get(errors, subInput.name)}</Text>
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            { input.icon && input.type != 'switch' ? <Icon name={input.icon} size={24} color='black' /> : null }
                {
                  this.renderInput(input, handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, i, inputs)

                }

                  { (errors ?
                    <Text name={input.name} style={{ fontSize: 10, color: 'red'}}>{errors[input.name]}</Text>
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
          keyboardShouldPersistTaps={'handled'}
        >

            <Formik
            onSubmit={this.props.handleSubmit}
            validationSchema={this.props.validation}
            validateOnChange={true}
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
  tiny: {
    width: '15%',
  },
  sm: {
    width: '33%',
  },
  textsm: {
    width: '77%',
    fontSize: 12,
  },
  pickersm: {
    width: '77%',
  },
  med: {
    width: '49%',
  },
  textmed: {
    width: '85%',
    fontSize: 16
  },
  pickermed: {
    width: '85%',
    fontSize: 10,
  },
  pickerItemmed: {
    height: 100,
    fontSize: 18,
  },
  pickerContainerIOSmed: {
    width: '85%',
    height: 80,
  },
  mlrg: {
    width: '85%'
  },
  textmlrg: {
    width: '90%',
  },
  lrg: {
    width: '100%',
  },
  textlrg: {
    width: '90%',
    fontSize: 18
  },
  pickerlrg: {
    width: '90%',
    fontSize: 10,
  },
  pickerItemlrg: {
    height: 100,
    fontSize: 18,
  },
  pickerContainerIOSlrg: {
    width: '90%',
    height: 150,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  input: {
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 50,
  },
});

export default DynamicForm;
