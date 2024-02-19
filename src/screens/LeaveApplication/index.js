import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CustomButton from '../../components/base/CustomButton';
import GridTable from '../../components/base/GridTable';
import MyModal from '../../components/base/Modal';
import CreateAppliction from '../../components/widget/CreateApplication';
import ViewApplication from '../../components/widget/ViewApplication';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';

const LeaveApplication = () => {

    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [nextScreen, setNextScreen] = useState(false)


    const item = [
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
        {
            name: "Subject",
            value: "Subject Value ",
        },
        {
            name: "Fees",
            value: "10/8/2024",
        },
        {
            name: "date",
            value: "10/8/2024",
        },
        {
            name: "name",
            value: "M.Owais",
        },
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
    ]


    const tableData = [
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
        {
            item,
        },
    ]

    const renderScreen = () => (
        <View>

            <Text style={styles.textHeading}>Leave Request Preview</Text>
            <Text style={styles.para}>Note: You are about to submit leave request. Kindly verify all details.</Text>
            <View>
                {
                    tableData.map((elem, index) => (
                        <GridTable key={index} data={elem.item} />
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



    return (
        <View>
            <MyModal
                modalVisible={open}
                setModalVisible={setOpen}
                children={ModalContent()}
            />
            <View style={[styles.main]}>
                <View style={styles.absoluteBtnView}>
                    {nextScreen ? <CustomButton
                        title={'SUBMIT'}
                        variant='fill'
                        btnstyle={styles.absoluteBtn}
                        onPress={() => setOpen(prev => !prev)}
                    /> : null}
                </View>
                <ScrollView>
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
                                {nextScreen ? renderScreen() : <CreateAppliction setNextScreen={setNextScreen} />}
                            </>
                        }
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default LeaveApplication;


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
    }

})