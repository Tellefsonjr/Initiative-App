import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import * as _ from 'lodash';

import PartyItem from './PartyItem';

const PartyList = props => {
  const filteredParties = () => {

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


  const renderParty = (party) => {
    //TO DO: add logic for next round here?
    // console.log("ORDERRRR INITIAVTIVE ORDER", party);
    //order.sort((a, b) => a.initiative.localeCompare(b.initiative)).reverse();
    let players = props.players.filter(player => party.players.includes(player.id));
    return (
      <PartyItem key={party.id} party={ party } players={players} onEdit={ () => console.log("Editing Party") } onDelete={ () => console.log("Deleting Party") } handlePress={ () => console.log("Pressing Party") }/>
    )

    // })
  };

  return (
    <View style={ styles.container }>
      <ScrollView>
        {
          props.parties?
          props.parties.map(party => {
            return(renderParty(party))
          })
          :
          null
        }
      </ScrollView>

    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  listContainer: {
    width: "100%",
    height: "100%",
  },
});

export default PartyList;
