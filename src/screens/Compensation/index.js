import React, { useCallback, useEffect, useState } from 'react'
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import CustomAppBar from '../../components/base/CustomAppBar'
import CustomButton from '../../components/base/CustomButton'
import MissedLesson from '../../components/widget/MissedLesson'
import ViewCompensation from '../../components/widget/ViewCompensation'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, screenDimensions } from '../../utils/functions'

const Compensation = () => {
    const [active, setActive] = useState(true)
    const globalData = useSelector(state => state?.global?.data)
    const [rows, setRows] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    // Function to fetch all compensation data
    const getALLCompensation = async () => {
        const studentIds = globalData?.students?.map(elem => elem?.id)  // Extracting student IDs from global data
        await API.compensationByParent(JSON.stringify(studentIds)).then(res => {// API call to fetch compensation data
            const data = res?.data// Extracting data from response
            setRows(data); // Updating rows state with fetched data
        })
            .catch(err => customToast("error", err?.message))// Handling error with toast message
            .finally(() => setRefreshing(false)); // Resetting refreshing state
    }
    // Callback function for handling refresh action
    const onRefresh = useCallback(() => {
        setRefreshing(true);// Setting refreshing state to true
        getALLCompensation(); // Fetching compensation data
    }, []);

    // Effect hook to fetch compensation data on component mount and whenever globalData.students changes
    useEffect(() => {
        getALLCompensation()
    }, [globalData?.students])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
                <View>
                    <CustomAppBar title='Compensation' />
                    <View style={[styles.main]}>
                        <View style={[styles.tabBtn]}>
                            <CustomButton
                                title='Missed Lesson'
                                btnstyle={styles.btnStyle}
                                variant={active ? 'fill' : ''}
                                onPress={() => {
                                    setActive(prev => !prev)
                                }}
                            />
                            <CustomButton
                                btnstyle={styles.btnStyle}
                                title='Compensation Status'
                                variant={active ? '' : 'fill'}
                                onPress={() => {
                                    setActive(prev => !prev)
                                }}
                            />
                        </View>
                        <View >
                            {active ? <MissedLesson /> : <ViewCompensation rows={rows} />}
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Compensation


const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.white,
    },
    tabBtn: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        width: screenDimensions.width * 0.47,
    },

    textHeading: {
        color: Color.text,
        fontFamily: FontFamily.interBold,
        fontSize: FontSizes.xl
    },
    para: {
        color: Color.textThree,
        fontSize: FontSizes.md,
        fontFamily: FontFamily.interRegular
    },
    absoluteBtnView: {
        position: 'absolute',
        bottom: screenDimensions.height * 0.01,
        left: 0,
        right: 0,
        zIndex: 10,
        width: screenDimensions.width,
        alignItems: 'center'
    },
    absoluteBtn: {
        width: '90%',
    },

})