import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';

import * as _ from 'lodash';

import MonsterItem from './MonsterItem';
import MonsterDetailModal from './MonsterDetailModal';

const MonsterList = props => {
  const [ visible, setVisible ] = useState(false);
  const [ selectedMonster, setSelectedMonster ] = useState(props.monsters[0]);

  const handlePress = (monster) => {
    props.handlePress(monster);
  };
  const editMonsterHandler = (id) => {
    props.editMonsterHandler(id);
  };

  const removeMonsterHandler = (id) => {
    props.removeMonsterHandler(id);
  };
  const showDetailModal = (monster) => {
    setSelectedMonster(monster);
    console.log("Long boi");
    setVisible(true);
  };
  const hideDetailModal = () => {
    setVisible(false);
  };

  const renderMonster = (monster, index) => {
    // console.log("ITEMDATA", monster);
    // console.log("Monster Instance", monster.constructor.name);
    return (

        <MonsterItem
          key={ monster.id }
          index={monster.index}
          id={monster.id}
          monster={ monster }
          count={ props.monsterCount ? _.find(props.monsterCount, {id: monster.id}).count : null }
          onEdit={ editMonsterHandler }
          onDelete={ () => removeMonsterHandler(monster)}
          handlePress={ handlePress }
          handleLongPress={ () => showDetailModal(monster)}
        />
    )

    // })
  };

  return (

    <View style={ styles.container }>
      {
        props.monsters.map( (monster, index) => {
          return(renderMonster(monster, index));
        })
      }
      {
        selectedMonster ?
          <Portal>
            <MonsterDetailModal monster={selectedMonster} visible={visible} onDismiss={() => setVisible(false)}/>
          </Portal>
          :
          null
      }
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

export default MonsterList;
