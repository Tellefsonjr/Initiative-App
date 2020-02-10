import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

//Redux Reducers and Store
import playersReducer from './store/reducers/players';
import monstersReducer from './store/reducers/monsters';
import encountersReducer from './store/reducers/encounters';
import partiesReducer from './store/reducers/parties';

const rootReducer = combineReducers({
  players: playersReducer,
  monsters: monstersReducer,
  encounters: encountersReducer,
  parties: partiesReducer
});

const store = createStore(rootReducer);
// End Redux Reducers and Store

import AppNavigator from './navigation/AppNavigator.js';

const fetchFonts = () => {
  return Font.loadAsync({
    'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded ] = useState(false);

  if (!fontLoaded){
    return <AppLoading startAsync={ fetchFonts } onFinish={ () => setFontLoaded(true) }/>;
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
