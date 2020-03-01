import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { Dialog, Portal, Provider, Button } from 'react-native-paper';

import PlayerItem from './PlayerItem';
import PlayerDetailModal from './PlayerDetailModal';

const PlayerList = props => {
  const [ selectedPlayer, setSelectedPlayer ] = useState(props.players[0]);
  const [ visible, setVisible ] = useState(false);
  const [ refresh, setRefresh ] = useState(false);
  const handlePress = (player) => {
    props.handlePress(player);
  };

  const showDetailModal = (player) => {
    setSelectedPlayer(player);
    console.log("Long boi");
    setVisible(true);
  };
  const hideDetailModal = () => {
    setVisible(false);
    setRefresh(!refresh);
  };

  const removePlayerHandler = (id) => {
    props.removePlayerHandler(id);
    visible == true ? hideDetailModal() : null;
  };


  const renderPlayer = (player, i) => {
    // console.log("ITEMDATA", player);
    // console.log("Player Instance", player.constructor.name);
    return (
        <PlayerItem
          key={ player.id }
          index={player.index}
          id={player.id}
          player={ player }
          handlePress={ () => handlePress(player) }
          handleLongPress={ () => showDetailModal(player) }
          onDelete={ removePlayerHandler }
        />
    )

    // })
  };

  return (
    <View style={styles.container}>
        {
          props.players.map( (player, index) => {
            return(renderPlayer(player, index));
          })
        }
      <Portal>
        <PlayerDetailModal player={selectedPlayer} visible={visible} onDismiss={() => setVisible(false)}/>
      </Portal>
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
