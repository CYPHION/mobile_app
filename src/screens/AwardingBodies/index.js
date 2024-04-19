import React, { useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomButton from '../../components/base/CustomButton'
import children from "../../images/children.png"
import letter from "../../images/letter.jpg"
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'


const renderItem = (heading) => (
    <View>
        <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
            <Text style={GlobalStyles.headerTextStyle}>{heading}</Text>
        </View>
        <Text style={styles.desc}>
            Prime Tuition is an approved examination centre for OCR and help students for the preparation of GCSE & GCE exams to secure good grades in all major subjects. Private Examination Candidates are always welcomed. We offer students the chance sit exams privately to ensure students get top grades!
        </Text>
        <View style={styles.flex}>
            <Image resizeMode='contain' style={styles.childrenpic} source={children} />
        </View>
    </View>
)

const Screen1 = () => (
    <View style={[styles.flex, { paddingVertical: 20 }]}>
        <Image resizeMode='cover' style={styles.letter} source={letter} />
    </View>
)
const Screen2 = () => (
    <View>
        {renderItem("Exams for OCR")}
    </View>
)
const Screen3 = () => (
    <View>
        {renderItem("Exams for EDEXCEL")}
    </View>
)
const Screen4 = () => (
    <View>
        {renderItem("Exams for AQA")}
    </View>
)


const AwardingBodies = () => {
    const [active, setActive] = useState("1")


    const rednerScreen = (screen) => {
        switch (screen) {
            case '1':
                return <Screen1 />
            case '2':
                return <Screen2 />
            case '3':
                return <Screen3 />
            case '4':
                return <Screen4 />
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={[styles.tabBtn]}>
                    <CustomButton
                        title='OFSTED'
                        btnstyle={styles.btnStyle}
                        variant={active == "1" ? 'fill' : ''}
                        onPress={() => {
                            setActive("1")
                        }}
                    />
                    <CustomButton
                        title='OCR'
                        btnstyle={styles.btnStyle}
                        variant={active == "2" ? 'fill' : ''}
                        onPress={() => {
                            setActive("2")
                        }}
                    />
                    <CustomButton
                        title='EDEXCEL'
                        btnstyle={styles.btnStyle}
                        variant={active == "3" ? 'fill' : ''}
                        onPress={() => {
                            setActive("3")
                        }}
                    />
                    <CustomButton
                        btnstyle={styles.btnStyle}
                        title='AQA'
                        variant={active == "4" ? 'fill' : ''}
                        onPress={() => {
                            setActive("4")
                        }}
                    />
                </View>
                <View >
                    {rednerScreen(active)}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AwardingBodies

const styles = StyleSheet.create({
    flex: {

        justifyContent: 'center',
        alignItems: 'center'
    },
    tabBtn: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        width: screenDimensions.width * 0.22,
    },
    letter: {
        width: screenDimensions.width * 0.9,
        height: 550,
        borderWidth: 1,
        borderColor: Color.textThree,
        borderRadius: 3
    },
    desc: {
        padding: 20,
        color: Color.textThree,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.sm,
        lineHeight: 23
    },
    childrenpic: {
        width: screenDimensions.width * 0.95,
        height: 250,
    }
})