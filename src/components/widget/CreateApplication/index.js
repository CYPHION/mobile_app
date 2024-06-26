import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { Color } from '../../../utils/color'
import { customToast, formattedDate, getParentDropdown, screenDimensions } from '../../../utils/functions'
import CustomButton from '../../base/CustomButton'
import DatePickerSingle from '../../base/DatePicker'
import InputField from '../../base/InputField'
import MultiSelectComponent from '../../base/MultiSelect'
import StudentsAccordion from '../StudentsAccordion'

const { fontScale } = screenDimensions;

const CreateAppliction = (props) => {
    const { setNextScreen, setselectData, setselectedDate, selectData, setReason } = props
    const [open, setOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const globalData = useSelector(state => state?.global?.data)
    const [isLoading, setIsLoading] = useState(false)
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
        if (name === 'date') {
            setselectedDate(text)
        }
        if (name === 'remarks') {
            setReason(text)
        }
    };


    const handleSubmit = () => {
        setIsLoading(true)
        if (!formData?.date || !formData?.remarks) {
            !formData?.remarks && customToast("error", "Please write valid reason")
            !formData?.date && customToast("error", "Please Select Date First")
            setIsLoading(false)
        } else {
            if (selectData?.length === 0) {
                customToast("error", "Please Select Schedule")
                setIsLoading(false)
            } else {

                setNextScreen(true)
                setIsLoading(false)
            }

        }
    }


    return (
        <View style={styles.main}>
            <StudentsAccordion open={open} setOpen={setOpen} date={formData?.date} selectedStudent={selectedValues} setselectData={setselectData} />
            <>
                <View>
                    <MultiSelectComponent
                        label='Add Student'
                        list={getParentDropdown(globalData?.students)}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        required
                        placeHolderText={selectedValues ? `Selected Student (${selectedValues?.length})` : 'Select Students'}
                    />
                </View>
                <DatePickerSingle
                    isVisible={openDate}
                    onToggle={() => setOpenDate(false)}
                    onDone={(date) => onChangeHandler('date', date)}
                />
                <View style={{ padding: 5 }}>
                    <Text style={{ color: Color.text, marginBottom: 5 }}>Select Date (Required)</Text>
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
                        label={"Reason"}
                        required
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
                        disabled={isLoading}
                        onPress={handleSubmit}
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