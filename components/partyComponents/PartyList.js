import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


import PartyItem from './PartyItem';

const PartyList = props => {
  const filteredEncounters = () => {

      // const newPlayer = { id: Math.random().toString(),: player };
      // const initiatives = currentPlayers.map( (key,index) => Number(key.initiative));
      // console.log("initiatives", initiatives);
      // const newIndex = _.sortedLastIndexBy(initiatives, Number(newPlayer.initiative), (num) => -num);
      // console.log("NEW INDEX: ", newIndex);
      // console.log("New list?", currentPlayers.splice(newIndex, 0, newPlayer));
      // currentPlayers.splice()
      // return currentPlayers.splice(newIndex, 0, newPlayer);


  };
  const handlePress = (id) =>{
    props.handlePress(id);
  }
  const editPartyHandler = (id) => {
    props.editPartyHandler(id);
  };

  const removePartyHandler = (id) => {
    props.removePartyHandler(id);
  };


  const renderParty = (itemData, i) => {
    //TO DO: add logic for next round here?
    // console.log("ORDERRRR INITIAVTIVE ORDER", itemData);
    //order.sort((a, b) => a.initiative.localeCompare(b.initiative)).reverse();
    return (
      <PartyItem index={itemData.index} party={ itemData.item } onEdit={ editPartyHandler } onDelete={ removePartyHandler } handlePress={ handlePress }/>
    )

    // })
  };

  return (
    <View style={ styles.container }>
      <FlatList
        style={ styles.listContainer }
        keyExtractor={(item, index) => item.id}
        data={ props.parties }
        renderItem={ renderParty.bind(this) }
      />
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
  },
  listContainer: {
    width: "100%",
    height: "100%",
  },
});

export default PartyList;
