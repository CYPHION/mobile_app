import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import { CommonActions, DrawerActions, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/base/CustomButton';
import MyModal from '../../components/base/Modal';
import { API } from '../../network/API';
import { handleResetData } from '../../store/slice/global';
import { handleLogout } from '../../store/slice/user';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { getImage, screenDimensions } from '../../utils/functions';
import { HomeStack } from '../HomeDrawer';
import { MyStack } from '../Stack';
import TabNavigation from '../Tab';

const Drawer = createDrawerNavigator();

// List of items in the drawer menu
const DrawerList = [
    { label: 'Home', navigateTo: 'home', icon: 'right', mainRoute: 'tabs' },
    { label: 'My Profile', navigateTo: 'profiles', icon: 'right', mainRoute: 'tabs' },
    { label: 'View Children', navigateTo: 'children', icon: 'right', mainRoute: 'root' },
    { label: 'View Appointment', navigateTo: 'viewAppointment', icon: 'right', mainRoute: 'root' },
    { label: 'Report an Absence', navigateTo: 'leaveApplication', icon: 'right', mainRoute: 'root' },
    { label: 'Pay Fee', navigateTo: 'fee', icon: 'right', mainRoute: 'tabs' },
    { label: 'Compensation', navigateTo: 'compensation', icon: 'right', mainRoute: 'root' },
    { label: 'Testimonials', navigateTo: 'addTestimonial', icon: 'right', mainRoute: 'root' },
    { label: 'About us', navigateTo: 'aboutus', icon: 'right', mainRoute: 'homestack' },
    { label: 'Lesson Timings', navigateTo: 'lessonTiming', icon: 'right', mainRoute: 'homestack' },
    { label: 'Fee Plan', navigateTo: 'fees', icon: 'right', mainRoute: 'homestack' },
    { label: 'Summer Pakages', navigateTo: 'summerpakage', icon: 'right', mainRoute: 'homestack' },
    { label: 'Our Services', navigateTo: 'ourservices', icon: 'right', mainRoute: 'homestack' },
    { label: 'Bright Student', navigateTo: 'brightstudent', icon: 'right', mainRoute: 'homestack' },
    { label: 'Terms and conditions', navigateTo: 'termsandcondition', icon: 'right', mainRoute: 'homestack' },
    { label: 'Awarding Bodies', navigateTo: 'awardingbodies', icon: 'right', mainRoute: 'homestack' },
    { label: 'A-Level Results', navigateTo: 'Alevel', icon: 'right', mainRoute: 'homestack' },
    { label: 'GCSE Results', navigateTo: 'gcse', icon: 'right', mainRoute: 'homestack' },
    { label: 'Childcare', navigateTo: 'childcare', icon: 'right', mainRoute: 'homestack' },
    { label: 'Reviews', navigateTo: 'reviews', icon: 'right', mainRoute: 'homestack' },
    { label: 'Careers', navigateTo: 'career', icon: 'right', mainRoute: 'homestack' },
    { label: 'Apply online', navigateTo: 'applyonline', icon: 'right', mainRoute: 'homestack' },
    { label: 'Contact Us', navigateTo: 'contactus', icon: 'right', mainRoute: 'homestack' },
    { label: 'Logout', navigateTo: '', icon: 'right' },
];

// List of items in the drawer menu
const DrawerList2 = [
    { label: 'About us', navigateTo: 'aboutus', icon: 'right', mainRoute: 'homestack' },
    { label: 'Lesson Timings', navigateTo: 'lessonTiming', icon: 'right', mainRoute: 'homestack' },
    { label: 'Fees', navigateTo: 'fees', icon: 'right', mainRoute: 'homestack' },
    { label: 'Summer Pakages', navigateTo: 'summerpakage', icon: 'right', mainRoute: 'homestack' },
    { label: 'Our Services', navigateTo: 'ourservices', icon: 'right', mainRoute: 'homestack' },
    { label: 'Bright Student', navigateTo: 'brightstudent', icon: 'right', mainRoute: 'homestack' },
    { label: 'Terms and conditions', navigateTo: 'termsandcondition', icon: 'right', mainRoute: 'homestack' },
    { label: 'Awarding Bodies', navigateTo: 'awardingbodies', icon: 'right', mainRoute: 'homestack' },
    { label: 'A-Level Results', navigateTo: 'Alevel', icon: 'right', mainRoute: 'homestack' },
    { label: 'GCSE Results', navigateTo: 'gcse', icon: 'right', mainRoute: 'homestack' },
    { label: 'Childcare', navigateTo: 'childcare', icon: 'right', mainRoute: 'homestack' },
    { label: 'Reviews', navigateTo: 'reviews', icon: 'right', mainRoute: 'homestack' },
    { label: 'Careers', navigateTo: 'career', icon: 'right', mainRoute: 'homestack' },
    { label: 'Apply online', navigateTo: 'applyonline', icon: 'right', mainRoute: 'homestack' },
    { label: 'Contact Us', navigateTo: 'contactus', icon: 'right', mainRoute: 'homestack' },
    { label: 'Login', navigateTo: 'login', icon: 'right', mainRoute: 'homestack' },
];


// Individual item in the drawer menu
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

// Custom drawer content component
function CustomDrawerContent(props) {
    const [open, setOpen] = useState(false)// State for modal visibility
    const dipatch = useDispatch()// Redux dispatch function
    const user = useSelector(state => state?.user?.data)// User data from Redux store
    const globaldata = useSelector(state => state?.global?.data)// Global data from Redux store
    const src = user?.picture ? { uri: getImage(user?.picture) } : require("../../images/profileAvatar.png");// Profile image source
    // Function to handle logout
    const logoutHandler = async () => {
        const token = await AsyncStorage.getItem('fcmToken')// Get FCM token from AsyncStorage
        const fcmToken = globaldata?.currentUser?.fcmToken // Current user's FCM token
        const sendTokens = fcmToken?.filter(item => item !== token)// Remove current token from list

        const uptObj = {
            ...globaldata?.currentUser,
            fcmToken: sendTokens
        }
        // Update user's FCM token
        API.updateUser(uptObj)
            .then(async (res) => {
                await AsyncStorage.removeItem('fcmToken'); // Remove FCM token from AsyncStorage
                dipatch(handleLogout())// Dispatch action to logout user
                dipatch(handleResetData())// Dispatch action to reset global data
            }).catch(err => console.log(err))
        setOpen(!open)// Toggle modal visibility
    }

    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <TouchableOpacity activeOpacity={0.8}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                            {/* <Image resizeMode='contain' source={src} style={styles.image} /> */}
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.title}>{user?.email ? `${user?.firstName} ${user?.lastName}` : 'Prime Tuition'}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.drawerSection}>
                    {!!user?.email ? DrawerList.map((el, i) => {
                        if (el.label === "Testimonials") {
                            return !(globaldata?.testimonials?.some((item) => item?.userId === user?.id)) &&
                                <DrawerLayout
                                    key={i}
                                    label={el.label}
                                    navigateTo={el.navigateTo}
                                    icon={el.icon}
                                    setOpen={setOpen}
                                    mainRoute={el.mainRoute}
                                    {...props}
                                />

                        } else {
                            return (<DrawerLayout
                                key={i}
                                label={el.label}
                                navigateTo={el.navigateTo}
                                icon={el.icon}
                                setOpen={setOpen}
                                mainRoute={el.mainRoute}
                                {...props}
                            />)

                        }
                    }) :
                        DrawerList2.map((el, i) => {
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
                                    logoutHandler()
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
    // Retrieve navigation object
    const navigation = useNavigation();
    // Get user and global data from Redux store
    const user = useSelector(state => state?.user?.data)
    const global = useSelector(state => state?.global?.data)
    const dispatch = useDispatch()
    // Execute effect when the component mounts or 'old' dependency changes
    useEffect(() => {
        // Dispatch a navigation action to reset the navigation state
        user?.email && navigation.dispatch(
            // Set the index to 0 and navigate to the specified route
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'root', params: { screen: 'home' } }],
            }),
        );
    }, [old]);// Depend on 'old' variable for re-execution when it changes

    const setToken = async () => {
        try {
            const token = await messaging().getToken();
            console.log(token)
            const FCMtoken = await AsyncStorage.getItem('fcmToken');
            const mbleToken = global?.currentUser?.fcmToken
            if (FCMtoken) {
                console.log('Token already saved to database ..')
            } else {
                let getTokens;
                if (mbleToken?.length > 0) {
                    getTokens = [...mbleToken, token];
                } else {
                    getTokens = [token ? token : '']
                }
                const uptObj = {
                    id: user?.id,
                    fcmToken: getTokens
                }

                user?.email && API.updateUser(uptObj)
                    .then(async (res) => {
                        await AsyncStorage.setItem('fcmToken', token);
                        dispatch(globalData(user?.id))
                    }).catch(err => console.log("err>>>>", err))
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setToken()
    }, [global?.currentUser])

    useEffect(() => {
        if (user?.email) {
            dispatch(globalData(user?.id))
        }
    }, [user])

    return (

        <Drawer.Navigator
            initialRouteName='root'
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false, // Hide header for all screens
                drawerStyle: {
                    backgroundColor: Color.primary,
                    width: '100%',
                },
                swipeEnabled: (!!global.students && !!user.email)
            }}

        >

            {user?.email && <>
                <Drawer.Screen name="tabs" component={TabNavigation} />
                <Drawer.Screen name="root" component={MyStack} />
            </>}
            <Drawer.Screen name="homestack" component={HomeStack} />

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