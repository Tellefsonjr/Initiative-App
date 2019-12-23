/* @flow */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Accordion from 'react-native-collapsible/Accordion';
import Modal from "react-native-modalbox";

import FormButton from '../FormButton';
import PartyList from './PartyList';
import PartyForm from './PartyForm';
import PlayerSelect from '../playerComponents/PlayerSelect';


const PartySelect = props => {
  const [ isAdding, setIsAdding ] = useState(false);
  const parties = useSelector(state => state.parties.parties);
  const [ selectedParty, setSelectedParty ] = useState('');
  // console.log("PARTIIIIESSSSSUHH: ", parties);
  const handlePress = (partyId) => {
    console.log("CLICKED", partyId);
    newParty = parties.find((party) => party.id === partyId )
    setSelectedParty( newParty );
    props.onChangeValue(newParty);
  };
  const handleClearParty = () => {
    console.log("CLEARING");
    setSelectedParty('');
  };
  const toggleModal = (bool) => {
    setIsAdding(bool);
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
            <FormButton icon="plus" text="Add new party" iconPosition="left" color={ '#00578A' } onPress={ () => toggleModal(true) } />
          </View>
        </View>
            <ScrollView contentContainerStyle={ styles.partyListContainer }>
              {
                (parties.length) == 0 ? (
                  <View>
                    <Text> Looks like you haven't made any parties yet. </Text>
                    <Text> Click add new party to begin setting one up! </Text>
                  </View>
                )
                :
                (
                  <PartyList parties={ parties } removePartyHandler={ handlePress } handlePress={ handlePress } />
                )
              }
              </ScrollView>
              <View>
                <Modal
                  style={ styles.modal }
                  backdropPressToClose={true}
                  swipeToClose={false}
                  swipeThreshold={50}
                  isOpen={ isAdding }
                  coverScreen={ true }
                  onClosed={ () => { toggleModal(false) } }
                  backdropOpacity={0.7}
                  position={"center"}
                  >
                    <PartyForm />
                </Modal>
              </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  titleText: {
    color: "white",
  },
  titleCountText: {
    color: "white",
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  partyListContainer: {
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
    fontWeight: 'bold',
    color: "white",
  },
  modal: {
    height: '85%',
    padding: 0,
  },
});



 export default PartySelect;
