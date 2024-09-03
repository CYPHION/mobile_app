import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../../components/base/CustomDatePicker';
import GridTable from '../../components/base/GridTable';
import LoadingScreen from '../../components/base/LoadingScreen';
import TopbarWithGraph from '../../components/widget/TopbarWithGraph';
import { API } from '../../network/API';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { customToast, formattedDate, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';


const nestedArray = (row) => [
    {
        name: 'Student Name',
        value: row.Student.fullName
    },
    {
        name: 'Department',
        value: row?.Department?.name
    },
    {
        name: 'Subject',
        value: row?.Subject?.name
    },
    {
        name: 'Book',
        value: row?.Book?.title
    },
    {
        name: 'Test No',
        value: row?.testNo
    },
    {
        name: 'Total Marks',
        value: row?.totalNo
    },
    {
        name: 'Obtained Marks',
        value: row?.obtainedNo
    },
    {
        name: 'Percentage',
        value: <Text style={{ color: row?.percentage > 50 ? 'green' : 'red' }}>{row?.percentage ? row?.percentage : 0}%</Text>
    },
    {
        name: 'Test Status',
        value: row?.status
    },
    {
        name: 'Test Date',
        value: formattedDate(row?.testDate, "dd/MM/yyyy")
    }

]


const TestRecords = () => {
    const [refresh, setRefresh] = useState(false);
    const [progress, setProgress] = useState([]);
    const router = useRoute()
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const dispatch = useDispatch()

    // Function to filter progress reports by date and department option
    // const filterByDate = (startDate, endDate) => {
    //     let filterDate;
    //     if (startDate && endDate) {
    //         filterDate = filterReport?.filter(item => {
    //             const itemDate = new Date(item?.createdAt)
    //             return itemDate >= startDate && itemDate <= endDate;
    //         });
    //     } else {
    //         filterDate = filterReport?.filter(item => true);
    //     }
    //     setProgress(filterDate)
    // }

    // Function to render item when no progress reports found
    const renderItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <View>
                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                <Text style={styles.inactivetext}>No Test Records found</Text>
            </View>
        </View>
    )
    // Function to handle refresh action
    const handleRefresh = () => {
        setRefresh(true);
        dispatch(globalData(user?.id))
            .then(() => {
                getData()
                setRefresh(false);
            })
            .catch(() => {
                getData()
                setRefresh(false);
            });
    };

    const getData = () => {
        let querry = `?studentId=${router?.params?.student?.id}`
        API.GetTestRecords(querry)
            .then(res => {
                setProgress(res?.data)
                // filterByDate()
            })
            .catch(err => customToast('error', err?.message))
            .finally(() => setIsLoading(false))
    }


    useEffect(() => {
        getData()
    }, [])


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LoadingScreen loading={isLoading} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        onRefresh={handleRefresh}
                        refreshing={refresh}
                    />
                }
            >

                <View>
                    <CustomDatePicker
                        onToggle={() => setOpen(false)}
                        isVisible={open}
                        onDone={(date) => {
                            filterByDate(date?.startDate, date?.endDate)
                        }}
                    />

                    <TopbarWithGraph student={router.params.student} isGraph={false} />

                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Test Records</Text>
                        {/* <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                            <View style={[styles.iconView]}>
                                <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                            </View>
                            <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                        </TouchableOpacity> */}
                    </View>

                    <View>
                        {progress?.length > 0 ? <View>

                            {progress?.map((elem, index) => <GridTable downloadIcon={false} header={`Test Record`} key={index} data={nestedArray(elem)} />)}
                        </View> :
                            <>
                                {renderItem()}
                            </>
                        }
                    </View>
                </View>




            </ScrollView>
        </SafeAreaView >
    )
}

export default TestRecords

const styles = StyleSheet.create({

    viewChildrenContainer: {
        paddingVertical: 10,
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
    bgColor: {
        backgroundColor: Color.grayBackground,

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
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textThree,
        fontSize: FontSizes.lg
    }
})