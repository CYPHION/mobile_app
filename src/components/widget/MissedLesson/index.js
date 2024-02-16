import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { screenDimensions } from '../../../utils/functions'
import CustomButton from '../../base/CustomButton'
import InputField from '../../base/InputField'
import MyModal from '../../base/Modal'
import MultiSelectComponent from '../../base/MultiSelect'
import SelectedStudents from '../SelectedStudents'

const MissedLesson = () => {
    const [open, setOpen] = useState(false)
    const [activeScreen, setActiveScreen] = useState(true)
    const [formData, setFormData] = useState({
        mainId: '',
        dateRange: '',
        Student: []
    })
    const [selectedValues, setSelectedValues] = useState([])
    const data = [
        { name: "Item 1", value: "1" },
        { name: "Item 2", value: "2" },
        { name: "Item 3", value: "3" },
        { name: "Item 4", value: "4" },
        { name: "Item 5", value: "5" },
        { name: "Item 6", value: "6" },
        { name: "Item 7", value: "7" },
        { name: "Item 8", value: "8" },
    ];

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));
        if (name === 'passwordTwo')
            setError('')
    };

    const ModalContent = () => (
        <View style={styles.modal}>
            <Text style={styles.modalText}>Not Available!</Text>
            <Text style={[styles.modalText, { fontFamily: FontFamily.medium, fontSize: FontSizes.md }]}>Fee not paid to avail Compensation</Text>
            <CustomButton
                title='Cancel'
                onPress={() => {
                    setOpen(false)

                }}
                textStyle={{ color: Color.textThree }}
                btnstyle={{ width: screenDimensions.width * 0.2, paddingVertical: 5, backgroundColor: Color.disable }}
            />
        </View>
    )

    return (
        <ScrollView>
            <MyModal
                modalVisible={open}
                setModalVisible={setOpen}
                children={ModalContent()}
            />
            {activeScreen ?
                <View style={{ padding: 10 }}>
                    <InputField
                        label={"Main Id"}
                        inputMode={"numeric"}
                        value={formData.mainId}
                        onChangeText={(text) => onChangeHandler('numeric', text)}
                    />
                    <InputField
                        label={"Date Range"}
                        value={formData.dateRange}
                        onChangeText={(text) => onChangeHandler('numeric', text)}
                    />
                    <MultiSelectComponent
                        list={data}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        label={'Drop down'}
                        placeHolderText={'Drop Down '}
                    />
                    <View style={styles.btnContainer}>
                        <CustomButton
                            title={'Submit'}
                            variant='fill'
                            btnstyle={styles.btnStyle}
                            onPress={() => setOpen(true)}
                        />
                        <CustomButton
                            title={'Reset'}
                            btnstyle={styles.btnStyle}
                            onPress={() => setActiveScreen(false)}
                        />
                    </View>
                </View> :
                <SelectedStudents />
            }
        </ScrollView>
    )
}

export default MissedLesson

const styles = StyleSheet.create({
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    btnStyle: {
        width: screenDimensions.width * 0.25
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