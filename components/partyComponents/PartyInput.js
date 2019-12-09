/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import FormButton from '../FormButton';

const PartyInput = props => {
  const [ listViewToggle, setListViewToggle ] = useState(true);
  const [ addViewToggle, setAddViewToggle ] = useState(false);
  const parties = useSelector(state => state.parties.parties);
  const [ selectedParty, setSelectedParty ] = useState('');
  // console.log("PARTIIIIESSSSSUHH: ", parties);
  const handlePress = (partyId) => {
    setSelectedParty( parties.find((party) => party.id === partyId ) );
  };
  const handleClearParty = () => {
    console.log("CLEARING");
    setSelectedParty('');
  };
  const handleTogglePress = (string) => {
    if(string == 'list'){
      setListViewToggle(true);
      setAddViewToggle(false);
    } else {
      setListViewToggle(false);
      setAddViewToggle(true);
    }
  };
  return (
      <View style={ styles.container }>
        <View style={ styles.headerContainer }>
          <Text style={ styles.inputLabel }> { props.label } { selectedParty != ''? selectedParty.title : 'none'} </Text>
          <TouchableWithoutFeedback onPress={ () => { handleClearParty() } } >
            <Icon name="cancel" size={24} color="#FF3D00" />
          </TouchableWithoutFeedback>
        </View>

        <View style={ styles.buttonContainer}>
          <View style={ styles.button }>
            <FormButton icon="format-list-bulleted" text="Party list" iconPosition="left" color={ listViewToggle? '#00578A' : 'rgba(0, 87, 138, 0.6)'} onPress={ () => handleTogglePress('list') } />
          </View>
          <View style={ styles.button }>
            <FormButton icon="plus" text="Add new party" iconPosition="left" color={ listViewToggle? 'rgba(0, 87, 138, 0.6)' : '#00578A' } onPress={ () => handleTogglePress('add') } />
          </View>
        </View>
        {
          listViewToggle?
          (
            <ScrollView style={ styles.partyListContainer }>
              {
                (parties.length) == 0 ? (
                  <View>
                    <Text> Looks like you haven't made any parties yet. </Text>
                    <Text> Click add new party to begin setting one up! </Text>
                  </View>
                )
                :
                ( parties.map( party => (
                  <TouchableHighlight
                    key={ party.id }
                    onPress={ () => { handlePress(party.id) } } >

                    <View style={ styles.partyItemContainer }>
                      <Text> { party.title } </Text>
                      <Text> { party.players.length } </Text>
                    </View>
                  </TouchableHighlight>
                ))
                )
              }
              </ScrollView>
            )
            :
            (
              <Text> Hi </Text>
            )
        }
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  partyListContainer: {
    flexDirection: 'row'
  },
  partyItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-around',
  },
  button: {
    width: '50%'
  },
  inputLabel: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});



 export default PartyInput;