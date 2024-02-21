import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/base/CustomButton';
import GridTable from '../../components/base/GridTable';
import MyModal from '../../components/base/Modal';
import CreateAppliction from '../../components/widget/CreateApplication';
import ViewApplication from '../../components/widget/ViewApplication';
import { API } from '../../network/API';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { customToast, formattedDate, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';


const LeaveApplication = () => {

    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectData, setselectData] = useState([])
    const [selectedDate, setselectedDate] = useState('')
    const [reason, setReason] = useState('')
    const [nextScreen, setNextScreen] = useState(false)


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

    const renderScreen = () => (
        <View >

            <Text style={styles.textHeading}>Leave Request Preview</Text>
            <Text style={styles.para}>Note: You are about to submit leave request. Kindly verify all details.</Text>
            <View>
                {
                    selectData?.map((elem, index) => (
                        <GridTable key={index} data={item(elem)} />
                    ))
                }
            </View>
        </View>
    )


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
                }}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5 }}
            />
        </View>
    )

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



    return (
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
                <ScrollView>
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