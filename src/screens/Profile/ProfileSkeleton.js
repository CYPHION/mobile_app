import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome5';
import MailIcon from 'react-native-vector-icons/Ionicons';
import InputField from '../../components/base/InputField';
import LoadingScreen from '../../components/base/LoadingScreen';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)




const ProfileSkeleton = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        number: ''
    })


    return (
        <>
            <LoadingScreen loading={loading} />
            <ScrollView>
                <View style={{ backgroundColor: Color.white, overflow: 'scroll' }}>
                    <View style={[styles.mainContainer]}>
                        <Image style={[styles.profileImage]} />
                        <View>
                            <ShimmerPlaceholder style={[styles.text, { color: Color.text, fontSize: FontSizes.xl }]} />
                            <ShimmerPlaceholder style={[styles.text, { color: Color.textThree, fontSize: FontSizes.md }]} />
                        </View>
                    </View>
                    <View >
                        <View style={[styles.row]}>
                            <View style={[styles.sideView]}>
                                <View style={styles.bgIconColor}>
                                    <FontAwsomeIcon name="user-alt" size={FontSizes.xl} color={Color.text} />
                                </View>
                            </View>
                            <View style={[styles.middelView]}>
                                <InputField
                                    label={"User Name"}
                                    labelStyle={{ paddingHorizontal: 15 }}
                                    inputStyle={{
                                        borderWidth: 0
                                    }}
                                    editable={false}

                                />
                            </View>
                            <View style={[styles.sideView]}>
                                {/* <TouchableOpacity onPress={() => handleUpdate('username')} activeOpacity={0.7} >
                                    <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>


                        <View style={[styles.row]}>
                            <View style={[styles.sideView]}>
                                <View style={styles.bgIconColor}>
                                    <MailIcon name="mail" size={FontSizes.xl} color={Color.text} />
                                </View>
                            </View>
                            <View style={[styles.middelView]}>
                                <InputField
                                    label={"Email"}
                                    labelStyle={{ paddingHorizontal: 15 }}
                                    inputStyle={{
                                        borderWidth: 0
                                    }}
                                    editable={false}
                                // inputMode={"numeric"} // by default type is text

                                // onChangeText={(text) => onChangeHandler('text', text)}
                                />
                            </View>
                            <View style={[styles.sideView]}>
                                {/* <TouchableOpacity onPress={() => handleUpdate('email')} activeOpacity={0.7} >
                                    <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                                </TouchableOpacity> */}
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
                                    <Text style={[styles.textTwo, { color: Color.textThree, padding: 10 }]}>
                                        Tap to change password
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.sideView]}>
                                {/* <TouchableOpacity onPress={()=> handleUpdate('')} activeOpacity={0.7} >
                                    <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                                </TouchableOpacity> */}
                            </View>
                        </View>


                        <View style={[styles.row]}>
                            <View style={[styles.sideView]}>
                                <View style={styles.bgIconColor}>
                                    <FontAwsomeIcon name="mobile-alt" size={FontSizes.xl} color={Color.text} />
                                </View>
                            </View>
                            <View style={[styles.middelView]}>
                                <ShimmerPlaceholder
                                    label={"Phone Number"}
                                    labelStyle={{ paddingHorizontal: 15 }}
                                    inputStyle={{
                                        borderWidth: 0
                                    }}
                                    editable={false}

                                />
                            </View>
                            <View style={[styles.sideView]}>

                            </View>
                        </View>


                    </View>
                    <View style={{ alignItems: 'center', marginTop: 10 }}>
                        <ShimmerPlaceholder

                            btnstyle={{ width: screenDimensions.width * 0.85 }}
                        />
                    </View>
                </View>

            </ScrollView >
        </>
    )
}

export default ProfileSkeleton

const styles = StyleSheet.create({
    mainContainer: {
        width: screenDimensions.width,
        height: screenDimensions.height * 0.3,
        gap: 15,
        alignItems: 'center',
        justifyContent: 'flex-end'
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