import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Color } from '../../../utils/color'
import { formattedDate, getParentDropdown, screenDimensions } from '../../../utils/functions'
import CustomButton from '../../base/CustomButton'
import DatePickerSingle from '../../base/DatePicker'
import InputField from '../../base/InputField'
import MultiSelectComponent from '../../base/MultiSelect'
import StudentsAccordion from '../StudentsAccordion'

const { fontScale } = screenDimensions;

const CreateAppliction = (props) => {
    const { setNextScreen } = props
    const [open, setOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [data, setData] = useState([])
    const [schedules, setSchedules] = useState([])
    const globalData = useSelector(state => state?.global?.data)

    const [formData, setFormData] = useState({
        date: '',
        remarks: '',

    })
    const [selectedValues, setSelectedValues] = useState([])

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));
        if (name === 'passwordTwo')
            setError('')
    };


    return (
        <View style={styles.main}>
            <StudentsAccordion open={open} setOpen={setOpen} setNextScreen={setNextScreen} date={formData?.date} selectedStudent={selectedValues} />
            <>
                <View>
                    <MultiSelectComponent
                        label='Add Student'
                        list={getParentDropdown(globalData?.students)}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        placeHolderText={selectedValues ? `Selected Student (${selectedValues?.length})` : 'Select Students'}
                    />
                </View>
                <DatePickerSingle
                    isVisible={openDate}
                    onToggle={() => setOpenDate(false)}
                    onDone={(date) => onChangeHandler('date', date)}
                />
                <View style={{ padding: 5 }}>
                    <Text style={{ color: Color.text, marginBottom: 5 }}>Select Date</Text>
                    <TouchableOpacity onPress={() => setOpenDate(true)} activeOpacity={0.7} style={{
                        borderWidth: 1,
                        borderRadius: 4, height: fontScale * 40,
                        justifyContent: 'center',
                        padding: 5
                    }}>
                        <View>
                            <Text style={{ color: Color.textThree }}>{formData?.date ? formattedDate(formData?.date, 'dd-MM-yyyy') : 'Select Date'}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <InputField
                        multiline
                        onChangeText={(text) => onChangeHandler('remarks', text)}
                        value={formData.remarks}
                        label={"Remarks"}
                    />
                </View>
                <View>
                    <CustomButton
                        title='Select Lesson'
                        variant='fill'
                        onPress={() => setOpen(true)}
                        disabled={selectedValues?.length === 0 ? true : false}

                    />
                    <CustomButton
                        title='Submit Request'
                        variant='fill'
                        disabled={selectedValues?.length === 0 ? true : false}

                    />
                </View>
            </>
        </View>
    )
}

export default CreateAppliction

const styles = StyleSheet.create({
    main: {
        // backgroundColor: 'pink',
        gap: 10
    }
})