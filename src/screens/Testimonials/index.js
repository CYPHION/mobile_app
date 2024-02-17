import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomButton from '../../components/base/CustomButton'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'


const Testimonials = () => {
    const navigation = useNavigation()
    const data = [
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition.  I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition.  I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition.  I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition.  I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition.  I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
        {
            name: 'Helena Moore',
            type: 'Parent',
            date: 'june 5,2024',
            message: 'My Son has Got an Exceptional GCSE Results range from 9 To 7 in all subjects with support of Prime Tuition.  I highly appreciate them and recommended prime tuition to other parents.To 7 in all subjects with support of Prime Tuition. Prime Tuition is proved to be excellent in teaching and resources they provide to my child. I highly appreciate them and recommended prime tuition to other parents.'
        },
    ]


    return (
        <View style={styles.main}>
            <CustomButton
                title='Write A Review'
                variant='fill'
                btnstyle={styles.btnStyle}
                leftIcon={<Icon name='pencil' color={Color.white} size={FontSizes.md} />}
                onPress={() => navigation.navigate('root', { screen: 'addTestimonial' })}
            />
            <ScrollView>
                <View style={{ zIndex: 1 }}>

                    <View style={[styles.bgColor, styles.container]}>
                        <Text style={styles.detailText}>Availible Reviews</Text>
                    </View>

                    <View style={{ padding: 10, gap: 15 }}>
                        {data.map((elem, index) => (
                            <View key={index} style={styles.card}>
                                <Text style={[styles.nameText]}>{elem.name}</Text>
                                <View style={{ flexDirection: 'row', gap: 6 }}>
                                    <Text style={styles.textTwo}>({elem.type})</Text>
                                    <Text style={styles.dateText}>{elem.date}</Text>
                                </View>
                                <Text style={styles.para}>{elem.message}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Testimonials

const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.white,
    },
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
    card: {
        backgroundColor: Color.grayBackground,
        padding: 10,
        borderRadius: 10,
    },
    nameText: {
        color: Color.text,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.lg
    },
    textTwo: {
        fontSize: FontSizes.md,
        color: Color.text,
        fontFamily: FontFamily.interMedium
    },
    dateText: {
        fontFamily: FontFamily.interRegular,
        color: Color.textThree,
        fontSize: FontSizes.md,
    },
    para: {
        fontFamily: FontFamily.interRegular,
        color: Color.textThree,
        fontSize: FontSizes.md,
        paddingVertical: 10
    },
    btnStyle: {
        width: 'auto',
        padding: 5,
        paddingHorizontal: 10,
        position: 'absolute',
        right: 10,
        bottom: screenDimensions.height * 0.02,
        zIndex: 2
    }
})