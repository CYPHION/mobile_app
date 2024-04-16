import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import stu1 from '../../images/stu1.png'
import stu2 from '../../images/stu2.png'
import stu3 from '../../images/stu3.png'
import stu4 from '../../images/stu4.png'
import stu5 from '../../images/stu5.jpg'
import stu6 from '../../images/stu6.jpg'
import stu7 from '../../images/stu7.jpg'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { GlobalStyles } from '../../utils/globalStyles'

const BrightStudent = () => {



    const listOfStudents = [
        {
            name: "SHAHZEB ARSLAN",
            age: "9 Year Old",
            image: stu1
        },
        {
            name: "ANIKA",
            age: "15 Year Old",
            image: stu2
        },
        {
            name: "IVAN CHAN",
            age: "16 Year Old",
            image: stu3
        },
        {
            name: "SUMAYA",
            age: "12 Year Old",
            image: stu4
        },
        {
            name: "SUMAYA",
            age: "12 Year Old",
            image: stu5
        },
        {
            name: "SAMUEL",
            age: "12 Year Old",
            image: stu6
        },
        {
            name: "NICOLE",
            age: "12 Year Old",
            image: stu7
        },
    ]


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={[{ paddingHorizontal: 20 }, GlobalStyles.headerStyles]}>
                        <Text style={GlobalStyles.headerTextStyle}>Success Stories</Text>
                    </View>
                    <View style={{ padding: 20, gap: 30 }}>
                        {listOfStudents.map((elem, index) => (
                            <View style={styles.card} key={index}>
                                <View style={styles.imagcont}>
                                    <Image resizeMode='contain' style={styles.pic} source={elem.image} />
                                </View>
                                <View style={{ gap: 5 }}>
                                    <Text style={[styles.text]}>{elem.name}</Text>
                                    <Text style={[styles.text]}>{elem.age}</Text>
                                    <Text style={[styles.text, { color: Color.primary }]}>Bright student</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default BrightStudent

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 20
    },
    pic: {
        width: '90%',
        height: '90%',
    },
    imagcont: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: Color.text,
        overflow: 'hidden'
    },
    text: {
        color: Color.text,
        fontSize: FontSizes.lg,
        fontFamily: FontFamily.interSemiBold
    }
})