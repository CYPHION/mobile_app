import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/Ionicons"
import CustomButton from '../../components/base/CustomButton'
import GridTable from '../../components/base/GridTable'
import InputField from '../../components/base/InputField'
import { Color } from '../../utils/color'
import { FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'

const ViewFess = () => {
    const [activeItem, setActiveItem] = useState(null);

    const router = useRoute()
    const student = router.params?.student
    const [error, setError] = useState('')

    const onChangeHandler = (name, text) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: text
        }));

    };

    const items = [
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
            <View style={{ paddingVertical: 10, backgroundColor: Color.white }}>
                {/* <TopbarWithGraph student={student} /> */}
                {/* <View style={[GlobalStyles.headerStyles]}>
                    <Text style={GlobalStyles.headerTextStyle}>Student Details</Text>
                </View> */}
                {student?.status === "active" ? <>
                    <View style={[GlobalStyles.p_10]}>
                        <InputField
                            label={"Payment type"}
                            inputMode={"text"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData?.paymentType}
                            editable={false}
                        // onChangeText={(text) => onChangeHandler('paymentType', text)}
                        />
                        <InputField
                            label={"Number of weeks (Required)"}
                            inputMode={"numeric"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            // keyboardType='numeric'
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
                            inputMode={"text"} // from here you can change type of input field ['none','text','decimal','numeric','tel','search','email','url']
                            value={formData.remarks}
                            onChangeText={(text) => onChangeHandler('remarks', text)}
                        />
                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Charges</Text>
                        <Text style={GlobalStyles.headerTextStyle}>Total</Text>
                    </View>
                    <View>
                        <GridTable data={items} />
                    </View>
                    <View style={[GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Total Charges</Text>
                        <Text style={GlobalStyles.headerTextStyle}>&pound;528</Text>
                    </View>
                    <View style={[styles.btnView]}>

                        <CustomButton
                            title={'Pay Now'}
                            variant='fill'
                        />
                    </View>
                </> :
                    <>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                            <View>
                                <Icon name='eye-off' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                                <Text style={styles.inactivetext}>Child {student?.status}</Text>
                            </View>
                        </View>
                    </>
                }

            </View>
        </ScrollView>
    )
}

export default ViewFess

const styles = StyleSheet.create({

    btnView: {
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }
})