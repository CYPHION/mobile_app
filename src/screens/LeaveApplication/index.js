import React, { useState } from 'react';
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../components/base/CustomButton';
import GridTable from '../../components/base/GridTable';
import MyModal from '../../components/base/Modal';
import CreateAppliction from '../../components/widget/CreateApplication';
import ViewApplication from '../../components/widget/ViewApplication';
import { API } from '../../network/API';
import { globalData } from '../../store/thunk';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { customToast, formattedDate, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';


const LeaveApplication = () => {
    const [refresh, setRefresh] = useState(false);
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectData, setselectData] = useState([])
    const [selectedDate, setselectedDate] = useState('')
    const [reason, setReason] = useState('')
    const [nextScreen, setNextScreen] = useState(false)
    const dispatch = useDispatch()
    const user = useSelector(state => state?.user?.data)

    // Function to generate item data for rendering
    const item = (item) => [
        {
            name: "Main ID",
            value: item?.Student?.mainId,
        },
        {
            name: "Student Name",
            value: item?.Student?.fullName,
        },
        {
            name: "Year",
            value: item?.Student?.StudentYear?.name,
        },
        {
            name: "Subject",
            value: item?.Subject?.name,
        },
        {
            name: "Lecture Time",
            value: `${item?.LessonTiming?.hours} hours`,
        },
        {
            name: "Date",
            value: formattedDate(selectedDate, 'dd-MM-yyyy'),
        },
        {
            name: "Day",
            value: formattedDate(selectedDate, 'EEEE'),
        },
    ]


    // Function to render screen content
    const renderScreen = () => (
        <View >
            <View style={GlobalStyles.p_10}>
                <Text style={styles.textHeading}>Leave Request Preview</Text>
                <Text style={styles.para}>Note: You are about to submit leave request. Kindly verify all details.</Text>
            </View>
            <View>
                {
                    selectData?.map((elem, index) => (
                        <GridTable key={index} data={item(elem)} />
                    ))
                }
            </View>
        </View>
    )

    // Modal content component
    const ModalContent = () => (
        <View style={styles.modal}>
            <View style={styles.iconView}>
                <Icon name='check' color={Color.white} size={screenDimensions.width * 0.1} />
            </View>
            <Text style={styles.modalText}>Leave Application Submitted Successfully</Text>
            <CustomButton
                title='OK'
                variant='fill'
                onPress={() => {
                    setOpen(false)
                    setNextScreen(false)
                    setActive(prev => !prev)
                    dispatch(globalData(user?.id))
                }}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5 }}
            />
        </View>
    )
    // Function to handle processing leave request
    const handleProcessRequest = async () => {

        const payload = selectData?.map(elem => ({
            applicationDate: formattedDate(selectedDate, 'yyyy-MM-dd'),
            scheduleId: elem.id,
            studentId: elem.studentId,
            reason: reason

        }))

        let formValues = {
            data: payload
        }

        await API.createLeave(formValues).then(res => {
            // customToast("success", res?.message)
            setOpen(prev => !prev)
        }).catch(err => {
            customToast("error", err?.message)
        })

    }

    // Function to handle refresh action
    const handleRefresh = () => {
        setRefresh(true);
        dispatch(globalData(user?.id))
            .then(() => {
                setRefresh(false);
            })
            .catch(() => {
                setRefresh(false);
            });
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View>
                <MyModal
                    modalVisible={open}
                    setModalVisible={setOpen}
                    children={ModalContent()}
                />
                <View style={[styles.main]}>
                    <View style={styles.absoluteBtnView}>
                        {nextScreen ? <>
                            <CustomButton
                                title={'SUBMIT'}
                                variant='fill'
                                btnstyle={styles.absoluteBtn}
                                onPress={() => {
                                    handleProcessRequest()
                                }}
                            />
                            <CustomButton
                                title={'Go Back '}
                                // variant='fill'
                                btnstyle={styles.absoluteBtn}
                                onPress={() => {
                                    setActive(false)
                                    setNextScreen(false)
                                    setselectData([])
                                }}
                            />
                        </> : null}
                    </View>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                onRefresh={handleRefresh}
                                refreshing={refresh}
                            />
                        }
                    >
                        <View style={nextScreen && { height: selectData?.length > 1 ? screenDimensions.height * 1.33 : screenDimensions.height * 0.9 }}>
                            <View style={[styles.tabBtn]}>
                                <CustomButton
                                    title='Create Appliction'
                                    btnstyle={styles.btnStyle}
                                    variant={active ? '' : 'fill'}
                                    onPress={() => setActive(prev => !prev)}
                                />
                                <CustomButton
                                    btnstyle={styles.btnStyle}
                                    title='View Application'
                                    variant={active ? 'fill' : ''}
                                    onPress={() => {
                                        setNextScreen(false)
                                        setActive(prev => !prev)
                                    }}
                                />
                            </View>
                            <View style={[GlobalStyles.p_10]}>
                                {active ? <ViewApplication /> :
                                    <>
                                        {nextScreen ? renderScreen() : <CreateAppliction setNextScreen={setNextScreen} setselectData={setselectData} setselectedDate={setselectedDate} selectData={selectData} setReason={setReason} />}
                                    </>
                                }
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LeaveApplication;


const styles = StyleSheet.create({
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
        zIndex: 20,
        width: screenDimensions.width,
        backgroundColor: Color.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    absoluteBtn: {
        width: '95%',
    },
    absoluteBtn2: {
        width: '95%',
        marginTop: 3,
        borderColor: Color.text,
        borderWidth: 0.5
    },
    iconView: {
        backgroundColor: Color.primary,
        width: screenDimensions.width * 0.15,
        height: screenDimensions.width * 0.15,
        borderRadius: screenDimensions.width * (0.15 * 0.5),
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        alignItems: 'center',
        gap: 10
    },
    modalText: {
        textAlign: 'center',
        fontFamily: FontFamily.interBold,
        color: Color.text,
        fontSize: FontSizes.lg
    },


})