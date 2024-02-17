import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import AccordionItem from '../../components/base/Accordion';
import CustomButton from '../../components/base/CustomButton';
import DropdownComponent from '../../components/base/CustomDropDown';
import GridTable from '../../components/base/GridTable';
import InputField from '../../components/base/InputField';
import { Color } from '../../utils/color';
import { FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';

const FeeCollection = () => {
    const [activeItem, setActiveItem] = useState(null);
    const [option, setOption] = useState("");

    const data = [
        { name: "Pay By Family", value: "1" },
        { name: "Pay By Student", value: "2" },
        { name: " Pay Dues", value: "3" },
        { name: "Pay Book Dues", value: "4" },

    ];

    const items = [
        {
            date: "Main ID: 11111",
            studentName: "Year In School - 12",
            title: "Abdullah Khan",
            data: [
                { name: "Book Dues ", value: "£0" },
                { name: " Total Booster Price", value: "£80" },
                { name: "Booster Dues", value: "£80" },
                { name: "Total Booster Weeks", value: "£80" },
                { name: "Total Booster Weeks", value: "4 Weeks" },
                { name: "Total Charges", value: "£80" },
            ],
        },
        {
            date: "Main ID: 11111",
            studentName: "Year In School - 13S",
            title: "Hassan Khan",
            data: [
                { name: "Book Dues ", value: "£0" },
                { name: " Total Booster Price", value: "£80" },
                { name: "Booster Dues", value: "£80" },
                { name: "Total Booster Weeks", value: "£80" },
                { name: "Total Booster Weeks", value: "4 Weeks" },
                { name: "Total Charges", value: "£80" },
            ],
        },
    ]

    const toggleItem = (index) => {
        setActiveItem(activeItem === index ? null : index); // Toggle state based on click
    };


    const [formData, setFormData] = useState({
        paymentType: 'Card',
        noOfWeeks: '',
        paidAmount: '',
        remarks: ''
    })


    const [error, setError] = useState('')

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const itemss = [
        { name: 'Object1', value: 10 },
        { name: 'Object2', value: 20 },
        { name: 'Object3', value: 30 },
        { name: 'Object4', value: 40 },
        { name: 'Object5', value: 50 },
        { name: 'Object6', value: 60 },
        { name: 'Object7', value: 70 },
        { name: 'Object8', value: 80 },
        { name: 'Object9', value: 90 },
        { name: 'Object10', value: 100 },
    ]



    return (

        <ScrollView>
            <View style={{ backgroundColor: Color.white }}>

                <View style={{ paddingHorizontal: 10, alignItems: 'center' }}>
                    <DropdownComponent
                        dropdownStyle={{ width: screenDimensions.width * 0.95 }}
                        disable={false}
                        data={data}
                        placeHolderText={"Select Payment Type"}
                        value={option}
                        setValue={setOption}
                    />
                </View>
                {option ? <>

                    <View style={[GlobalStyles.p_10]}>
                        {items.map((item, index) => (
                            <AccordionItem
                                children={<GridTable key={index} data={item.data} />}
                                key={index}
                                date={item.date}
                                studentName={item.studentName}
                                total={item.title}
                                data={item.data}
                                expanded={activeItem === index}
                                onToggle={() => toggleItem(index)} // Pass toggle function to each item
                            />
                        ))}
                    </View>



                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Student Fees</Text>
                    </View>
                    <View style={[GlobalStyles.p_10]}>
                        <InputField
                            label={"Payment type"}
                            inputMode={"text"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.paymentType}
                        // onChangeText={(text) => onChangeHandler('paymentType', text)}
                        />
                        <InputField
                            label={"Number of weeks (Required)"}
                            inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.noOfWeeks}
                            onChangeText={(text) => onChangeHandler('noOfWeeks', text)}
                        />
                        <InputField
                            label={"Paid Amount (Required)"}
                            maxLength={5}
                            inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.paidAmount}
                            onChangeText={(text) => onChangeHandler('paidAmount', text)}
                        />
                        <InputField
                            label={"Remarks"}
                            maxLength={5}
                            multiline={true}
                            inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.remarks}
                            onChangeText={(text) => onChangeHandler('remarks', text)}
                        />
                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Charges</Text>
                        <Text style={GlobalStyles.headerTextStyle}>Amount</Text>
                    </View>
                    <View style={GlobalStyles.p_10}>
                        <GridTable data={itemss} />
                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Total Amount (Charges + Dues)</Text>
                        <Text style={GlobalStyles.headerTextStyle}>&pound;528</Text>
                    </View>
                    <View style={[styles.btnView]}>

                        <CustomButton
                            title={'Pay Now'}
                            variant='fill'
                        />
                    </View>

                </> : null
                }
            </View>

        </ScrollView>
    )
}

export default FeeCollection;

const styles = StyleSheet.create({
    accordStyle: {
        borderBottomWidth: 1
    },
    AccordStyle: {
        borderBottomWidth: 1
    },

    btnView: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    },

})