import { DrawerContentScrollView, DrawerItem, createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { MyStack } from '../Stack';
import TabNavigation from '../Tab';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
    const navigation = useNavigation();

    return (
        <DrawerContentScrollView {...props}>

            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
                label="Custom Root Screen"
                onPress={() => {
                    navigation.navigate('root', { screen: 'viewChildren' });
                }}
            />
        </DrawerContentScrollView>
    );
}


function MyDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false, // Hide header for all screens
            }}
        >
            <Drawer.Screen name="tabs" component={TabNavigation} />
            <Drawer.Screen name="root" component={MyStack} />

        </Drawer.Navigator>
    );
}

export default MyDrawer