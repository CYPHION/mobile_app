import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from "react-native-vector-icons/Ionicons"
import CustomButton from '../../components/base/CustomButton'
import GridTable from '../../components/base/GridTable'
import InputField from '../../components/base/InputField'
import TopbarWithGraph from '../../components/widget/TopbarWithGraph'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'

const ViewFess = () => {
    const [formData, setFormData] = useState({
        paymentType: 'Card',
        noOfWeeks: '',
        paidAmount: '',
        remarks: ''
    })

    const [isActive, setIsActive] = useState(false)

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
                <TopbarWithGraph />
                <View style={[styles.bgColor, styles.container]}>
                    <Text style={styles.detailText}>Student Details</Text>
                </View>
                {isActive ? <>
                    <View style={[styles.inputView]}>
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
                    <View style={[styles.bgColor, styles.container]}>
                        <Text style={styles.detailText}>Charges</Text>
                        <Text style={styles.detailText}>Total</Text>
                    </View>
                    <View>
                        <GridTable data={items} />
                    </View>
                    <View style={[styles.bgColor, styles.container]}>
                        <Text style={styles.detailText}>Total Charges</Text>
                        <Text style={styles.detailText}>&pound;528</Text>
                    </View>
                    <View style={[styles.btnView]}>

                        <CustomButton
                            title={'Pay Now'}
                            variant='fill'
                        />
                    </View>
                </> :
                    <>
                        <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.5 }}>
                            <View>
                                <Icon name='eye-off' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                                <Text style={styles.inactivetext}>Child Inactive</Text>
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    bgColor: {
        backgroundColor: Color.grayBackground,
        padding: 10,

    },
    detailText: {
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.medium
    },
    inputView: {
        padding: 10
    },
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