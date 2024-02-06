/**
 * @format
 */

import { AppRegistry } from 'react-native';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/store';

const ReduxApp = () => (
    <Provider store={store}>
        <App />
        <Toast />
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
