import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';


import MonsterItem from './MonsterItem';

const MonsterList = props => {

  const handlePress = (id) => {
    props.handlePress(id);
  };
  const editMonsterHandler = (id) => {
    props.editMonsterHandler(id);
  };

  const removeMonsterHandler = (id) => {
    props.removeMonsterHandler(id);
  };


  const renderMonster = (itemData, i) => {
    // console.log("ITEMDATA", itemData);
    // console.log("Monster Instance", itemData.item.constructor.name);
    return (

        <MonsterItem
          key={ itemData.item.id }
          index={itemData.index}
          id={itemData.item.id}
          player={ itemData.item }
          onEdit={ editMonsterHandler }
          handlePress={ handlePress }
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
        renderItem={ renderMonster.bind(this) }
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

export default MonsterList;
