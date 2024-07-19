import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigationState } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MenuIcon from 'react-native-vector-icons/Entypo';
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/base/CustomButton';
import DropdownComponent from '../../components/base/CustomDropDown';
import MyModal from '../../components/base/Modal';
import BookCompensation from '../../images/BookCompensation.svg';
import Logout from '../../images/Logout.svg';
import Notifications from '../../images/Notifications.svg';
import PayFee from '../../images/PayFee.svg';
import ProgressReport from '../../images/ProgressReport.svg';
import ReportLeave from '../../images/ReportLeave.svg';
import Schedule from '../../images/Schedule.svg';
import Testimonials from '../../images/Testimonials.svg';
import ViewAttendance from '../../images/ViewAttendance.svg';
import { API } from '../../network/API';
import { handleResetData } from '../../store/slice/global';
import { handleLogout } from '../../store/slice/user';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { bgColor, getImage, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';
import HomeSkeleton from './HomeSkeleton';


const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]


const Home = ({ navigation }) => {
    // State variables
    const [studentId, setstudentId] = useState('')// State for student ID
    const [tab, setTab] = useState({})// State for selected tab
    const [openSelection, setOpenSelection] = useState(false) // State for selecte student for navigation
    const [open, setOpen] = useState(false)// State for modal visibility
    const [refreshing, setRefreshing] = useState(false)// State for refreshing data
    const globaldata = useSelector(state => state?.global?.data) // Global data from Redux store
    const user = useSelector(state => state?.user?.data) // User data from Redux store
    const dispatch = useDispatch() // Redux dispatch function
    // Card data
    const cards = [
        { title: 'Progress Report', icon: <ProgressReport width={30} height={30} />, screen: 'studentReport', path: 'children' },
        { title: 'View Schedule', icon: <Schedule width={30} height={30} />, screen: 'studentSchedule', path: 'children' },
        { title: 'View Attendance', icon: <ViewAttendance width={30} height={30} />, screen: 'studentAttendance', path: 'children' },
        { title: 'Pay Fee', icon: <PayFee width={30} height={30} />, screen: 'fee', path: 'root' },
        { title: 'Book Compensation', icon: <BookCompensation width={30} height={30} />, screen: 'compensation', path: 'root' },
        { title: 'Report an Absence', icon: <ReportLeave width={30} height={30} />, screen: 'leaveApplication', path: 'root' },
        { title: 'Notifications', icon: <Notifications width={30} height={30} />, screen: 'notifications', path: 'root' },
        { title: 'View Appointments', icon: <Testimonials width={30} height={30} />, screen: 'viewAppointment', path: 'root' },
        { title: 'Logout', icon: <Logout width={30} height={30} />, screen: '', path: 'logout' },

    ]

    // Function to toggle the drawer navigation
    const toggleDrawer = () => {
        navigation.toggleDrawer();
    }
    // Function to handle logout
    const logOutHandler = async () => {
        const token = await AsyncStorage.getItem('fcmToken')// Retrieve FCM token from AsyncStorage
        const fcmToken = globaldata?.currentUser?.fcmToken // Filter out the current FCM token from the global data
        const sendTokens = fcmToken?.filter(item => item !== token)
        // Update the user data with the new FCM token list
        const uptObj = {
            ...globaldata?.currentUser,
            fcmToken: sendTokens
        }
        API.updateUser(uptObj) // Call the API to update the user data
            .then(async (res) => {
                await AsyncStorage.removeItem('fcmToken');  // Remove FCM token from AsyncStorage
                // Dispatch actions to handle logout and reset data
                dispatch(handleLogout())
                dispatch(handleResetData())
            }).catch(err => console.log(err))
        setOpen(!open)// Toggle the modal visibility
    }
    // Function to handle card press events
    const handleCardPress = (elem) => {
        if (elem.path === 'logout') {
            setOpen(true);// Open the logout confirmation modal
        } else if (elem.path === 'children') {
            setOpenSelection(prev => !prev)// Toggle the children selection modal
            setTab(elem)// Set the selected tab
        } else {
            if (elem.screen === 'fee') {
                // Navigate to the appropriate screen based on the card data
                navigation.navigate(elem.screen);
            } else {
                navigation.navigate('root', { screen: elem.screen });
            }
        }
    };
    // Function to handle pull-to-refresh action
    const onRefresh = useCallback(() => {
        setRefreshing(true);// Set refreshing state to true
        // Dispatch action to fetch updated global data

        dispatch(globalData(user?.id))
            .then(() => {
                setRefreshing(false); // Set refreshing to false after data fetching is completed
            })
            .catch(() => {
                setRefreshing(false); // Ensure refreshing is set to false even if there's an error
            })
    }, [])

    const routeNames = useNavigationState(state => state.routeNames);
    const index = useNavigationState(state => state.index);

    const currentScreen = routeNames[index];


    const renderItem = ({ item }) => {

        // const navigation = useNavigation()
        const src = item?.picture ? { uri: getImage(item?.picture) } : require("../../images/profileAvatar.png");

        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'children', params: { screen: 'viewStudent', params: { id: item.id } } })}>
                <View style={styles.item} >
                    <View style={[styles.stBadgeContainer]}>
                        <Image resizeMode='contain' source={src} style={styles.image} />
                        <View style={[styles.stBadge, { backgroundColor: bgColor[item?.status] }]}></View>
                    </View>
                    <Text numberOfLines={2} style={[styles.nameText, { fontFamily: FontFamily.interSemiBold }]} >{item.fullName}</Text>
                    <Text style={[styles.nameText, { fontFamily: FontFamily.interRegular, fontSize: FontSizes.sm, color: Color.primary }]} >{item.StudentYear.name} - {item.feeChargedBy}</Text>
                </View >
            </TouchableOpacity >
        )
    };



    return (
        <SafeAreaView style={{ flex: 1 }}>
            {(!!globaldata?.students && !!user?.email) ? <ScrollView
                refreshControl={<RefreshControl
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                />}
            >
                <MyModal
                    modalVisible={openSelection}
                    setModalVisible={setOpenSelection}
                    children={
                        <View style={{ width: '100%' }}>
                            <DropdownComponent
                                dropdownStyle={{ width: '100%' }}
                                disable={false}
                                data={globaldata?.students.map(elem => ({ name: elem?.fullName, value: elem?.id }))}
                                placeHolderText={"Select Student"}
                                value={studentId}
                                setValue={setstudentId}
                            />
                            <View style={styles.btnView}>
                                <CustomButton
                                    title={'Cancel'}
                                    btnstyle={{ paddingVertical: 4, backgroundColor: "#DDD" }}
                                    onPress={() => {
                                        setOpenSelection(prev => !prev)
                                        setstudentId('')
                                        setTab({})
                                    }}
                                    textStyle={{ color: Color.text }}
                                />
                                <CustomButton
                                    title={'Done'}
                                    variant={'fill'}
                                    btnstyle={{ paddingVertical: 4 }}
                                    onPress={() => {
                                        navigation.navigate('children', {
                                            screen: tab.screen,
                                            params: { student: globaldata?.students.filter(elem => elem?.id == studentId)[0] }
                                        });
                                        setOpenSelection(prev => !prev)
                                        setstudentId('')
                                        setTab({})
                                    }}
                                />
                            </View>
                        </View>
                    }
                />
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
                                    onPress={() => logOutHandler()}
                                />
                            </View>
                        </View>
                    }
                />
                <View style={styles.profileContainer}>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => toggleDrawer()} >
                                <MenuIcon name='menu' size={FontSizes.xxxl} color={Color.black} />
                            </TouchableOpacity>
                            <View >
                                <Text ellipsizeMode="tail" numberOfLines={1} style={[styles.NameText, styles.textFontFamily, { width: screenDimensions.width * 0.7 }]}>Hi, {user.firstName} {user.lastName}</Text>
                                <Text style={[styles.CompText, styles.textFontFamily]}>Welcome to Prime Tuition</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                            <View style={styles.badge}></View>
                            <Icon name="notifications-outline" size={FontSizes.xxxl} color={Color.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <Text style={[styles.CompText]}>Enrolled Children ({globaldata?.students ? globaldata?.students?.length : 0})</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'children' })}>
                            <Text style={[styles.CompText, { color: Color.primary }]}>see all</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 3 }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={globaldata?.students}
                            horizontal
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.flatListContainer}
                        />
                    </View>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <Text style={[styles.CompText, { marginVertical: 10 }]}>More With Prime Tuition</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: screenDimensions.width, paddingBottom: 20 }}>
                        <View style={styles.cardContainer}>
                            {cards?.map((elem, index) => (
                                <TouchableOpacity onPress={() => handleCardPress(elem)} activeOpacity={0.9} key={index}>
                                    <View style={styles.card}>
                                        {elem?.icon}
                                        <Text style={styles.cardText}>{elem?.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </ScrollView> : <HomeSkeleton />}
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    stBadgeContainer: {
        marginVertical: 8,
        position: 'relative',
        width: 'auto',
        backgroundColor: 'pink',
        width: screenDimensions.width * 0.25,
        height: screenDimensions.width * 0.25,
        borderRadius: screenDimensions.width * 0.25 * 0.5,
    },
    stBadge: {
        position: "absolute",
        right: 12,
        width: 20,
        height: 20,
        borderRadius: 10
    },
    profileContainer: {
        // paddingHorizontal: 10,
        backgroundColor: Color.white
    },
    profileRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatListContainer: {
        // paddingHorizontal: 16, 
    },
    item: {
        marginHorizontal: 5,
        textAlign: 'center',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: screenDimensions.width * 0.30,
    },
    nameText: {
        fontSize: FontSizes.md,
        textAlign: 'center',
        color: Color.text
    },
    image: {
        backgroundColor: Color.disable,
        width: screenDimensions.width * 0.25,
        height: screenDimensions.width * 0.25,
        borderRadius: screenDimensions.width * 0.25 * 0.5,
        borderColor: Color.SecondaryText,
        borderWidth: 2
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.lg,
        color: Color.text,
        fontWeight: 500,
    },
    badge: {
        height: 10,
        width: 10,
        backgroundColor: Color.primary,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 2,
        zIndex: 100
    },
    cardContainer: {
        backgroundColor: Color.primaryBg,
        width: screenDimensions.width * 0.9,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'space-around',
        borderRadius: 10
    },
    card: {
        gap: 5,
        width: 110,
        height: 90,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        color: Color.text,
        fontFamily: FontFamily.regular,
        fontSize: 10,
        textAlign: 'center',
    },
    text: {
        fontFamily: FontFamily.interRegular,
        textAlign: 'center',
        color: Color.text
    },
    btnView: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
})