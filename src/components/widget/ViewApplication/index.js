import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from "react-native-vector-icons/FontAwesome"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import { useSelector } from 'react-redux'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { formattedDate, screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import CustomDatePicker from '../../base/CustomDatePicker'
import Table from '../../base/Table'


const list = (item) => [
    { name: 'Main ID', value: item?.Student?.mainId },
    { name: 'Student', value: item?.Student?.fullName },
    { name: 'Lecture', value: item?.Schedule?.Subject?.name },
    { name: 'Lecture Time', value: item?.Schedule?.LessonTiming?.time },
    { name: 'Lecture Day', value: formattedDate(item?.applicationDate, 'EEEE') },
    { name: 'Leave Date', value: formattedDate(item?.applicationDate, 'dd-MMM-yyyy') },
    { name: 'Reason', value: item?.reason },
    { name: 'Date Created', value: `${formattedDate(item?.createdAt, 'dd-MMM-yyyy')}\n${formattedDate(item?.createdAt, 'hh:mm:ss a')}` },
]

const ViewApplication = () => {

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])

    const currentDate = new Date();
    const startOfMonth = new Date(currentDate);
    startOfMonth.setMonth(currentDate.getMonth() - 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endDate = new Date(currentDate);
    endDate.setHours(23, 59, 59, 999);

    const [date, setDate] = useState({
        startDate: startOfMonth,
        endDate: endDate,
    });
    const globalData = useSelector(state => state?.global?.data)

    const filterByDate = (data, startDate, endDate) => {
        return data?.filter(item => {
            const itemDate = new Date(item?.applicationDate);
            return itemDate >= startDate && itemDate <= endDate;
        });
    };


    const returnItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.7 }}>
            <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
            <Text style={styles.inactivetext}>No Leaves found</Text>
        </View>
    )


    const handleRefresh = () => {
        setRefresh(true);

        const refreshedStartDate = new Date();
        refreshedStartDate.setMonth(refreshedStartDate.getMonth() - 1);
        refreshedStartDate.setHours(0, 0, 0, 0);

        const refreshedEndDate = new Date();
        refreshedEndDate.setHours(23, 59, 59, 999);

        setDate({
            startDate: refreshedStartDate,
            endDate: refreshedEndDate,
        });

        setRefresh(false);
        // Add additional logic or fetch data as needed
        // ...
    };

    const statusBackround = {
        processed: 'Accepted',
        unprocessed: 'Rejected',
        pending: 'pending'
    }


    useEffect(() => {
        setData(filterByDate(globalData?.leaves, date.startDate, date.endDate))
    }, [date])

    return (
        globalData?.leaves?.length < 0 ?
            <>{returnItem()}</>
            :
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refresh}
                    />
                }
            >
                <CustomDatePicker
                    isVisible={open}
                    onToggle={() => setOpen(false)}
                    onDone={(date) => setDate(date)}
                />
                <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}>View Leaves</Text>
                    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                        <View style={[styles.iconView]}>
                            <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                        </View>
                        <Text style={[{ color: Color.text }, styles.textFontFamily]}>Select Date</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {data.length > 0 ? data?.map((elem, index) => (
                        <Table key={index} status={statusBackround[elem.status]} list={list(elem)} />
                    )) : <>{returnItem()}</>}
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