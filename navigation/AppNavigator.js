import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import MainTabNavigator from './MainTabNavigator';

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
});

// import {
//   createStackNavigator, createAppContainer
// } from 'react-navigation';
// const AppNavigator = createStackNavigator({
//   // You could add another route here for authentication.
//   // Read more at https://reactnavigation.org/docs/en/auth-flow.html
//   Main: MainTabNavigator,
// });
// const App = createAppContainer(AppNavigator);
//
// export default App;
