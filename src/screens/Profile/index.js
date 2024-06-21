import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome5';
import MailIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/base/CustomButton';
import MyModal from '../../components/base/Modal';
import { API } from '../../network/API';
import { handleResetData } from '../../store/slice/global';
import { handleLogout } from '../../store/slice/user';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { getImage, screenDimensions } from '../../utils/functions';
import ProfileSkeleton from './ProfileSkeleton';


const Profile = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        number: ''
    })
    const dipatch = useDispatch()
    const user = useSelector(state => state.user.data)
    const globaldata = useSelector(state => state?.global?.data)
    const src = user?.dp ? { uri: getImage(user?.dp) } : require("../../images/profile.png");

    const logoutHandler = async () => {
        const token = await AsyncStorage.getItem('fcmToken') // Retrieve FCM token from AsyncStorage
        const fcmToken = globaldata?.currentUser?.fcmToken // Access FCM token from global data
        const sendTokens = fcmToken?.filter(item => item !== token) // Filter out the current FCM token from the list of tokens

        const uptObj = { // Define update object with modified FCM tokens
            ...globaldata?.currentUser,
            fcmToken: sendTokens
        }
        // Call API to update user data (e.g., remove FCM token)
        API.updateUser(uptObj)
            .then(async (res) => {
                await AsyncStorage.removeItem('fcmToken');
                dipatch(handleLogout())
                dipatch(handleResetData())
            }).catch(err => console.log(err))
        setOpen(!open)  // Toggle the open state of the modal or dropdown
    }



    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>

                {
                    (!!globaldata?.students && !!user?.email) ?
                        <ScrollView>

                            <View style={{ backgroundColor: Color.white, overflow: 'scroll' }}>
                                <View style={[styles.mainContainer]}>
                                    {/* <Image resizeMode='contain' source={src} style={[styles.profileImage]} /> */}
                                    <View>
                                        <Text style={[styles.text, { color: Color.text, fontSize: FontSizes.xl }]}>{user?.firstName} {user?.lastName}</Text>
                                        <Text style={[styles.text, { color: Color.primary, fontSize: FontSizes.md }]}>{user?.email}</Text>
                                    </View>
                                </View>
                                <View >


                                    <View style={[styles.row]}>
                                        <View style={[styles.sideView]}>
                                            <View style={styles.bgIconColor}>
                                                <FontAwsomeIcon name="user-alt" size={FontSizes.xl} color={Color.text} />
                                            </View>
                                        </View>
                                        <View style={[styles.middelView, { paddingHorizontal: 10 }]}>
                                            <Text style={[styles.textTwo, { paddingHorizontal: 10 }]}>User Name</Text>

                                            <Text style={[styles.textTwo, { color: Color.primary, padding: 10 }]}>
                                                {user.firstName}
                                            </Text>
                                        </View>
                                    </View>


                                    <View style={[styles.row]}>
                                        <View style={[styles.sideView]}>
                                            <View style={styles.bgIconColor}>
                                                <MailIcon name="mail" size={FontSizes.xl} color={Color.text} />
                                            </View>
                                        </View>
                                        <View style={[styles.middelView, { paddingHorizontal: 10 }]}>
                                            <Text style={[styles.textTwo, { paddingHorizontal: 10 }]}>Email</Text>

                                            <Text style={[styles.textTwo, { color: Color.primary, padding: 10 }]}>
                                                {user?.email}
                                            </Text>
                                        </View>
                                    </View>



                                    <View style={[styles.row]}>
                                        <View style={[styles.sideView]}>
                                            <View style={styles.bgIconColor}>
                                                <FontAwsomeIcon name="lock" size={FontSizes.xl} color={Color.text} />
                                            </View>
                                        </View>
                                        <View style={[styles.middelView, { paddingHorizontal: 10 }]}>
                                            <Text style={[styles.textTwo, { paddingHorizontal: 10 }]}>Password</Text>
                                            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('profiles', { screen: 'changePassword' })}>
                                                <Text style={[styles.textTwo, { color: Color.primary, padding: 10 }]}>
                                                    Tap to change password
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View style={[styles.row]}>
                                        <View style={[styles.sideView]}>
                                            <View style={styles.bgIconColor}>
                                                <FontAwsomeIcon name="mobile-alt" size={FontSizes.xl} color={Color.text} />
                                            </View>
                                        </View>
                                        <View style={[styles.middelView, { paddingHorizontal: 10 }]}>
                                            <Text style={[styles.textTwo, { paddingHorizontal: 10 }]}>Phone Number</Text>
                                            <Text style={[styles.textTwo, { color: Color.primary, padding: 10 }]}>
                                                {user?.mobileNo}
                                            </Text>
                                        </View>
                                    </View>

                                </View>
                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <CustomButton
                                        onPress={() => setOpen(true)}
                                        title="Logout"
                                        variant='fill'
                                        btnstyle={{ width: screenDimensions.width * 0.85 }}
                                    />
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
                        </ScrollView> : <ProfileSkeleton />
                }

            </SafeAreaView>
        </>
    )
}


export default Profile

const styles = StyleSheet.create({
    mainContainer: {
        width: screenDimensions.width,
        paddingVertical: 60,
        gap: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileImage: {
        width: screenDimensions.width * 0.25,
        height: screenDimensions.width * 0.25,
        borderRadius: screenDimensions.width * (0.25 * 0.5)
    },
    text: {
        fontFamily: FontFamily.interRegular,
        textAlign: 'center',
        color: Color.textThree
    },
    bgIconColor: {
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Color.white,
        borderRadius: 8,
        padding: 6,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1, // Set a lower opacity for a subtle shadow
        shadowRadius: 2, // Set a lower radius for a less spread shadow
    },
    row: {
        width: screenDimensions.width,
        padding: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    textTwo: {
        fontSize: FontSizes.md,
        color: Color.text
    },
    sideView: {
        width: '10%',
    },
    middelView: {
        width: '75%'
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
})