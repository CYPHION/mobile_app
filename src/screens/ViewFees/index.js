import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Download from 'react-native-vector-icons/Feather';
import { default as NoHomework } from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import AccordionItem from '../../components/base/Accordion';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { formattedDate, getImage, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';
import ReceiptSkelton from '../Receipt/ReceiptSkeleton';




const ViewFess = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState([])
    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()
    const router = useRoute()
    const ineerList = (item) => [
        { name: "Previous Dues", value: `£${item?.totalDues}` },
        { name: "Book dues", value: `£${item?.bookDues}` },
        { name: "Paid Amount", value: `£${item?.amountPaid}` },
    ]


    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };


    const handleDownload = (fileName) => {
        const url = getImage(fileName); // Replace with your download URL
        console.log(url)

    };




    const renderItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <View>
                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                <Text style={styles.inactivetext}>No Record found</Text>
            </View>
        </View>
    )

    // const onRefresh = useCallback(() => {
    //     setRefreshing(true)
    //     // setTimeout(() => {
    //     dispatch(globalData())
    //     setRefreshing(false)
    //     // }, 100);
    // }, [])



    useEffect(() => {
        const filter = globaldata?.fees?.filter((item) => item.studentId === router?.params?.student?.id)
        setData(filter)
    }, [globaldata?.fees])

    return (
        <ScrollView
        // refreshControl={<RefreshControl
        //     onRefresh={onRefresh}
        //     refreshing={refreshing}
        // />}
        >
            {(!!user.email && !!globaldata?.fees) ?
                <View style={styles.feesContainers}>
                    {data?.length > 0 ?
                        <>
                            {data.map((item, index) => (
                                <AccordionItem
                                    children={ineerList(item).map((elem, index) => (
                                        <View key={index} style={GlobalStyles.contentView}>
                                            <Text style={[GlobalStyles.contentItem]}>{elem.name}</Text>
                                            <Text style={[GlobalStyles.contentItem]}>{elem.value}</Text>
                                        </View>
                                    ))}
                                    key={index}
                                    date={`${item.payType} (${item.payBy})`}
                                    studentName={formattedDate(item?.createdAt, 'dd-MMM-yyyy')}
                                    total={
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[styles.accordionTitleHeading]}>£{item.amountPaid} </Text>
                                            <Download name='download' onPress={() => handleDownload(item?.invoice?.document)} size={FontSizes.xxl} color={Color.text} />
                                        </View>
                                    }
                                    expanded={activeItem === index}
                                    onToggle={() => {
                                        toggleItem(index)
                                    }} // Pass toggle function to each item
                                />
                            ))}
                        </> :
                        <>
                            {renderItem()}
                        </>
                    }
                </View> : <ReceiptSkelton />}
        </ScrollView>
    )
}

export default ViewFess

const styles = StyleSheet.create({

    feesReceiptContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feesContainers: {
        padding: 10
    },
    fessYears: {
        color: Color.primary,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    },
    accordionTitleHeading: {
        color: Color.textThree,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.xxl,
    },
})