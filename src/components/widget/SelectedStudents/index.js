import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { screenDimensions } from '../../../utils/functions'
import MyCheckBox from '../../base/CheckBox'
import CustomButton from '../../base/CustomButton'
import DropdownComponent from '../../base/CustomDropDown'
import GridTabel from '../../base/GridTable'
import InputField from '../../base/InputField'
import MultiSelectComponent from '../../base/MultiSelect'






const SelectedStudents = () => {
    const students = [{ name: 'Abdullah Khan' }, { name: 'Sami Khan' }]
    const [remarks, setRemarks] = useState('')
    const [screenActive, setScreenActive] = useState(true)
    const [option, setOption] = useState("");
    const [selectedValues, setSelectedValues] = useState([])
    const [selectedData, setSelectedData] = useState([])

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



    const item = [
        {
            name: "Enrollment date",
            value: "10/8/2024",
        },
        {
            name: "agblsuyuil syufy sfap",
            value: "jfksafh.ajkkflas;jk",
        },
        {
            name: "hfsgksabjhfuklagklsakfa",
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
    const [checkedItems, setCheckedItems] = useState(Array(tableData.length).fill(false));


    const handleCheckbox = (index) => {
        const newCheckedItems = [...checkedItems];
        newCheckedItems[index] = !newCheckedItems[index];
        setCheckedItems(newCheckedItems);

        // Update selectedData based on the checked status
        const newData = tableData[index].item
        setSelectedData((prev) => [...prev, { ...newData }]);
    };


    const CheckBoxRender = (index) => {
        return (
            <View style={{ zIndex: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <MyCheckBox isChecked={checkedItems[index]} onToggle={() => handleCheckbox(index)} />
                <TouchableOpacity activeOpacity={0.7}>

                    <Text style={{ color: Color.text, fontSize: FontSizes.lg, fontFamily: FontFamily.bold }}>
                        X
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
            {screenActive ?
                <>
                    <View>
                        {students.map((elem, index) => (
                            <View key={index}>
                                <View style={[styles.bgColor, styles.container]}>
                                    <Text style={styles.detailText}>{elem.name} </Text>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <DropdownComponent

                                        disable={false}
                                        data={data}
                                        placeHolderText={"Parent"}
                                        value={option}
                                        setValue={setOption}
                                    />
                                    <DropdownComponent

                                        disable={false}
                                        data={data}
                                        placeHolderText={"Parent"}
                                        value={option}
                                        setValue={setOption}
                                    />
                                    <MultiSelectComponent
                                        list={data}
                                        values={selectedValues}
                                        setValues={setSelectedValues}
                                        label={'Drop down'}
                                        placeHolderText={'Drop Down '}
                                    />
                                    <InputField
                                        label={"Remarks"}
                                        value={remarks}
                                        onChangeText={(text) => setRemarks(text)}
                                    />
                                    <View style={styles.btnContainer}>
                                        <CustomButton
                                            title={'Add'}
                                            variant='fill'
                                            btnstyle={styles.btnStyle}
                                        />
                                        <CustomButton
                                            variant='fill'
                                            title={'View'}
                                            onPress={() => setScreenActive(false)}
                                            btnstyle={styles.btnStyle}
                                        />
                                    </View>
                                </View>
                            </View>
                        ))}
                        <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                            <CustomButton
                                title='Create All'
                                variant='fill'
                                btnstyle={{ width: '90%' }}
                            />
                        </View>
                    </View>
                </>
                :
                <>
                    <View style={[styles.bgColor, styles.container]}>
                        <Text style={styles.detailText}>Abdullah Khan </Text>
                    </View>
                    <View style={{ padding: 10 }}>
                        {tableData.map((elem, index) => (
                            <GridTabel
                                data={elem.item}
                                key={index}
                                CheckboxChild={CheckBoxRender(index)}
                            />
                        ))}
                    </View>
                    <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                        <CustomButton
                            title='Delete All'
                            variant='fill'
                            btnstyle={{ width: '90%', backgroundColor: Color.error }}

                        />
                    </View>
                </>
            }
        </>
    )
}

export default SelectedStudents

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.medium
    },
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    btnStyle: {
        width: screenDimensions.width * 0.25
    },
})