import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from "react-native-vector-icons/FontAwesome"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { formattedDate, screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import Table from '../../base/Table'


const list = (item) => [
    { name: 'Main ID', value: item?.Student?.mainId },
    { name: 'Student', value: item?.Student?.fullName },
    { name: 'Lecture', value: item?.Schedule?.Subject?.name },
    { name: 'Lecture Time', value: item?.Schedule?.LessonTiming?.time },
    { name: 'Lecture Day', value: formattedDate(item?.applicationDate, 'EEEE') },
    { name: 'Leave Date', value: formattedDate(item?.applicationDate, 'dd-MMM-yyyy') },
    { name: 'Reason', value: item?.reason },
    { name: 'Date Created', value: formattedDate(item?.createdAt, 'dd-MMM-yyyy hh:mm:ss a') },
]

const ViewApplication = () => {

    const globalData = useSelector(state => state?.global?.data)



    return (
        globalData?.leaves?.length === 0 ? <View>
            <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
            <Text style={styles.inactivetext}>No Leaves found</Text>
        </View> :
            <ScrollView>

                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}>View Leaves</Text>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                        <View style={[styles.iconView]}>
                            <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                        </View>
                        <Text style={[{ color: Color.text }, styles.textFontFamily]}>Select Date</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {globalData?.leaves?.map((elem, index) => (
                        <Table key={index} status={elem.status} list={list(elem)} />
                    ))}
                </View>
            </ScrollView>
    )
}

export default ViewApplication

const styles = StyleSheet.create({
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    },
    iconView: {
        backgroundColor: Color.primary,
        padding: 5,
        borderRadius: 4
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }
})