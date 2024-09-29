/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Amplify from '@aws-amplify/core';
import awsconfig from './src/aws-exports';
console.log('AWS Config:', JSON.stringify(awsconfig, null, 2));
Amplify.configure(awsconfig);

AppRegistry.registerComponent(appName, () => App);
