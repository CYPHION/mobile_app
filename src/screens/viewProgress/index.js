import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FilterIcon from "react-native-vector-icons/FontAwesome";
import CustomDatePicker from '../../components/base/CustomDatePicker';
import DropdownComponent from '../../components/base/CustomDropDown';
import GridTable from '../../components/base/GridTable';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';



const ViewProgress = () => {

    const [open, setOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [option, setOption] = useState("");
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

    const nestedArray = [
        {
            name: 'Year',
            value: 'Year 2'
        },
        {
            name: 'Fee Plan',
            value: '4 weeks'
        },
        {
            name: 'Fee Per Week',
            value: '£264'
        },
        {
            name: 'Enrollment Date',
            value: '30-12-2023'
        },
        {
            name: 'Start Date',
            value: '12/5/2023'
        },
        {
            name: 'Mobile No.',
            value: '03113266711'
        }, {
            name: 'Home Number',
            value: '03113266711'
        },
        {
            name: 'Category',
            value: 'Not Child Care'
        },
        {
            name: 'Contract Type',
            value: '52 weeks (Full Term)'
        },
        {
            name: 'Book Dues',
            value: 'No Dues'
        },
    ]


    const items = [
        {
            header: 'test 1',
            data: nestedArray
        },
        {
            header: 'test 2 ',
            data: nestedArray
        },

    ]

    const onDownloadClick = () => {
        //when user click on download button
        console.log('first')
    }


    return (
        <ScrollView>
            <View>

                <CustomDatePicker
                    setSelectedDate={setSelectedDate}
                    onToggle={() => setOpen(false)}
                    isVisible={open}
                    onDone={(date) => console.log(date)}
                    Children={<DropdownComponent
                        label={'Select Department'}
                        disable={false}
                        data={data}
                        placeHolderText={"Parent"}
                        value={option}
                        setValue={setOption}
                    />}
                />

                <View style={styles.viewChildrenContainer}>
                    <View style={{ paddingHorizontal: 10 }}>
                        <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                        <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - Weekly</Text>
                    </View>

                </View>

                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}>Student Details</Text>
                    <TouchableOpacity onPress={() => setOpen(true)} activeOpacity={0.7} style={[styles.container, { gap: 5 }]}>
                        <View style={[styles.iconView]}>
                            <FilterIcon name='filter' color={Color.white} size={FontSizes.lg} />
                        </View>
                        <Text style={[styles.CompText, styles.textFontFamily]}>Select Date</Text>
                    </TouchableOpacity>
                </View>

                <View>

                    {items.map((elem, index) => (
                        <GridTable onDownloadClick={onDownloadClick} header={elem.header} key={index} data={elem.data} />
                    ))}
                </View>
            </View>

        </ScrollView>
    )
}

export default ViewProgress

const styles = StyleSheet.create({

    viewChildrenContainer: {
        paddingVertical: 10,
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.text,
    },
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.textThree,
        fontFamily: FontFamily.medium
    },
    iconView: {
        backgroundColor: Color.primary,
        padding: 5,
        borderRadius: 4
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
})