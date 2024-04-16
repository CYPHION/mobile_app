import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
const ContactUs = () => {
    const [option, setOption] = useState("");
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        message: '',
        campus: ''
    })

    const address = [
        {
            campus: 'BRIXTON',
            phone: '0203 302 1524',
            email: 'info@primetuition.co.uk',
            address: '10-16 Acre House, Acre Lane (Opposite Lambeth Town Hall), Brixton London SW2 5SG'
        },
        {
            campus: 'HOUNSLOW',
            phone: ' 0208 127 6155',
            email: 'hounslow@primetuition.co.uk',
            address: '65-73 Staines Road, Holdsworth House, Hounslow TW3 3HW'
        },
        {
            campus: 'WOOLWICH',
            phone: ' 0208 317 7911',
            email: 'woolwich@primetuition.co.uk',
            address: '94 Baresford Street. Ground Floor. Royal Sovereign House. Woolwich. SE18 6BF'
        },
        {
            campus: 'FINSBURY',
            phone: ' 0203 336 3244',
            email: 'finsbury@primetuition.co.uk',
            address: '75 Hanley Road, Finsbury, London, England. N4 3DQ'
        },
    ]

    const data = [
        { name: "BRIXTON", value: "1" },
        { name: "HOUNSLOW", value: "2" },
        { name: "WOOLWICH", value: "3" },
        { name: "FINSBURY", value: "4" },

    ];

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const handleSubmit = () => {
        console.log(formData)

    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={styles.container}>
                    {address.map((elem, index) => (
                        <View key={index} style={styles.card}>
                            <Text style={styles.heading}>{elem?.campus}</Text>
                            <View style={styles.iconcontainer}>
                                <Icon name="facebook-square" size={25} color={Color.textThree} />
                                <Icon name="instagram" size={25} color={Color.textThree} />
                                <Icon name="google" size={25} color={Color.textThree} />
                                <Icon name="youtube" size={25} color={Color.textThree} />
                            </View>
                            <Text style={styles.bold}>Phone:{' '}<Text style={[styles.inner, { color: Color.freeze }]}>{elem?.phone}</Text></Text>
                            <Text style={styles.bold}>
                                Email: {'\n'}
                                <Text style={[styles.inner, { color: Color.freeze }]}>{elem?.email}</Text>
                            </Text>
                            <Text style={styles.bold}>Address:{' '}
                                <Text style={[styles.inner, { color: Color.textThree }]}>
                                    {elem?.address}
                                </Text>
                            </Text>
                        </View>
                    ))}
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text style={[styles.name, { fontFamily: FontFamily.bold }]}>Get in Touch</Text>
                        <InputField
                            label={"Name"}
                            inputMode={"text"}
                            value={formData.name}
                            onChangeText={(text) => onChangeHandler('name', text)}
                        />
                        <InputField
                            label={"Email"}
                            inputMode={"numeric"}
                            value={formData.phone}
                            onChangeText={(text) => onChangeHandler('phone', text)}
                        />
                        <InputField
                            label={"Student ID"}
                            inputMode={"email"}
                            value={formData.email}
                            onChangeText={(text) => onChangeHandler('email', text)}
                        />
                        <InputField
                            multiline
                            onChangeText={(text) => onChangeHandler('message', text)}
                            value={formData.message}
                            label={"Remarks"}
                            inputStyle={{
                                height: screenDimensions.height * 0.2,
                                textAlignVertical: "top",
                            }}
                        />
                        <DropdownComponent
                            label={'Capmus'}
                            disable={false}
                            data={data}
                            placeHolderText={"Campus"}
                            value={option}
                            setValue={setOption}
                        />

                        <CustomButton
                            variant={'fill'}
                            title={"Send Message"}
                            onPress={handleSubmit}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    iconcontainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container: {
        padding: 10,
        gap: 10
    },
    card: {
        backgroundColor: Color.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 25
    },
    heading: {
        fontSize: FontSizes.xxl,
        marginVertical: 10,
        fontFamily: FontFamily.bold,
        color: Color.text,
        textAlign: 'center'
    },
    bold: {
        fontFamily: FontFamily.bold,
        fontSize: FontSizes.lg,
        color: Color.text,
        textAlign: 'center',
        marginVertical: 10
    },
    inner: {
        fontFamily: FontFamily.regular
    },
    name: {
        fontSize: FontSizes.xl,
        color: Color.text,
        marginVertical: 25,
        textAlign: 'center'
    },
})