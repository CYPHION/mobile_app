import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)



const renderItem = ({ item }) => {

    return (
        <View style={styles.item}>
            <ShimmerPlaceholder style={styles.image} />
            <ShimmerPlaceholder style={[styles.nameText]} />
            <ShimmerPlaceholder style={[styles.nameText]} />
        </View >
    )
};

const HomeSkeleton = ({ navigation }) => {


    return (
        <>
            {/* <LoadingScreen loading={loading} /> */}
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.NameText, styles.textFontFamily]} />
                            <ShimmerPlaceholder style={[styles.CompText, styles.textFontFamily]} />
                        </View>

                        <ShimmerPlaceholder style={[styles.NameNot]} />


                    </View>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.CompText]} />
                        </View>

                        <ShimmerPlaceholder style={[styles.CompText]} />

                    </View>
                    <View>
                        <FlatList

                            renderItem={renderItem}
                            horizontal
                            data={[1, 2, 3]}

                        />
                    </View>

                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <ShimmerPlaceholder style={[styles.CompText]} />
                        <View>
                            <ShimmerPlaceholder style={[styles.DropDown]} />
                        </View>

                    </View>

                    <View style={styles.GraphContainer} >
                        <ShimmerPlaceholder style={styles.GraphContainers} >

                        </ShimmerPlaceholder>
                    </View>
                </View>


            </ScrollView>
        </>
    )
}

export default HomeSkeleton

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: Color.white
    },
    profileRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        marginHorizontal: 8,
        textAlign: 'center',
        justifyContent: 'center'
    },
    nameText: {
        fontSize: FontSizes.md,
        textAlign: 'center',
        color: Color.text,
        marginTop: 3,
        borderRadius: 8,
        width: 100,
        backgroundColor: Color.error
    },
    image: {
        backgroundColor: Color.error,
        width: screenDimensions.width * 0.25,
        height: screenDimensions.width * 0.25,
        borderRadius: screenDimensions.width * 0.25 * 0.5,
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
        borderRadius: 8,
        width: 50,
        marginBottom: 5,
        backgroundColor: Color.error
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.textThree,
        borderRadius: 8,
        width: 150,
        height: 25,
        backgroundColor: Color.error
    },
    badge: {
        height: 10,
        width: 10,
        backgroundColor: Color.black,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 2,
        zIndex: 100
    },
    GraphContainer: {
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    GraphContainers: {
        borderRadius: 8,
        width: 350,
        height: 300,
        backgroundColor: Color.error,
    },
    DropDown: {
        width: 95,
        height: 35,
        backgroundColor: Color.error,
    },
    NameNot: {
        height: 30,
        width: 60,
    }
})