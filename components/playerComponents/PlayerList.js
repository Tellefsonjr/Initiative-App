import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


import PlayerItem from './PlayerItem';

const PlayerList = props => {

  const handlePress = (id) => {
    props.handlePress(id);
  };
  const editPlayerHandler = (id) => {
    props.editPlayerHandler(id);
  };

  const removePlayerHandler = (id) => {
    props.removePlayerHandler(id);
  };


  const renderPlayer = (itemData, i) => {
    console.log("PROPS.SELECTABLE", props.selectable);
    const isSelected = props.selectedIds.find((existingId) => existingId == itemData.item.id);
    console.log("Selected this one: ", isSelected);
    // console.log("ITEMDATA", itemData);
    // console.log("Player Instance", itemData.item.constructor.name);
    return (

        <PlayerItem
          key={ itemData.item.id }
          index={itemData.index}
          id={itemData.item.id}
          player={ itemData.item }
          onEdit={ editPlayerHandler }
          handlePress={ handlePress }
          onDelete={ removePlayerHandler }
          selectable={ props.selectable }
          isSelected={ isSelected }
        />
    )

    // })
  };

  return (
    <View style={ styles.container }>
      <FlatList
        contentContainerStyle={ styles.listContainer }
        keyExtractor={(item, index) => item.id}
        data={ props.players }
        renderItem={ renderPlayer.bind(this) }
      />
    </View>
  )

};

const styles = StyleSheet.create({
  container: {

  },
  listContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 5,
  },

});

export default PlayerList;
