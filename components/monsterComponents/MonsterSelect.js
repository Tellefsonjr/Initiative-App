import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Chip, Avatar, Searchbar, Button, IconButton, Dialog, Portal, Paragraph } from 'react-native-paper';
import DynamicForm from '../DynamicForm';
import MonsterList from './MonsterList';
import MonsterSelectItem from './MonsterSelectItem';


const MonsterSelect = props => {
  const [ monsters, setMonsters ] = useState( useSelector(state => state.monsters.monsters) );
  const [ query, setQuery ] = useState('');
  const [ visible, setVisible ] = useState(false);
  //dive into nested monster array...
  const [ selectedMonsters, setSelectedMonsters ] = useState( props.monsters );
  const [ filteredMonsters, setFilteredMonsters ] = useState( monsters );
  const [ selectedMonster, setSelectedMonster ] = useState({});
  const [ isSelected, setIsSelected] = useState( selectedMonsters.find( m => m.id == selectedMonster.id));
  const [ refresh, setRefresh ] = useState(false);

  const handleSubmit = (selectedMonsters) => {
    console.log("Subbmitting monsters: ", selectedMonsters);
    props.handleSubmit(selectedMonsters)
  };
  const addMonster = (monsterId) => {
    const existing = selectedMonsters.find( m => m.id == monsterId);
    existing?
      existing.count ++
    :
    setSelectedMonsters( [...selectedMonsters, {id: monsterId, count: 1}]);
    setRefresh(!refresh);
  }
  const decreaseMonster = (monsterId) => {
    console.log("Decreasing", monsterId);
    const existing = selectedMonsters.find( m => m.id == monsterId);
    existing.count > 1?
      (existing.count --)
      :
      (setSelectedMonsters( selectedMonsters.filter((selected) => selected.id !== monsterId ) ));
    setRefresh(!refresh);

  }
  const removeMonster = (monsterId) => {
    setSelectedMonsters( selectedMonsters.filter((selected) => selected.id !== monsterId ) );
  }
  const handleClearParty = () => {
    setSelectedParty('');
  };
  const searchByName = (query) => {
    setQuery(query);
    setFilteredMonsters(monsters.filter( monster => monster.name.indexOf(query) > -1));
  }
  const showDialog = (monster) => {
    setSelectedMonster(monster);
    monsterForCount = selectedMonsters.find( m => m.id == monster.id);
    monsterForCount ? setIsSelected( monsterForCount ) : setIsSelected( null );
    setVisible(true);
  }
  const hideDialog = () => {
    setVisible(false);
  }
  const renderMonster = (itemData, i) =>{
    const count = selectedMonsters.find( m => m.id == itemData.item.id );
    return(
        <MonsterSelectItem monster={ itemData.item }
          isSelected={count}
          handlePress={ () => addMonster( itemData.item.id ) }
          handleLongPress={ () => showDialog( itemData.item )}
          decreaseMonster={ () => decreaseMonster( itemData.item.id )}
          removeMonster={ () => removeMonster( itemData.item.id )}
          />
    )
  }

  const fields = [
    {label: 'Count', type: 'input-increment', name: 'count', placeholder: '0'},
  ];
  return (
      <View style={ styles.container }>
            <View style={ styles.monsterListContainer }>
              <View style={ styles.searchBarContainer }>
                <Searchbar
                style={ styles.searchBar }
                placeholder="Search by name"
                onChangeText={query => { searchByName(query) }}
                value={query}
                />
              </View>

              <View style={ styles.selectListContainer } >
                <FlatList
                extraData={ refresh }
                keyExtractor={(item, index) => index.toString()}
                data={ filteredMonsters }
                renderItem={ (item, index) => renderMonster(item, index) } />
              </View>
              {
                selectedMonster ?
                <View style={ styles.dialogContainer }>
                <Portal>
                <Dialog
                style={ styles.dialog }
                visible={ visible }
                onDismiss={ () => hideDialog() }>
                <Dialog.Title>
                <Text style={ styles.dialogHeader}> { selectedMonster.name } </Text>
                <Text style={ styles.dialogSubHeader}> { selectedMonster.type } </Text>
                </Dialog.Title>
                <Dialog.Content style={ styles.dialogContentWrapper }>
                <Text style={ styles.monsterStatText }> Hit Points: { selectedMonster.hp } </Text>
                <Text style={ styles.monsterStatText }> Armor Class: { selectedMonster.ac } </Text>
                <Text style={ styles.monsterStatText }> Initative Bonus: { selectedMonster.initiativeBonus } </Text>
                </Dialog.Content>
                <Dialog.Content style={ styles.dialogContentWrapper }>
                <Text style={ styles.monsterStatText }> Challenge Rating: { selectedMonster.cr } </Text>
                </Dialog.Content>
                <Dialog.Actions>
                {
                  isSelected?
                  <View style={ styles.buttonContainer }>
                    <IconButton onPress={() => decreaseMonster(selectedMonster.id)}
                      icon="minus"
                      size={20}
                    />
                    <Text>{ isSelected.count }</Text>
                    <IconButton onPress={() => addMonster(selectedMonster.id) }
                      icon="plus"
                      size={20}
                    />
                  </View>
                  :
                <View style={ styles.buttonContainer }>
                  <Button onPress={() => addMonster(selectedMonster.id)}
                    compact={true}
                    icon="plus">Add</Button>
                </View>
                }
                <Button onPress={() => hideDialog() }>Dismiss</Button>
                </Dialog.Actions>
                </Dialog>
                </Portal>
                </View>

                : ''

              }


              <View style={styles.buttonContainer}>
                <Button onPress={() => {handleCancel} } style={styles.button}
                icon="cancel"
                style={ styles.button }
                mode="contained"
                title="Cancel"
                color="rgba(255, 61, 0, .5)">
                Cancel
                </Button>
                <Button onPress={() => {handleSubmit(selectedMonsters)}}
                  icon="check-circle-outline"
                  style={ styles.button }
                  mode="contained"
                  color="#00578A">
                  Save
                </Button>
              </View>
              </View>

      </View>
    );
}

const styles = StyleSheet.create({
  container: {
  },
  searchBarContainer: {
    padding: 10,
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 30,
  },
  monsterListContainer: {
  },
  selectListContainer: {
  },
  monsterItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  avatar: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: 25,
    height: 25,
    borderWidth: 1,
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
  dialogueSubHeader: {
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
  monsterName: {
    fontWeight: 'bold',
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  monsterStatText: {
    marginRight: 5,
    flexDirection: 'row',
    alignContent: 'flex-end',
  },
  button: {
    width: '40%'
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});



 export default MonsterSelect;
