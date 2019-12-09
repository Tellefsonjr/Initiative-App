/* aka Home Screen, shows encounter list */

import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, ImageBackground, ScrollView, } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux';
import Modal from "react-native-modalbox";

import EncounterForm from '../components/encounterComponents/EncounterForm';
import EncounterList from '../components/encounterComponents/EncounterList';
import CustomHeaderButton from '../components/HeaderButton';

import * as encounterActions from '../store/actions/encounters'; //Redux Actions

const EncountersScreen = props => {
  const dispatch = useDispatch();

  const encounters = useSelector(state => state.encounters.encounters);

  const [ isAdding, setIsAdding ] = useState( false );
  const [ isPlaying, setIsPlaying ] = useState( false );
  const [ isEditing, setIsEditing ] = useState( false );

  console.log("IS ADDING:", isAdding);
  const addEncounterHandler = ( encounter ) => {
    dispatch(encounterActions.addEncounter(encounter));
    setIsAdding(!isAdding);
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

  const cancelEncounterHandler = () => {
    setIsAdding(false);
  };

  const toggleEncounter = () => {
    setIsPlaying(!isPlaying);
  };
  const handleButtonAction = () => {
    setIsAdding(!isAdding);
  };
  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={[styles.backgroundImage, styles.container]} >
      <ScrollView
          style={ styles.container }
          contentContainerStyle={styles.contentContainer}
          keyboardShouldPersistTaps='never'
          >
          { encounters.length == 0 ?
            <View style={ styles.emptyContainer }>
              <Text style={ styles.textEmpty }> Your encounters are empty! </Text>
            <Text style={ styles.textEmpty }> Click the + icon to add encounters! </Text>
            </View>
              :
            <EncounterList encounters={ encounters } editEncounterHandler={ editEncounterHandler } removeEncounterHandler={ removeEncounterHandler } isPlaying={isPlaying} navigate={ props.navigation.navigate }/>
          }
          <Modal
            style={ styles.modal }
            backdropPressToClose={true}
            swipeToClose={false}
            swipeThreshold={50}
            isOpen={ isAdding }
            onClosed={ cancelEncounterHandler }
            backdropOpacity={0.7}
            position={"center"}
            >
            <EncounterForm addEncounterHandler={ addEncounterHandler }/>
          </Modal>
      </ScrollView>
      <View>


      </View>
      <ActionButton buttonColor='#00578A' size={ isAdding? 0 : 56}>
        <ActionButton.Item buttonColor='#FF3D00' title={ isPlaying? "Stop Encounter" : "Resume Encounter" } onPress={ toggleEncounter }>
          <Icon name={ isPlaying? "pause" : "play"} style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item buttonColor='#00B358' title={ isPlaying? "Next Round" : "Add Encounter"} onPress={ handleButtonAction }>
          <Icon name={ isPlaying? "arrow-forward" : "plus"} style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
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
    // paddingTop: 30,
  },
  modal: {
    height: '85%',
    padding: 0,
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  hiddenButton: {

  }
});

export default EncountersScreen;
