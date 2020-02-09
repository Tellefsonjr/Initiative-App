import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';


import EncounterItem from './EncounterItem';

const EncounterList = props => {
  const filteredEncounters = () => {

  };
  const editEncounterHandler = (id) => {
    props.editEncounterHandler(id);
  };

  const removeEncounterHandler = (id) => {
    props.removeEncounterHandler(id);
  };


  const renderEncounter = (itemData, i) => {
    return (

        <EncounterItem index={itemData.index} encounter={ itemData.item } onEdit={ editEncounterHandler } onDelete={ removeEncounterHandler } navigate={ props.navigate }/>
    )

  };

  return (
    <View style={ styles.listContainer }>
      <FlatList
        extraData={ props.encounters }
        keyExtractor={(item, index) => index.toString()}
        data={ props.encounters }
        renderItem={ renderEncounter.bind(this) }
      />
    </View>
  )

};

const styles = StyleSheet.create({
  listContainer: {
    height: Dimensions.get('window').height -170,
  },

});

export default EncounterList;
