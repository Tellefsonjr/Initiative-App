import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableHighlight, Keyboard, Text, Animated, KeyboardAvoidingView, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PartyInput from '../partyComponents/PartyInput';

const EncounterInput = props => {
  const [ title, setTitle ] = useState('');
  const [ selection, setSelection ] = useState('party');
  const [ encounter, setEncounter ] = useState({
    id: Math.random().toString(),
    title: title,
    players: [],
    enemies: [],
    allies: [],
  })

  const encounterInput = enteredText => {
    setState({
      title: enteredText
    });
  };

  const toggleSelectionHandler = (selection) => {
    setSelection(selection);
  };
  const renderForm = (selection) => {
    switch(selection){
      case 'party':
        return <PartyInput />
      case 'enemies':
        return <Text style={ styles.formColor }> enemies </Text>
      case 'allies':
        return <Text style={ styles.formColor }> allies </Text>
    }
  };
  const addEncounterHandler = () => {
    const encounter = {
      id: Math.random().toString(),
      title: title,
      players: [],
      enemies: [],
      allies: [],
    }
    props.onAddEncounter(encounter);
    setTitle("");
  };
  const cancelHandler = () => {
    props.onCancel();
    setTitle("");
  };


// TO DO: Modal doesn't render well in WEB
  return (

        <Animated.View style={ styles.inputContainer } key="EncounterInput">
          <KeyboardAvoidingView behavior="padding" enabled>
            <Text style={ styles.inputHeader }> Add Encounter </Text>
            <Text style={ styles.inputLabel }> Title: </Text>
            <TextInput
              label="title"
              style={ styles.input }
              placeholder="Enter a title..."
              title="title"
              autoFocus={ true }
              onChangeText={ text => setTitle(text) }
              value={ title }
              clearButtonMode="always"
              returnKeyType="next"
            />
          <View style={ styles.tabBarContainer}>
            <TouchableHighlight onPress={ () => toggleSelectionHandler("party") }>
              <View style={ selection == 'party' ? [styles.active, styles.tabBarIcon] : styles.tabBarIcon } >
                <Icon
                  style={ selection == 'party' ? [styles.active] : '' }
                  size={ 28 } name='account-outline' />
                <Text style={ selection == 'party' ? [styles.active] : '' }> ({encounter.players.length}) </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={ () => toggleSelectionHandler("enemies") }>
              <View style={ selection == 'enemies' ? [styles.active, styles.tabBarIcon] : styles.tabBarIcon } >
                <Icon
                  style={ selection == 'enemies' ? [styles.active] : '' }
                  size={ 28 } name='emoticon-devil-outline' />
                <Text style={ selection == 'enemies' ? [styles.active] : '' }> ({encounter.enemies.length}) </Text>
              </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={ () => toggleSelectionHandler("allies") }>
              <View style={ selection == 'allies' ? [styles.active, styles.tabBarIcon] : styles.tabBarIcon } >
                <Icon
                  style={ selection == 'allies' ? [styles.active] : '' }
                  size={ 28 } name='account-heart-outline' />
                <Text style={ selection == 'allies' ? [styles.active] : '' }> ({encounter.allies.length}) </Text>
              </View>
            </TouchableHighlight>
          </View>
          <View style={ styles.formContainer }>
            <ScrollView>
              { renderForm(selection) }
            </ScrollView>
          </View>


            <View style={ styles.buttonContainer }>
              <View style={ styles.buttonWrapper }>
                <Button
                style={ styles.button }
                title="Cancel"
                color="#AA5439"
                onPress={ cancelHandler }
                />
              </View>
              <View style={ styles.buttonWrapper }>
                <Button
                style={ styles.button }
                title="Add"
                color="#0EA5FF"
                onPress={ addEncounterHandler }
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
  )

};

const styles = StyleSheet.create({
  formContainer: {
    height: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formColor: {
    color: 'black',
  },
  inputContainer: {
    // flex: 2,
    paddingTop: 5,
    paddingLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "white"
  },
  inputHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  inputLabel: {
    marginBottom: 2,
    fontSize: 18,
  },
  tabBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabBarIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: 'gray',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1,
  },
  active: {
    backgroundColor: '#00578A',
    color: 'white',
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    width: '40%',
  },
  button: {
    width: '100%',
    borderRadius: 30,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 5,
    width: 300,
    marginBottom: 10
  },

});

export default EncounterInput;
