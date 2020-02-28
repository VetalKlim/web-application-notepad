// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {InterfaceKey} from './interfase';

export const environment: InterfaceKey = {
  production: false,
  apiKey: 'AIzaSyB83rV_D-_pD7_RGUNB29D8MQ9ICktqQX4',
  fbUrl: 'https://application-notepad.firebaseio.com',
  projectId: 'application-notepad',
  firebase: {
    apiKey: 'AIzaSyB83rV_D-_pD7_RGUNB29D8MQ9ICktqQX4',
    authDomain: 'application-notepad.firebaseapp.com',
    databaseURL: 'https://application-notepad.firebaseio.com',
    projectId: 'application-notepad',
    storageBucket: 'application-notepad.appspot.com',
    messagingSenderId: '47460517594',
    appId: '1:47460517594:web:6b5be5e8e6bc74275e47e3'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
