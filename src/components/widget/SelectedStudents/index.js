import React, { useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackIcon from 'react-native-vector-icons/AntDesign'
import CrossIcon from 'react-native-vector-icons/MaterialIcons'
import { Color } from '../../../utils/color'
import { FontFamily, FontSizes } from '../../../utils/font'
import { screenDimensions } from '../../../utils/functions'
import { GlobalStyles } from '../../../utils/globalStyles'
import MyCheckBox from '../../base/CheckBox'
import CustomButton from '../../base/CustomButton'
import DropdownComponent from '../../base/CustomDropDown'
import GridTable from '../../base/GridTable'
import InputField from '../../base/InputField'
import ProceedCompensation from '../ProceedCompensation'




const SelectedStudents = (props) => {
    const { selectedValues, setActiveScreen } = props
    const [remarks, setRemarks] = useState('')
    const [activeStudent, setActiveStudent] = useState(true)
    const [process, setProcess] = useState(false)
    const [option, setOption] = useState("");
    const [selectedData, setSelectedData] = useState([])

    const students = [
        { name: "Abdullah ", value: "1" },
        { name: "Fawad Khan", value: "2" },
        { name: "Jawad Ali", value: "3" },
        { name: "Sami Khan", value: "4" },
    ]
    const filteredStudents = students.filter(student => selectedValues.includes(student.value));
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

    const handleDelete = () => {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'OK', onPress: () => console.log('deleted') }
            ],
            { cancelable: false }
        )
    }

    const CheckBoxRender = (index) => {
        return (
            <View style={{ zIndex: 10, flexDirection: 'row', justifyContent: 'space-between', }}>
                <MyCheckBox isChecked={checkedItems[index]} onToggle={() => handleCheckbox(index)} />
                <CrossIcon onPress={() => handleDelete()} name='close' color={Color.text} size={FontSizes.xl} />
            </View>
        )
    }

    return (
        <>
            {process ?
                <>
                    <ProceedCompensation setProcess={setProcess} setActiveStudent={setActiveStudent} />
                </> :
                <>
                    {activeStudent ?
                        <>
                            <View>
                                {filteredStudents.map((elem, index) => (
                                    <View key={index}>
                                        <View style={[styles.bgColor, styles.container]}>
                                            <Text style={styles.detailText}>{elem.name} </Text>
                                        </View>
                                        <View style={GlobalStyles.p_10}>
                                            <DropdownComponent

                                                disable={false}
                                                data={data}
                                                placeHolderText={"Missed Attendance"}
                                                value={option}
                                                setValue={setOption}
                                            />
                                            <DropdownComponent

                                                disable={false}
                                                data={data}
                                                placeHolderText={"Start Date"}
                                                value={option}
                                                setValue={setOption}
                                            />
                                            <DropdownComponent

                                                disable={false}
                                                data={data}
                                                placeHolderText={"Availible Schedule"}
                                                value={option}
                                                setValue={setOption}
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
                                                    onPress={() => setActiveStudent(false)}
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
                                        onPress={() => setProcess(true)}
                                    />
                                </View>
                                <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                                    <CustomButton
                                        title='Go Back'
                                        btnstyle={{ width: '90%', borderWidth: 1, borderColor: Color.primary }}
                                        onPress={() => setActiveScreen(true)}
                                    />
                                </View>
                            </View>
                        </>
                        :
                        <>
                            <View style={[styles.bgColor, styles.container, GlobalStyles.p_10]}>
                                <TouchableOpacity onPress={() => setActiveStudent(true)} activeOpacity={0.7} style={[styles.iconButton]}>
                                    <BackIcon name='left' color={Color.text} size={FontSizes.xl} />
                                    <Text style={styles.detailText}>Abdullah Khan </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={GlobalStyles.p_10}>
                                {tableData.map((elem, index) => (
                                    <GridTable
                                        data={elem.item}
                                        key={index}
                                        CheckboxChild={CheckBoxRender(index)}
                                    />
                                ))}
                            </View>
                            {checkedItems.filter(elem => elem == true)?.length > 1 ? <View style={{ width: screenDimensions.width, alignItems: 'center' }}>

                                <CustomButton
                                    title='Delete All'
                                    variant='fill'
                                    btnstyle={{ width: '90%', backgroundColor: Color.error }}
                                    onPress={handleDelete}
                                />
                            </View> : null}
                        </>
                    }
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
    iconButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5
    }
})