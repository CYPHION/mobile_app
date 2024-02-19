/**
 * @format
 */
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { store } from './src/store';
import { Color } from './src/utils/color';

const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Color.white,

    },
};


const ReduxApp = () => (
    <NavigationContainer theme={MyTheme}>
        <Provider store={store}>
            <App />
            <Toast />
        </Provider>
    </NavigationContainer>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
