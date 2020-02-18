import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';

import PlayerItem from './PlayerItem';

const PlayerList = props => {
  const [ selectedPlayer, setSelectedPlayer ] = useState({});
  const [ visible, setVisible ] = useState(false);
  const [ refresh, setRefresh ] = useState(false);
  const handlePress = (player) => {
    props.handlePress(player);
  };

  const showDialog = (player) => {
    setSelectedPlayer(player);
    console.log("Longboi", player, selectedPlayer);
    setVisible(true);
  };
  const hideDialog = () => {
    setVisible(false);
    setRefresh(!refresh);
  };

  const removePlayerHandler = (id) => {
    props.removePlayerHandler(id);
    visible == true ? hideDialog() : null;
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
          handlePress={ () => handlePress(itemData.item) }
          handleLongPress={ () => showDialog(itemData.item) }
          onDelete={ removePlayerHandler }
        />
    )

    // })
  };

  return (
    <View style={styles.container}>
        <FlatList
        keyExtractor={(item, index) => item.id}
        extraData={ refresh }
        data={ props.players }
        renderItem={ renderPlayer.bind(this) }
        contentContainerStyle={{flexGrow: 1}}
        />
        {
          selectedPlayer ?
          <View style={ styles.dialogContainer }>
          <Portal>
          <Dialog
          style={ styles.dialog }
          visible={ visible }
          onDismiss={ () => hideDialog() }>
          <Dialog.Title>
          <Text style={ styles.dialogHeader}> { selectedPlayer.name } </Text>
          <Text style={ styles.dialogSubHeader}> Level { selectedPlayer.level } </Text>
          <Text style={ styles.dialogSubHeader}> { selectedPlayer.className } </Text>
          </Dialog.Title>
          <Dialog.Content style={ styles.dialogContentWrapper }>
          <Text style={ styles.monsterStatText }> Hit Points: { selectedPlayer.hp } </Text>
          <Text style={ styles.monsterStatText }> Armor Class: { selectedPlayer.ac } </Text>
          <Text style={ styles.monsterStatText }> Initative Bonus: +{ selectedPlayer.initiativeBonus } </Text>
          </Dialog.Content>
          <Dialog.Content style={ styles.dialogContentWrapper }>
          <Text style={ styles.monsterStatText }> Challenge Rating: { selectedPlayer.cr } </Text>
          </Dialog.Content>
          <Dialog.Actions>
          <Button onPress={() => removePlayerHandler(selectedPlayer.id) }
            icon='trash-can'
            color='red'
            compact={true}
            dark={true}
          >Remove</Button>
          <Button onPress={() => hideDialog() }>Dismiss</Button>
          </Dialog.Actions>
          </Dialog>
          </Portal>
          </View>
          :
          null
        }
    </View>
  )

};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
  listContainer: {
    width: '100%',
    justifyContent: 'center',
    padding: 5,
  },
  dialogContainer: {
  },
  dialog: {
  },
  dialogHeaderWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dialogHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  dialogSubHeader: {
    fontSize: 18,
    color: 'rgb(77, 77, 77)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(77, 77, 77)',
  },
  dialogContentWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentSubGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default PlayerList;
