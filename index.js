/**
 * @format
 */
import { stripePublishKey } from '@env';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StripeProvider } from '@stripe/stripe-react-native';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { NotificationProvider } from './src/context/NotificationContext';
import { store } from './src/store';
import { Color } from './src/utils/color';
import Config from './src/utils/config/branchNameConfig';



const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: Color.white,

    },
};




const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: 'green' }}
            text1NumberOfLines={3}
        />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: 'red' }}
            text1NumberOfLines={3}
        />
    ),
};

const initializeApp = async () => {
    await Config.loadBranchName(); // Load branch name from AsyncStorage
};

initializeApp();

const ReduxApp = () => (
    <Provider store={store}>
        <StripeProvider publishableKey={stripePublishKey}>
            <NotificationProvider>
                <NavigationContainer theme={MyTheme}>
                    <App />
                    <Toast config={toastConfig} />
                </NavigationContainer>
            </NotificationProvider>
        </StripeProvider>
    </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
