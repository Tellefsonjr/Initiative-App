/* aka Home Screen, shows encounter list */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux';
import { FAB, Portal, Provider, Modal } from 'react-native-paper';

import EncounterList from '../components/encounterComponents/EncounterList';
import EncounterForm from '../components/encounterComponents/EncounterForm';
import CustomHeaderButton from '../components/HeaderButton';

import * as encounterActions from '../store/actions/encounters'; //Redux Actions

const EncountersScreen = props => {
  const dispatch = useDispatch();

  const encounters = useSelector(state => state.encounters.encounters);
  const [ open, setOpen ] = useState( false );
  const [ visible, setVisible ] = useState( false );
  const [ isEditing, setIsEditing ] = useState( false );

  console.log("Rendering EncountersScreen");

  const addEncounterHandler = ( encounter ) => {
    dispatch(encounterActions.addEncounter(encounter));
    setVisible(false);
  };
  const editEncounterHandler = ( encounterId ) => {
    setIsEditing(!isEditing);
    // dispatch(encounterActions.updateEncounter(encounter));

    // setEncounters ( currentEncounters => {
    //   return currentEncounters.filter((encounter) => encounter.id !== encounterId );
    // })
  };

  const removeEncounterHandler = ( encounterId ) => {
    dispatch(encounterActions.deleteEncounter(encounterId));
  };

  const showModal = () => {
    console.log("SHOWING");
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={[styles.backgroundImage, styles.container]} >
      <View style={ styles.container }>
        <View style={ styles.contentContainer }>
            { encounters.length == 0 ?
              <View style={ styles.emptyContainer }>
                <Text style={ styles.textEmpty }> Your encounters are empty! </Text>
              <Text style={ styles.textEmpty }> Click the + icon to add encounters! </Text>
              </View>
                :
              <EncounterList encounters={ encounters } editEncounterHandler={ editEncounterHandler } removeEncounterHandler={ removeEncounterHandler } navigate={ props.navigation.navigate }/>
            }
        </View>
        <Provider>
          <Portal>
          <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={ styles.modalContainer }>
              <EncounterForm handleSubmit={ addEncounterHandler } cancelEncounterHandler={ hideModal }/>
            </Modal>
          </Portal>
        </Provider>
        <Provider>
          <Portal>
            <FAB.Group
              open={open}
              icon={open ? 'close' : 'dots-vertical'}
              actions={[
                { icon: 'reply', label: 'Resume Encounter', onPress: () => console.log('Pressed star')},
                { icon: 'filter-variant', label: 'Sort', onPress: () => console.log('Pressed email') },
                { icon: 'plus', label: 'Add Encounter', color: '#00B358', onPress: () => {showModal()} },
              ]}
              onStateChange={({ open }) => setOpen(open)}
              onPress={() => {
                if (open) {
                  // do something if the speed dial is open
                }
            }}
            />
          </Portal>
        </Provider>
      </View>
    </ImageBackground>
  );
};

EncountersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Encounters",
    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Menu" iconName="menu" onPress={ () => { navData.navigation.openDrawer()}} />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
      flex: 1,
      resizeMode: 'cover', // or 'stretch'
  },
  emptyContainer: {
    alignItems: "center",
  },
  textEmpty: {
    color: 'white',
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
  },
  modalContainer: {
    height: '80%',
    backgroundColor: 'white'
  }
});

export default EncountersScreen;
