import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import Thunk from 'redux-thunk';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider, Portal } from 'react-native-paper';


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

const store = createStore(rootReducer, applyMiddleware(Thunk));
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
    <Provider>
    <Portal>
    <ReduxProvider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    </ReduxProvider>
    </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
