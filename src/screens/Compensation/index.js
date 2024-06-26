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
import { screenDimensions } from '../../utils/functions'

const Compensation = () => {
    const [active, setActive] = useState(true)
    const globalData = useSelector(state => state?.global?.data)
    const [rows, setRows] = useState([])
    const [refreshing, setRefreshing] = useState(false);


    const getALLCompensation = async () => {
        const studentIds = globalData?.students?.map(elem => elem?.id)
        await API.compensationByParent(JSON.stringify(studentIds)).then(res => {
            const data = res?.data
            setRows(data)
        }).catch(err => customToast("error", err?.message)).finally(() => setRefreshing(false))
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getALLCompensation()
    }, []);

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