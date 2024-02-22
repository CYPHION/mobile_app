import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon, { default as NoHomework } from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector } from 'react-redux'
import CustomButton from '../../components/base/CustomButton'
import { API } from '../../network/API'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { formattedDate, screenDimensions } from '../../utils/functions'
import { GlobalStyles } from '../../utils/globalStyles'

const Testimonials = () => {
    const navigation = useNavigation()
    const [data, setData] = useState([])
    const user = useSelector(state => state?.user?.data)

    const route = useRoute();
    route.params


    const getData = () => {
        API.getAllTestimonial()
            .then((res) => setData(res.data))
            .catch((err) => console.log(err))

    }


    useEffect(() => {
        getData()
    }, [route.params])



    return (
        <SafeAreaView>
            <View style={[styles.main]}>
                {!(data.some((item) => item?.userId === user?.id)) && <View style={styles.absView}>
                    <CustomButton
                        title='Write A Review'
                        variant='fill'
                        btnstyle={styles.btnStyle}
                        leftIcon={<Icon name='pencil' color={Color.white} size={FontSizes.md} />}
                        onPress={() => navigation.navigate('root', { screen: 'addTestimonial' })}
                    />
                </View>}
                {data?.length > 0 ?
                    <ScrollView>

                        <View style={{ zIndex: 1 }}>


                            <View style={[GlobalStyles.p_10, { gap: 15 }]}>
                                {data.map((elem, index) => (
                                    <View key={index} style={[styles.card, GlobalStyles.p_10]}>
                                        <Text style={[styles.nameText]}>{elem?.User?.firstName} {elem?.User?.lastName}</Text>
                                        <View style={{ flexDirection: 'row', gap: 6 }}>
                                            <Text style={styles.textTwo}>({elem?.User?.type})</Text>
                                            <Text style={styles.dateText}>{formattedDate(elem.createdAt, 'yyyy dd,MMM')}</Text>
                                        </View>
                                        <Text style={styles.para}>{elem.review}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </ScrollView> :
                    <View style={{ justifyContent: 'center', alignItems: 'center', height: screenDimensions.height * 0.8 }}>
                        <View>
                            <NoHomework name='book-off-outline' size={screenDimensions.width * 0.5} color={Color.textTwo} />
                            <Text style={styles.inactivetext}>No Reviews found</Text>
                        </View>
                    </View>}
            </View>
        </SafeAreaView>
    )
}

export default Testimonials

const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.white,
        height: screenDimensions.height,
        width: screenDimensions.width,
    },
    card: {
        backgroundColor: Color.grayBackground,
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
    absView: {
        position: 'absolute',
        right: 10,
        bottom: screenDimensions.height * 0.15,
        zIndex: 2,
    },
    btnStyle: {
        width: 'auto',
        padding: 5,
        paddingHorizontal: 10,
    },
    inactivetext: {
        textAlign: 'center',
        color: Color.textTwo,
        fontSize: FontSizes.lg
    }
})