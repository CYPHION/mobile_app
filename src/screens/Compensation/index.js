import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import CustomAppBar from '../../components/base/CustomAppBar'
import CustomButton from '../../components/base/CustomButton'
import MissedLesson from '../../components/widget/MissedLesson'
import ViewCompensation from '../../components/widget/ViewCompensation'
import { Color } from '../../utils/color'
import { FontFamily, FontSizes } from '../../utils/font'
import { screenDimensions } from '../../utils/functions'

const Compensation = () => {
    const [active, setActive] = useState(true)

    return (
        <View>
            <CustomAppBar title='Compensation' />
            <View style={[styles.main]}>
                <ScrollView>
                    <View style={[styles.tabBtn]}>
                        <CustomButton
                            title='Missed Lesson'
                            btnstyle={styles.btnStyle}
                            variant={active ? 'fill' : ''}
                            onPress={() => {
                                setActive(prev => !prev)
                            }}
                        />
                        <CustomButton
                            btnstyle={styles.btnStyle}
                            title='Compensation Status'
                            variant={active ? '' : 'fill'}
                            onPress={() => {
                                setActive(prev => !prev)
                            }}
                        />
                    </View>
                    <View style={styles.body}>
                        {active ? <MissedLesson /> : <ViewCompensation />}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

export default Compensation


const styles = StyleSheet.create({
    main: {
        backgroundColor: Color.white,
    },
    tabBtn: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnStyle: {
        width: screenDimensions.width * 0.47,
    },

    textHeading: {
        color: Color.text,
        fontFamily: FontFamily.interBold,
        fontSize: FontSizes.xl
    },
    para: {
        color: Color.textThree,
        fontSize: FontSizes.md,
        fontFamily: FontFamily.interRegular
    },
    absoluteBtnView: {
        position: 'absolute',
        bottom: screenDimensions.height * 0.01,
        left: 0,
        right: 0,
        zIndex: 10,
        width: screenDimensions.width,
        alignItems: 'center'
    },
    absoluteBtn: {
        width: '90%',
    },

})