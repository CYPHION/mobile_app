import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import AccordionItem from '../../components/base/Accordion';
import DropdownComponent from '../../components/base/CustomDropDown';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { formattedDate, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';


const data = [
    { name: "2024", value: "1" },
    { name: "2023", value: "2" },
    { name: " 2022", value: "3" },
    { name: "2021", value: "4" },
    { name: "2020", value: "5" },
    { name: "2019 ", value: "6" },
    { name: "2018 ", value: "7" },
    { name: "2017 ", value: "8" },
];


const Receipt = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [option, setOption] = useState("");
    const globaldata = useSelector(state => state?.global?.data)

    const ineerList = (item) => [
        { name: "Previous Dues", value: `£${item?.totalDues}` },
        { name: "Book dues", value: `£${item?.bookDues}` },
        { name: "Paid Amount", value: `£${item?.amountPaid}` },
    ]

    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };

    return (
        <ScrollView>
            <View style={styles.feesContainers}>
                <View style={styles.feesReceiptContainer}>
                    <View>
                        <Text style={styles.fessYears}>Select Year</Text>
                    </View>
                    <View>
                        <DropdownComponent
                            dropdownStyle={{ width: screenDimensions.width * 0.25 }}
                            disable={false}
                            data={data}
                            placeHolderText={"2024"}
                            value={option}
                            setValue={setOption}
                        />
                    </View>
                </View>
                <View>
                    {globaldata?.fees.map((item, index) => (
                        <AccordionItem
                            children={ineerList(item).map((elem, index) => (
                                <View key={index} style={GlobalStyles.contentView}>
                                    <Text style={[GlobalStyles.contentItem]}>{elem.name}</Text>
                                    <Text style={[GlobalStyles.contentItem]}>{elem.value}</Text>
                                </View>
                            ))}
                            key={index}
                            date={`${item.payType} (${item.payBy})`}
                            studentName={formattedDate(item?.createdAt, 'dd-MMM-yyyy')}
                            total={`£${item.amountPaid}`}
                            expanded={activeItem === index}
                            onToggle={() => toggleItem(index)} // Pass toggle function to each item
                        />
                    ))}
                </View>
            </View>
        </ScrollView>
    )
}

export default Receipt

const styles = StyleSheet.create({

    feesReceiptContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    feesContainers: {
        paddingHorizontal: 10
    },
    fessYears: {
        color: Color.primary,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
    }
})