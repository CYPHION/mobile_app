import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/base/CustomButton';
import MyModal from '../../components/base/Modal';
import { handleLogout } from '../../store/slice/user';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { getImage, screenDimensions } from '../../utils/functions';
import { MyStack } from '../Stack';
import TabNavigation from '../Tab';

const Drawer = createDrawerNavigator();

const DrawerList = [
    { label: 'Home', navigateTo: 'home', icon: 'right', mainRoute: 'tabs' },
    { label: 'My Profile', navigateTo: 'profiles', icon: 'right', mainRoute: 'tabs' },
    { label: 'View Children', navigateTo: 'children', icon: 'right', mainRoute: 'root' },
    { label: 'View Appointment', navigateTo: 'viewAppointment', icon: 'right', mainRoute: 'root' },
    { label: 'Leave Application', navigateTo: 'leaveApplication', icon: 'right', mainRoute: 'root' },
    { label: 'Pay Fee', navigateTo: 'fee', icon: 'right', mainRoute: 'tabs' },
    { label: 'Compensation', navigateTo: 'compensation', icon: 'right', mainRoute: 'root' },
    { label: 'Testimonials', navigateTo: 'testimonials', icon: 'right', mainRoute: 'root' },
    { label: 'Logout', navigateTo: '', icon: 'right' },
];

const DrawerLayout = ({ icon, label, navigateTo, setOpen, mainRoute }) => {
    const navigation = useNavigation();
    const routeName = navigation.getCurrentRoute()?.name; // Get current route name

    // Check if the route name exists and matches navigateTo
    const isActiveScreen = routeName && routeName === navigateTo;

    return (
        <TouchableOpacity activeOpacity={0.7} style={isActiveScreen && {
            backgroundColor: `rgba(255,255,255,0.2)`, borderTopEndRadius: 50,
            borderBottomEndRadius: 50,
        }} onPress={() => {
            if (label === "Logout") {
                navigation.dispatch(DrawerActions.closeDrawer());
                setOpen(true)
            } else {
                navigation.navigate(`${mainRoute}`, { screen: navigateTo });
            }
        }}
        >
            <View style={[styles.labelContainer, { width: '100%', }]}>
                <Text style={{ fontSize: FontSizes.xl, fontWeight: '600', color: Color.white }}>{label}</Text>

                {icon && <AntIcon name={icon} color={Color.white} size={20} />}
            </View>
        </TouchableOpacity>
    )
};


function CustomDrawerContent(props) {
    const [open, setOpen] = useState(false)
    const dipatch = useDispatch()
    const user = useSelector(state => state?.user?.data)
    const src = user?.picture ? { uri: getImage(user?.picture) } : require("../../images/profileAvatar.png");

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <TouchableOpacity activeOpacity={0.8}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Image resizeMode='contain' source={src} style={styles.image} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.title}>{user?.firstName} {user?.lastName}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.drawerSection}>
                    {DrawerList.map((el, i) => {
                        return (
                            <DrawerLayout
                                key={i}
                                label={el.label}
                                navigateTo={el.navigateTo}
                                icon={el.icon}
                                setOpen={setOpen}
                                mainRoute={el.mainRoute}
                                {...props}
                            />
                        );
                    })}
                </View>
            </View>

            <MyModal
                modalVisible={open}
                setModalVisible={setOpen}
                children={
                    <View style={{ gap: 10 }}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: FontSizes.lg,
                                    color: Color.text,
                                    fontFamily: FontFamily.medium,
                                },
                            ]}
                        >
                            Log Out?
                        </Text>
                        <Text style={[styles.text]}>Are you sure you want to logout?</Text>
                        <View style={styles.btnView}>
                            <CustomButton
                                title={'Cancel'}
                                btnstyle={{ paddingVertical: 4, backgroundColor: "#DDD" }}
                                onPress={() => setOpen(false)}
                                textStyle={{ color: Color.text }}
                            />
                            <CustomButton
                                title={'Log Out'}
                                variant={'fill'}
                                btnstyle={{ paddingVertical: 4 }}
                                onPress={() => {
                                    dipatch(handleLogout())
                                    setOpen(!open)
                                }}
                            />
                        </View>
                    </View>
                }
            />

        </DrawerContentScrollView>

    );
}


function MyDrawer({ old }) {
    const navigation = useNavigation();

    const user = useSelector(state => state?.user?.data)
    const global = useSelector(state => state?.global?.data)
    useEffect(() => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'root', params: { screen: 'home' } }],
            }),
        );
    }, [old]);



    return (

        <Drawer.Navigator
            initialRouteName='root'
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false, // Hide header for all screens
                drawerStyle: {
                    backgroundColor: '#1F2544',
                    width: '100%',
                },
                swipeEnabled: (!!global.students && !!user.email)
            }}

        >
            <Drawer.Screen name="tabs" component={TabNavigation} />
            <Drawer.Screen name="root" component={MyStack} />

        </Drawer.Navigator>

    );
}

export default MyDrawer

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
        padding: 30
    },
    title: {
        fontSize: FontSizes.xxxl,
        marginTop: 3,
        color: Color.white,
        fontWeight: 'bold',
    },

    drawerSection: {
        marginTop: 25,
        paddingTop: 25,
        marginLeft: 0,
        borderTopWidth: 0.8,
        borderTopColor: Color.white,
        gap: 10
    },
    image: {
        backgroundColor: Color.grayBackground,
        width: screenDimensions.width * 0.18,
        height: screenDimensions.width * 0.18,
        borderRadius: screenDimensions.width * 0.18 * 0.5,
    },
    labelContainer: {
        marginLeft: 0,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontFamily: FontFamily.interRegular,
        textAlign: 'center',
        color: Color.text
    },
    btnView: {
        width: '15%'
    },
    btnView: {
        // marginTop: 15,
        width: "100%",
        justifyContent: "space-between",
        // backgroundColor: 'red',
        flexDirection: "row",
    },
});