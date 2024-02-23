import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterIcon from "react-native-vector-icons/FontAwesome";
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from 'react-redux';
import CustomDatePicker from '../../components/base/CustomDatePicker';
import DropdownComponent from '../../components/base/CustomDropDown';
import GridTable from '../../components/base/GridTable';
import TopbarWithGraph from '../../components/widget/TopbarWithGraph';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { formattedDate, getDepartmentDropdown, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';


const nestedArray = (item) => [
    {
        name: 'Student Name',
        value: item?.Student?.fullName
    },
    {
        name: 'Department',
        value: item?.Department?.name
    },
    {
        name: 'Subject',
        value: item?.Subject?.name
    },
    {
        name: 'Book',
        value: item?.Book?.title
    },
    {
        name: 'Test Start Date',
        value: item?.startDate ? formattedDate(item?.startDate, 'dd-MM-yyyy') : ''
    },
    {
        name: 'Test End Date',
        value: item?.endDate ? formattedDate(item?.endDate, 'dd-MM-yyyy') : ''
    }, {
        name: 'Test Status',
        value: `${item?.meanPercentage > 0 ? `${item?.meanPercentage}%` : ''}`
    },
    {
        name: 'Date Enrolled',
        value: item?.Student?.enrollmentDate ? formattedDate(item?.Student?.enrollmentDate, 'dd-MM-yyyy') : 'N/A'
    },

]



const ViewProgress = () => {
    const [refresh, setRefresh] = useState(false);
    const [progress, setProgress] = useState([]);
    const router = useRoute()
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState("");

    const globalData = useSelector(state => state?.global?.data)
    const filterReport = globalData?.reports?.filter(elem => elem.studentId === router.params.student?.id)

    const currentDate = new Date();
    const startOfMonth = new Date(currentDate);
    startOfMonth.setMonth(currentDate.getMonth() - 1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);

    // Set endDate to the end of the current day (11:59:59.999 PM)
    endDate.setHours(23, 59, 59, 999);

    const [date, setDate] = useState({
        startDate: startOfMonth,
        endDate: endDate,
    });

    const filterByDate = (data, startDate, endDate) => {



        if (option === '') {
            return data?.filter(item => {
                const itemDate = new Date(item?.createdAt)
                return itemDate >= startDate && itemDate <= endDate;
            });
        } else {
            return data?.filter(item => {
                const itemDate = new Date(item?.createdAt);
                return itemDate >= startDate && itemDate <= endDate && item.Department?.id === option;
            });
        }
    }

    const handleFilter = () => {
        setProgress(filterByDate(filterReport, date.startDate, date.endDate))
        setOption('')
    }

    useEffect(() => {
        setProgress(filterByDate(filterReport, date.startDate, date.endDate))
    }, [])



    const onDownloadClick = () => {
        //when user click on download button
        console.log('first')
    }

    const renderItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <View>
                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                <Text style={styles.inactivetext}>No Progress Report found</Text>
            </View>
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
        setOption('')
        setProgress(filterByDate(filterReport, refreshedStartDate, refreshedEndDate))
        setRefresh(false);
        // Add additional logic or fetch data as needed
        // ...
    };

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
                {
                    filterReport?.length > 0 ?
                        <View>
                            <CustomDatePicker
                                stDate={date.startDate}
                                enDate={date.endDate}
                                onToggle={() => setOpen(false)}
                                isVisible={open}
                                onDone={(date) => {
                                    setDate(date)
                                    handleFilter()
                                }}
                                Children={<DropdownComponent
                                    label={'Select Department'}
                                    disable={false}
                                    data={getDepartmentDropdown(globalData?.departments)}
                                    placeHolderText={"Select Department"}
                                    value={option}
                                    setValue={setOption}
                                />}
                            />

                            <TopbarWithGraph student={router.params.student} isGraph={false} />

                            <View style={[GlobalStyles.headerStyles]}>
                                <Text style={GlobalStyles.headerTextStyle}>Report Details</Text>
                                <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                                    <View style={[styles.iconView]}>
                                        <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                                    </View>
                                    <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                                </TouchableOpacity>
                            </View>

                            <View>
                                {progress?.length > 0 ? <View>

                                    {progress?.map((elem, index) => (
                                        <GridTable onDownloadClick={onDownloadClick} header={`Test ${index + 1}`} key={index} data={nestedArray(elem)} />
                                    ))}
                                </View> :
                                    <>
                                        {renderItem()}
                                    </>
                                }
                            </View>
                        </View>
                        :
                        <>
                            {renderItem()}
                        </>

                }


            </ScrollView>
        </SafeAreaView>
    )
}

export default ViewProgress

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
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }
})