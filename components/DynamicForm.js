/* @flow weak */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation

import React, { PureComponent } from 'react';
import {
  View,Text, StyleSheet, Form,
} from 'react-native';
import { Formik } from 'formik';
import Colors from '../constants/Colors';
import { Button, TextInput } from 'react-native-paper';


class DynamicForm extends PureComponent {
  renderFields = (inputs, handleChange, values, errors) => {
    console.log("INPUTS", inputs, values, errors);
    return inputs.map(input => {
      return(
        <View key={input.name} style={styles.input}>
          <View>
              <TextInput
                    onChangeText={handleChange(input.name)}
                    value={values[input.name]}
                    label={input.label}
                    placeholder={input.placeholder}
                    theme={{colors: {primary: 'blue'}}}
                    type='text'
              />
              { (errors[input.name] ?
                <Text style={{ fontSize: 10, color: 'red' }}>{errors[input.name]}</Text>
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
        <View>
          <Formik
          onSubmit={this.props.handleSubmit}
          validationSchema={this.props.validation}
          initialValues={initialValues}>
          {({ handleChange, handleSubmit, values, errors }) => (
            <View>
            { this.renderFields(this.props.fields, handleChange, values, errors) }
            <View style={styles.buttonContainer}>
              <Button onPress={this.props.handleCancel} style={styles.button}
              icon="cancel"
              mode="contained"
              title="Cancel"
              color="rgba(255, 61, 0, .5)">
              Cancel
              </Button>

              <Button onPress={handleSubmit} style={styles.button}
                disabled={Object.keys(errors).length > 0 ?true : false}
                type="submit"
                icon="check-circle-outline"
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
      </View>
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

  }
});

export default DynamicForm;
