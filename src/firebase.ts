import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './firebase.config.json';

const initializeApp = (): firebase.app.App => firebase.initializeApp(
  firebaseConfig.result.sdkConfig,
);

export default firebase;
export {
  initializeApp,
};
