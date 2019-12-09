import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


import EncounterItem from './EncounterItem';

const EncounterList = props => {
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
  const editEncounterHandler = (id) => {
    props.editEncounterHandler(id);
  };

  const removeEncounterHandler = (id) => {
    props.removeEncounterHandler(id);
  };


  const renderEncounter = (itemData, i) => {
    //TO DO: add logic for next round here?
    // console.log("ORDERRRR INITIAVTIVE ORDER", itemData);
    //order.sort((a, b) => a.initiative.localeCompare(b.initiative)).reverse();
    console.log("ITEMDATA", itemData);
    return (

        <EncounterItem index={itemData.index} encounter={ itemData.item } onEdit={ editEncounterHandler } onDelete={ removeEncounterHandler } navigate={ props.navigate }/>
    )

    // })
  };

  return (
    <View>
      <FlatList
        style={ styles.listContainer }
        keyExtractor={(item, index) => item.id}
        data={ props.encounters }
        renderItem={ renderEncounter.bind(this) }
      />
    </View>
  )

};

const styles = StyleSheet.create({
  listContainer: {
    //width: "90%"
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
    borderRadius: 20
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: 300,
    marginBottom: 10
  },

});

export default EncounterList;
