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
    flex: 1,
  },
  listContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 5,
  },

});

export default PlayerList;
