import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import CustomButton from '../../base/CustomButton'
import InputField from '../../base/InputField'
import MultiSelectComponent from '../../base/MultiSelect'
import StudentsAccordion from '../StudentsAccordion'

const CreateAppliction = (props) => {
    const { setNextScreen } = props
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
        date: '',
        remarks: '',

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


    return (
        <View style={styles.main}>
            <StudentsAccordion open={open} setOpen={setOpen} setNextScreen={setNextScreen} />
            <>
                <View>
                    <MultiSelectComponent
                        label='Add Student'
                        list={data}
                        values={selectedValues}
                        setValues={setSelectedValues}
                        placeHolderText={'Drop Down '}
                    />
                </View>
                <View>
                    <InputField
                        label='Select Date'
                        onChangeText={(text) => onChangeHandler('date', text)}
                        value={formData.date}
                    />
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
                        title='Select Leassons'
                        variant='fill'
                        onPress={() => setOpen(true)}
                    />
                    <CustomButton
                        title='Submit Request'
                        variant='fill'
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