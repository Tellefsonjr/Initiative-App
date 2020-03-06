/* @flow */
// Dynamic form used for easier Formik Forms.
// format: {label: 'label for input', type: '{input type (text, select, number)}', name: {key of state obj}, placeholder: '{placeholder text}'}
// validation for these forms stored in data/validation
//TO DO: Add Picker-style option for character classes

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Keyboard, KeyboardAvoidingView, Form, TouchableWithoutFeedback, ScrollView, Platform} from 'react-native';
import { Formik } from 'formik';
import { IconButton, TextInput, Portal, Dialog, Avatar, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as _ from 'lodash';
import validation from '../../data/CombatantValidation';

const CombatantActionForm = props => {
  // console.log("FORM COMBATANTS AND Player Count: ", valuess, props.playerCount);

  const handleSubmit = (combatant) => {
    console.log("Submitting Action: ", combatant);
    props.handleSubmit(combatant);
  };
  const onDelete = (combatant) => {
    console.log("Deleting Action: ", combatant);
    props.onDelete(combatant);
  };
  const handleCancel = () => {
    props.handleCancel();
  };

  return (
        <Portal>
          <Formik
          onSubmit={ props.handleSubmit }
          onDelete={ props.onDelete }
          validationSchema={validation}
          validateOnChange={true}
          initialValues={ props.combatant }>
          {({handleChange, handleSubmit, values, errors, isSubmitting, touched, isValid, setFieldValue, setFieldTouched, initialValues, onDelete }) => (
            <Dialog
              style={ styles.dialog }
              visible={ props.visible }
              onDismiss={ () =>
                { !isValid ?
                null
                :
                props.handleCancel() }}
            >
              <Dialog.Title>
                <Text style={ styles.dialogHeader}> { values.name } </Text>
                <Text style={ styles.dialogSubHeader}> { values.cType } </Text>
              </Dialog.Title>
              <Dialog.Content style={ styles.dialogContentWrapper }>
                <Text style={ styles.combatantStatText }> Hit Points: </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <IconButton onPress={() => setFieldValue('values.stats.hp', values.stats.hp--) }
                    icon="minus"
                    color="red"
                    size={20}
                    disabled={ values.stats.hp == 0}
                  />
                  <TextInput value={ values.stats.hp.toString() }
                    onChangeText={ (value) => {
                      let newValue = parseInt(value, 10);
                      newValue = isNaN(newValue) ? '' : newValue;
                      setFieldValue('stats.hp', newValue)
                    }}
                    keyboardType='numeric'
                    style={ styles.combatantStatInput } />
                  <IconButton onPress={() => setFieldValue('values.stats.hp', values.stats.hp++) }
                    icon="plus"
                    color="green"
                    size={20}
                    disabled={ values.stats.hp == values.stats.maxHp}
                  />
                </View>
                </View>
              </Dialog.Content>

              <Dialog.Content style={ styles.dialogContentWrapper }>
                <Text style={ styles.combatantStatText }> Max HP: </Text>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                  <IconButton onPress={() => setFieldValue('values.stats.maxHp', values.stats.maxHp--) }
                    icon="minus"
                    color="red"
                    size={20}
                    disabled={ values.stats.maxHp == 0}
                  />
                  <TextInput value={ values.stats.maxHp.toString() }
                    onChangeText={ (value) => {
                      let newValue = parseInt(value, 10);
                      newValue = isNaN(newValue) ? '' : newValue;
                      setFieldValue('stats.maxHp', newValue)
                    }}
                    keyboardType='number-pad'
                    style={ styles.combatantStatInput } />
                    <IconButton onPress={() => setFieldValue('values.stats.maxHp', values.stats.maxHp++) }
                    icon="plus"
                    color="green"
                    size={20}

                  />
                </View>
                </View>
              </Dialog.Content>
  {/* Render Death Saves Indicators if HP == 0 */}
              <Dialog.Content style={ styles.dialogContentWrapper }>
                <Text style={ styles.combatantStatText }> Death Saves: </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                  <IconButton onPress={() => setFieldValue('stats.deathSaves.failed', values.stats.deathSaves.failed--) }
                    icon="minus"
                    color="red"
                    size={20}
                    disabled={ values.stats.hp != 0 || values.stats.deathSaves == 3 }
                  />
                  <Icon name='skull' size={16} color={ values.stats.deathSaves.failed == -3? "red" : "grey" } />
                  <Icon name='skull' size={16} color={ values.stats.deathSaves.failed <= -2? "red" : "grey" } />
                  <Icon name='skull' size={16} color={ values.stats.deathSaves.failed <= -1? "red" : "grey" } />
                  <Avatar.Image
                    size={20}
                    style={ styles.combatantImage }
                    source={ values.avatar ? {uri: values.avatar} : require("../../assets/images/whtenemy.png") }
                  />
                  <Icon name='heart-pulse' size={16} color={ values.stats.deathSaves.succeeded >= 1? "green" : "grey" } />
                  <Icon name='heart-pulse' size={16} color={ values.stats.deathSaves.succeeded >= 2? "green" : "grey" } />
                  <Icon name='heart-pulse' size={16} color={ values.stats.deathSaves.succeeded >= 3? "green" : "grey" } />

                  <IconButton onPress={() => setFieldValue('stats.deathSaves.failed', values.stats.deathSaves.failed++) }
                    icon="plus"
                    color="green"
                    size={20}
                    disabled={ values.stats.hp != 0 || values.stats.deathSaves == 3 }
                  />
                </View>
              </Dialog.Content>
              <Dialog.Actions>
              { (errors ?
                  console.log("ERRORS", _.mapKeys(errors), values)

                : console.log("VALUES: ", values) )
              }
                <Button onPress={ onDelete }>Remove</Button>
                <Button disabled={ !isValid } onPress={ handleSubmit }>Dismiss</Button>
              </Dialog.Actions>
            </Dialog>
          )}
          </Formik>
        </Portal>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 5,
  },
  combatantStatInput: {
    justifyContent: 'center',
    width: 70,
    height: 40,
    fontSize: 20,
  },
  dialogContainer: {
  },
  dialog: {
  },
  dialogHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dialogHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  dialogSubHeader: {
    fontSize: 18,
    color: 'rgb(77, 77, 77)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(77, 77, 77)',
  },
  dialogContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  combatantStatText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});



 export default CombatantActionForm;
