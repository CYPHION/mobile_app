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
        dateRange: '17/12/2023 - 17/5/2024',
        Student: []
    })
    const [selectedValues, setSelectedValues] = useState([])
    const data = [
        { name: "Abdullah ", value: "1" },
        { name: "Fawad Khan", value: "2" },
        { name: "Jawad Ali", value: "3" },
        { name: "Sami Khan", value: "4" },
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
                    {/* <InputField
                        label={"Main Id"}
                        inputMode={"numeric"}
                        value={formData.mainId}
                        onChangeText={(text) => onChangeHandler('numeric', text)}
                    /> */}
                    <InputField
                        label={"Date Range"}
                        value={formData.dateRange}
                        editable={false}
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
                            onPress={() => setActiveScreen(false)}
                        />
                        <CustomButton
                            title={'Reset'}
                            btnstyle={styles.btnStyle}
                            onPress={() => {
                                setSelectedValues([])
                                setOpen(true)
                            }}
                        />
                    </View>
                </View> :
                <SelectedStudents setActiveScreen={setActiveScreen} selectedValues={selectedValues} />
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