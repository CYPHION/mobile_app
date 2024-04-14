import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon, { default as NoHomework } from 'react-native-vector-icons/MaterialCommunityIcons'
import { useDispatch, useSelector } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import { globalData } from '../../store/thunk'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'

const Testimonials = () => {
    // Importing necessary hooks and functions
    const [refresh, setRefresh] = useState(false); // State for refreshing
    const [data, setData] = useState([]); // State for storing testimonials data
    const navigation = useNavigation(); // Navigation hook from React Navigation
    const user = useSelector(state => state?.user?.data); // Selecting user data from Redux store
    const global = useSelector(state => state?.global?.data); // Selecting global data from Redux store
    const dispatch = useDispatch(); // Dispatch function for Redux actions

    // Function to fetch testimonials data
    const fetchData = () => {
        setData(global?.testimonials); // Setting testimonials data from global state
    };

    // Function to handle refresh
    const handleRefresh = () => {
        setRefresh(true); // Setting refresh state to true
        dispatch(globalData(user?.id)) // Dispatching action to fetch global data
            .then(() => {
                fetchData(); // Fetching testimonials data
                setRefresh(false); // Resetting refresh state to false
            })
            .catch(() => {
                fetchData(); // Fetching testimonials data
                setRefresh(false); // Resetting refresh state to false
            });
    };

    // useEffect to fetch data initially and whenever testimonials data changes
    useEffect(() => {
        fetchData(); // Fetching testimonials data initially
    }, [global?.testimonials]); // Dependency array to run effect when testimonials data changes




    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                {!(data?.some((item) => item?.userId === user?.id)) && <View style={styles.absView}>
                    <CustomButton
                        title='Write A Review'
                        variant='fill'
                        btnstyle={styles.btnStyle}
                        leftIcon={<Icon name='pencil' color={Color.white} size={FontSizes.md} />}
                        onPress={() => navigation.navigate('root', { screen: 'addTestimonial' })}
                    />
                </View>}
                <View style={[styles.main]}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                onRefresh={handleRefresh}
                                refreshing={refresh}
                            />
                        }
                    >
                        {data?.length > 0 ?
                            <View style={{ zIndex: 1 }}>
                                <View style={[{ marginBottom: 7 }, GlobalStyles.headerStyles]}>
                                    <Text style={GlobalStyles.headerTextStyle}>Available Reviews</Text>
                                </View>
                                <View style={[GlobalStyles.p_10, { gap: 15 }]}>
                                    {data.map((elem, index) => (
                                        <View key={index} style={[styles.card, GlobalStyles.p_10]}>
                                            <Text style={[styles.nameText]}>{elem?.User?.firstName} {elem?.User?.lastName}</Text>
                                            <View style={{ flexDirection: 'row', gap: 6 }}>
                                                <Text style={styles.textTwo}>({elem?.User?.type && elem.User.type[0].toUpperCase() + elem.User.type.slice(1)})</Text>
                                                <Text style={styles.dateText}>{formattedDate(elem.createdAt, 'MMM dd,yyyy')}</Text>
                                            </View>
                                            <Text style={styles.para}>{elem.review}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                                <View>
                                    <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTThree} />
                                    <Text style={styles.inactivetext}>No Reviews found</Text>
                                </View>
                            </View>}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Testimonials

const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.white,
    },
    card: {
        backgroundColor: Color.grayBackground,
        borderRadius: 10,
    },
    nameText: {
        color: Color.primary,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.lg
    },
    textTwo: {
        fontSize: FontSizes.md,
        color: Color.primary,
        fontFamily: FontFamily.interMedium
    },
    dateText: {
        fontFamily: FontFamily.interRegular,
        color: Color.textThree,
        fontSize: FontSizes.md,
    },
    para: {
        fontFamily: FontFamily.interRegular,
        color: Color.textThree,
        fontSize: FontSizes.md,
        paddingVertical: 10
    },
    absView: {
        position: 'absolute',
        right: 10,
        bottom: screenDimensions.height * 0.01,
        zIndex: 2,
    },
    btnStyle: {
        width: 'auto',
        padding: 5,
        paddingHorizontal: 10,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTThree,
        fontSize: FontSizes.lg
    }
})