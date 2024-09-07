import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import FilterIcon from "react-native-vector-icons/FontAwesome"
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons"
import { useDispatch, useSelector } from 'react-redux'
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
    { name: 'Leave Date', value: formattedDate(item?.applicationDate, 'dd/MM/yyyy') },
    { name: 'Reason', value: item?.reason },
    { name: 'Date Created', value: `${formattedDate(item?.createdAt, 'dd/MM/yyyy')}\n${formattedDate(item?.createdAt, 'hh:mm:ss a')}` },
]

const ViewApplication = () => {

    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()
    // its function to filter data according to  date
    const filterByDate = (startDate, endDate) => {
        let filterData;
        if (!!startDate && !!endDate) {
            filterData = globaldata?.leaves?.filter(item => {
                const itemDate = new Date(item?.applicationDate);
                return itemDate >= startDate && itemDate <= endDate;
            })
        } else {
            filterData = globaldata?.leaves?.filter(item => true)
        }
        filterData.reverse()
        setData(filterData)
    };

    // its component when data not available
    const returnItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.7 }}>
            <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
            <Text style={styles.inactivetext}>No Leaves found</Text>
        </View>
    )


    // const handleRefresh = () => {
    //     setRefresh(true);
    //     dispatch(globalData(user?.id))
    //         .then(() => {
    //             filterByDate()
    //             setRefresh(false);
    //         })
    //         .catch(() => {
    //             filterByDate()
    //             setRefresh(false);
    //         });
    // };


    // its for changing data from api to desired 
    const statusBackround = {
        processed: 'Accepted',
        unprocessed: 'Rejected',
        pending: 'pending'
    }


    useEffect(() => {
        filterByDate()
    }, [globaldata?.leaves])

    return (
        data.length < 0 ?
            <>{returnItem()}</>
            :
            <ScrollView
            // refreshControl={
            //     <RefreshControl
            //         onRefresh={handleRefresh}
            //         refreshing={refresh}
            //     />
            // }
            >
                <CustomDatePicker
                    isVisible={open}
                    onToggle={() => setOpen(false)}
                    onDone={(date) => filterByDate(date?.startDate, date?.endDate)}
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
        color: Color.textThree,
        fontSize: FontSizes.lg
    }
})