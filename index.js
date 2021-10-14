/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App';
import AppEntry from './navigation/appEntry'
import { name as appName } from './app.json';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => AppEntry);
