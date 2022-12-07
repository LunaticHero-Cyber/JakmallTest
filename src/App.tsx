/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import Home from 'screens/Home';
import {COLORS} from 'constants';

const App = () => {
  const backgroundStyle = {
    backgroundColor: COLORS.BLACK20,
  };

  return (
    <>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar backgroundColor={backgroundStyle.backgroundColor} />
      </SafeAreaView>
      <Home />
    </>
  );
};

export default App;
