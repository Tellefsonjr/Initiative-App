/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import FormButton from '../FormButton';

const PartyInput = props => {
  const [ listViewToggle, setListViewToggle ] = useState(true);
  const parties = useSelector(state => state.parties.parties);
  // console.log("PARTIIIIESSSSSUHH: ", parties);
  const handlePress = (partyId) => {
    console.log("PRESSED Party: ", partyId);
  };
  const handleTogglePress = () => {
    setListViewToggle(!listViewToggle);
  };
  return (
      <View style={styles.container}>
        <View style={ styles.buttonContainer}>
          <View style={ styles.button }>
            <FormButton icon="format-list-bulleted" text="Party list" iconPosition="left" color={ listViewToggle? '#00578A' : 'rgba(0, 87, 138, 0.6)'} onPress={ handleTogglePress } />
          </View>
          <View style={ styles.button }>
            <FormButton icon="plus" text="Add new party" iconPosition="left" color={ listViewToggle? 'rgba(0, 87, 138, 0.6)' : '#00578A' } onPress={ handleTogglePress } />
          </View>
        </View>
        {
          listViewToggle?
          (
            <ScrollView style={ styles.partyListContainer }>
              { parties.map( party => (
                <TouchableHighlight
                  key={ party.id }
                  onPress={ () => { handlePress(party.id) } } >

                  <View style={ styles.partyItemContainer }>
                    <Text> { party.title } </Text>
                    <Text> { party.players.length } </Text>
                  </View>
                </TouchableHighlight>
              ))
              }
              </ScrollView>
            )
            :
            (<Text> Add party here </Text>)
        }
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
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
});



 export default PartyInput;
