import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterIcon from "react-native-vector-icons/FontAwesome";
import NoHomework from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import CustomDatePicker from '../../components/base/CustomDatePicker';
import DropdownComponent from '../../components/base/CustomDropDown';
import GridTable from '../../components/base/GridTable';
import LoadingScreen from '../../components/base/LoadingScreen';
import TopbarWithGraph from '../../components/widget/TopbarWithGraph';
import { globalData } from '../../store/thunk';
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
    // {
    //     name: 'Teacher',
    //     value: item?.teacherName
    // },
    {
        name: 'Performance',
        value: item?.performance.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Strength',
        value: item?.strength.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Weakness',
        value: item?.weakness.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Task Achieved',
        value: item?.taskAchieved.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Book',
        value: item?.Book?.title
    },
    {
        name: 'Test Start Date',
        value: item?.startDate ? formattedDate(item?.startDate, 'dd/MM/yyyy') : ''
    },
    {
        name: 'Test End Date',
        value: item?.endDate ? formattedDate(item?.endDate, 'dd/MM/yyyy') : ''
    },
    {
        name: 'Test Status',
        // value: `${item?.meanPercentage > 0 ? `${item?.meanPercentage}%` : ''}`
        value: <Text style={{ color: item?.meanPercentage > 50 ? 'green' : 'red' }}>{item?.meanPercentage ? item?.meanPercentage : 0}%</Text>
    },
    {
        name: 'Date Enrolled',
        value: item?.Student?.enrollmentDate ? formattedDate(item?.Student?.enrollmentDate, 'dd/MM/yyyy') : 'N/A'
    },

]

const nestedArrayBasicDetail = (item) => [
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
        name: 'Performance',
        value: item?.performance.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Strength',
        value: item?.strength.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Weakness',
        value: item?.weakness?.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Task To Achieved',
        value: item?.taskToAchieve?.map((elem, index) => <Text key={index} style={styles.CompText}>{elem}</Text>)
    },
    {
        name: 'Date Enrolled',
        value: item?.Student?.enrollmentDate ? formattedDate(item?.Student?.enrollmentDate, 'dd/MM/yyyy') : 'N/A'
    },

]

const ViewProgress = () => {
    const [refresh, setRefresh] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState([]);
    const router = useRoute()
    const [open, setOpen] = useState(false);
    const [option, setOption] = useState("");

    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)
    const filterReport = globaldata?.reports?.filter(elem => elem?.studentId === router?.params?.student?.id)
    const dispatch = useDispatch()

    // Function to filter progress reports by date and department option
    const filterByDate = (startDate, endDate) => {
        let filterDate;
        if (option === '' && startDate && endDate) {
            filterDate = filterReport?.filter(item => {
                const itemDate = new Date(item?.createdAt)
                return itemDate >= startDate && itemDate <= endDate;
            });
        } else if (startDate && endDate && !!option) {
            filterDate = filterReport?.filter(item => {
                const itemDate = new Date(item?.createdAt);
                return itemDate >= startDate && itemDate <= endDate && item.Department?.id === option;
            });
        } else {
            filterDate = filterReport?.filter(item => true);
        }
        setProgress(filterDate)
        setOption('')
        setIsLoading(false)
    }






    // Function to handle download click
    const onDownloadClick = () => {
        //when user click on download button
        console.log('first')
    }
    // Function to render item when no progress reports found
    const renderItem = () => (
        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
            <View>
                <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textThree} />
                <Text style={styles.inactivetext}>No Progress Report found</Text>
            </View>
        </View>
    )
    // Function to handle refresh action
    const handleRefresh = () => {
        setRefresh(true);
        dispatch(globalData(user?.id))
            .then(() => {
                filterByDate()
                setRefresh(false);
            })
            .catch(() => {
                filterByDate()
                setRefresh(false);
            });
    };
    // Effect to filter progress reports when global data reports change
    useEffect(() => {
        filterByDate()
    }, [globaldata?.reports])
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
                        Children={<DropdownComponent
                            label={'Select Department'}
                            disable={false}
                            data={getDepartmentDropdown(globaldata?.departments)}
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

                            {progress?.map((elem, index) => {
                                if (elem?.isDetailReport) {

                                    return <GridTable onDownloadClick={onDownloadClick} downloadIcon={false} header={`Detailed Report`} key={index} data={nestedArray(elem)} />
                                } else {
                                    return <GridTable onDownloadClick={onDownloadClick} downloadIcon={false} header={`Basic Report`} key={index} data={nestedArrayBasicDetail(elem)} />
                                }
                            })}
                        </View> :
                            <>
                                {renderItem()}
                            </>
                        }
                    </View>
                </View>





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
        color: Color.textThree,
        fontSize: FontSizes.lg
    }
})