import { useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Linking, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Idcard from "react-native-vector-icons/AntDesign"
import Download from 'react-native-vector-icons/Feather'
import BookIcon from "react-native-vector-icons/FontAwesome5"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, formattedDate, getImage, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'

const HomeWork = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState(false);
    const router = useRoute()
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()

    const filterHomework = globaldata?.homeworks?.filter((item, index) => {
        const studentIds = item?.studentId?.length > 0 ? item.studentId : [];
        return studentIds.length > 0 ? studentIds?.some(id => id === router?.params?.student?.id) : false;
    });

    const fetchData = () => {
        setData(filterHomework)
    }

    const handleRefresh = () => {
        setRefresh(true);
        dispatch(globalData(user?.id))
            .then(() => {
                fetchData()
                setRefresh(false);
            })
            .catch(() => {
                fetchData()
                setRefresh(false);
            });
    };

    const openLink = (url) => {
        Linking.openURL(url).catch((err) => customToast('error', 'Something went wrong!'));
    }

    useEffect(() => {
        fetchData()
    }, [globaldata?.homeworks])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refresh}
                    />
                }
            >
                <View style={{ paddingBottom: 10, backgroundColor: Color.white }}>
                    {
                        data?.length > 0 ? <>
                            <View style={[styles.viewChildrenContainer, GlobalStyles.p_10]}>
                                <Text style={[styles.NameText, styles.textFontFamily]}>{router.params?.student?.fullName}</Text>
                                <Text style={[styles.CompText, styles.textFontFamily]}>({data?.length})</Text>
                            </View>
                            <View style={{ paddingHorizontal: 10, gap: 10, marginTop: 10 }}>
                                {
                                    data?.map((elem, index) => (
                                        <View key={index} style={styles.allStudentContainer}>
                                            <View style={[styles.allStudentContainers, { paddingVertical: 10 }]}>
                                                <View style={[styles.allStudentContainers, { gap: 15 }]} >
                                                    <View style={[styles.bgIconColor]}>
                                                        <Idcard name="idcard" size={FontSizes.xl} color={Color.primary} />
                                                    </View>
                                                    <Text style={styles.nameFont}>Homework Title</Text>
                                                </View>
                                                <Text numberOfLines={1} style={[styles.nameFont, { width: 150 }]}>{elem.name}</Text>
                                            </View>
                                            <View style={[styles.allStudentContainers, { paddingVertical: 10 }]}>
                                                <View style={[styles.allStudentContainers, { gap: 15 }]} >
                                                    <View style={[styles.bgIconColor]}>
                                                        <BookIcon name="book" size={FontSizes.xl} color={Color.primary} />
                                                    </View>
                                                    <Text style={styles.nameFont}>Expiry Date</Text>
                                                </View>
                                                <Text style={styles.nameFont}>{elem.expiryDate ? formattedDate(elem.expiryDate, 'dd-MM-yyyy') : ''}</Text>
                                            </View>
                                            <View style={styles.btnStyle}>
                                                {elem.fileType === "link" ?
                                                    <CustomButton
                                                        onPress={() => openLink(elem?.link)}
                                                        title="Open Link"
                                                        variant='fill'
                                                        rightIcon={<Download name='link' size={FontSizes.lg} color={Color.white} />}
                                                    />
                                                    :
                                                    <CustomButton
                                                        onPress={() => openLink(getImage(elem?.filename))}
                                                        title="Download"
                                                        rightIcon={<Download name='download' size={FontSizes.lg} color={Color.white} />}
                                                        variant='fill'
                                                    />
                                                }
                                            </View>
                                        </View>
                                    ))
                                }
                            </View>

                        </> : <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                            <View>
                                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                                <Text style={styles.inactivetext}>No Homework</Text>
                            </View>
                        </View>
                    }

                </View>
            </ScrollView >
        </SafeAreaView>
    )
}

export default HomeWork

const styles = StyleSheet.create({

    viewChildrenContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: Color.grayBackground
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.text,
    },
    allStudentContainer: {
        padding: 15,
        paddingVertical: 15,
        elevation: 3,  // off set dena hai yahan 
        borderRadius: 10,
        borderColor: "black",
        backgroundColor: Color.grayBackground,
        // marginTop: 10,
    },
    allStudentContainers: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    nameFont: {
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.lg,
        color: Color.text,
    },
    yearFont: {
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.md,
        color: Color.textThree
    },
    btnStyle: {
        paddingTop: 15,

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
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    }


})