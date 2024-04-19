import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import WebView from 'react-native-webview'
import CustomButton from '../../components/base/CustomButton'
import DropdownComponent from '../../components/base/CustomDropDown'
import InputField from '../../components/base/InputField'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { customToast, screenDimensions } from '../../utils/functions'
const ContactUs = () => {
    const [isLoading, setIsLoading] = useState(false)
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
        { name: "Brixton", value: "Brixton" },
        { name: "Hounslow", value: "Hounslow" },
        { name: "Woolwich", value: "Woolwich" },
        { name: "Finsbury", value: "Finsbury" },
    ];

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const handleSubmit = () => {
        setIsLoading(true);

        // Basic form validation
        if (!formData.email || !formData.campus) {
            !formData.email ? customToast('error', "Please enter an email address") : '';
            !formData.campus ? customToast('error', "Please enter Campus") : '';
            setIsLoading(false);
            return;
        }

        const payload = {
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            message: formData.message,
            campus: formData.campus
        };

        API.CreateContact(payload)
            .then(res => {
                customToast('success', res.message);
                setFormData({
                    name: '',
                    phone: '',
                    email: '',
                    message: '',
                    campus: ''
                });
            })
            .catch(err => {
                console.error('Error creating contact:', err);
                customToast('error', "Failed to create contact. Please try again later.");
            })
            .finally(() => setIsLoading(false));
    };

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
                            label={"Phone"}
                            inputMode={"numeric"}
                            value={formData.phone}
                            onChangeText={(text) => onChangeHandler('phone', text)}
                        />
                        <InputField
                            label={"Email"}
                            inputMode={"email"}
                            value={formData.email}
                            onChangeText={(text) => onChangeHandler('email', text)}
                        />
                        <InputField
                            multiline
                            onChangeText={(text) => onChangeHandler('message', text)}
                            value={formData.message}
                            label={"Message"}
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
                            value={formData.campus}
                            setValue={(text) => onChangeHandler('campus', text)}
                        />

                        <CustomButton
                            variant={'fill'}
                            title={"Send Message"}
                            onPress={handleSubmit}
                            isLoading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                    <Text style={[styles.name, { fontFamily: FontFamily.bold }]} >
                        Navigation MAPS of our Tuition {'\n'} Centers
                    </Text>
                    <View style={styles.mapcont} >
                        <Text style={styles.text}>Prime Tuition: Brixton</Text>
                        <Text style={styles.text}>Welcome to our Brixton campus.</Text>
                        <WebView
                            style={styles.iframe}
                            source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9943.361134892824!2d-0.1168041!3d51.4610888!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x809fbd3826db5de4!2sPrime%20Tuition!5e0!3m2!1sen!2s!4v1577877518597!5m2!1sen!2s" style="width:100%;" height="100%" frameborder="0" allowfullscreen=""></iframe>' }}
                        />

                        <Text style={styles.text}>Prime Tuition : Hounslow
                        </Text>
                        <Text style={styles.text}>Welcome to our Hounslow campus.</Text>
                        <WebView
                            style={styles.iframe}
                            source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39766.77775385602!2d-0.3673189099381096!3d51.46873830505056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48760daf2b0dbdcb%3A0xf605a2c28f3a1ca1!2sPrime%20Tuition%20Hounslow%20campus!5e0!3m2!1sen!2s!4v1578566605157!5m2!1sen!2s" style="width:100%;" height="100%" frameborder="0" allowfullscreen=""></iframe>' }}
                        />

                        <Text style={styles.text}>Prime Tuition : Woolwich</Text>
                        <Text style={styles.text}>Welcome to our Woolwich campus.</Text>
                        <WebView
                            style={styles.iframe}
                            source={{ html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.1032803753037!2d0.06433911576944353!3d51.49297217963282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI5JzM0LjciTiAwwrAwMyc1OS41IkU!5e0!3m2!1sen!2s!4v1634314255092!5m2!1sen!2s" style="width:100%;" height="100%" frameborder="0" allowfullscreen=""></iframe>' }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView >
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
    text: {
        fontFamily: FontFamily.interMedium,
        color: Color.text,
        fontSize: FontSizes.lg,
        paddingTop: 10,
        paddingHorizontal: 20,
        alignSelf: 'flex-start'
    },
    iframe: {
        width: screenDimensions.width * 0.9,
        height: 200,
        marginBottom: 20
    },
    mapcont: {
        alignItems: 'center'
    }
})