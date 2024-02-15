import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwsomeIcon from 'react-native-vector-icons/FontAwesome5';
import MailIcon from 'react-native-vector-icons/Ionicons';
import CustomButton from '../../components/base/CustomButton';
import InputField from '../../components/base/InputField';
import MyModal from '../../components/base/Modal';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';



const Profile = ({ navigation }) => {
    const [open, setOpen] = useState(false)
    return (
        <ScrollView>
            <View style={{ backgroundColor: Color.white, overflow: 'scroll' }}>
                <View style={[styles.mainContainer]}>
                    <View>
                        <Image resizeMode='contain' source={require('../../images/user.jpg')} style={[styles.profileImage]} />
                    </View>
                    <View>

                        <Text style={[styles.text, { color: Color.text, fontSize: FontSizes.xl }]}>Hamza Khan</Text>
                        <Text style={[styles.text, { color: Color.textThree, fontSize: FontSizes.md }]}>@hamzakhan123</Text>
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
                                inputStyle={{
                                    borderWidth: 0
                                }}
                                editable={false}
                                // inputMode={"numeric"} // by default type is text
                                value={'Hamza'}
                            // onChangeText={(text) => onChangeHandler('text', text)}
                            />
                        </View>
                        <View style={[styles.sideView]}>
                            <TouchableOpacity activeOpacity={0.7} >
                                <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                            </TouchableOpacity>
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
                                inputStyle={{
                                    borderWidth: 0
                                }}
                                editable={false}
                                // inputMode={"numeric"} // by default type is text
                                value={'Hamza@gmail.com'}
                            // onChangeText={(text) => onChangeHandler('text', text)}
                            />
                        </View>
                        <View style={[styles.sideView]}>
                            <TouchableOpacity activeOpacity={0.7} >
                                <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <View style={[styles.sideView]}>
                            <View style={styles.bgIconColor}>
                                <FontAwsomeIcon name="lock" size={FontSizes.xl} color={Color.text} />
                            </View>
                        </View>
                        <View style={[styles.middelView, { paddingHorizontal: 10 }]}>
                            <Text style={[styles.textTwo]}>Password</Text>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'changePassword' })}>
                                <Text style={[styles.textTwo, { color: Color.textThree, paddingVertical: 10 }]}>
                                    Tap to change password
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.sideView]}>
                            <TouchableOpacity activeOpacity={0.7} >
                                <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.row]}>
                        <View style={[styles.sideView]}>
                            <View style={styles.bgIconColor}>
                                <FontAwsomeIcon name="mobile-alt" size={FontSizes.xl} color={Color.text} />
                            </View>
                        </View>
                        <View style={[styles.middelView]}>
                            <InputField
                                label={"Phone Number"}
                                inputStyle={{
                                    borderWidth: 0
                                }}
                                editable={false}
                                // inputMode={"numeric"} // by default type is text
                                value={'03795869366'}
                            // onChangeText={(text) => onChangeHandler('text', text)}
                            />
                        </View>
                        <View style={[styles.sideView]}>
                            <TouchableOpacity activeOpacity={0.7} >
                                <Text style={[styles.text, styles.textTwo]}>Edit</Text>
                            </TouchableOpacity>
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
                                onPress={() => console.log('logout')}
                            />
                        </View>
                    </View>
                }
            />
        </ScrollView >
    )
}

export default Profile

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
        textAlign: 'center'
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