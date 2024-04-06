import React, { useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)

const dorp = [
    { name: "2024", value: "1" },
    { name: "2023", value: "2" },
    { name: " 2022", value: "3" },
    { name: "2021", value: "4" },
    { name: "2020", value: "5" },
    { name: "2019 ", value: "6" },
    { name: "2018 ", value: "7" },
    { name: "2017 ", value: "8" },
];



const labels = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

const renderItem = ({ item }) => {

    return (
        <View style={styles.item}>
            <ShimmerPlaceholder style={styles.image} />
            <ShimmerPlaceholder style={[styles.nameText]} />
            <ShimmerPlaceholder style={[styles.nameText]} />
        </View >
    )
};

const Home = ({ navigation }) => {
    const [option, setOption] = useState("");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {/* <LoadingScreen loading={loading} /> */}
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.NameText, styles.textFontFamily]} />
                            <ShimmerPlaceholder style={[styles.CompText, styles.textFontFamily]} />
                        </View>
                        <TouchableOpacity activeOpacity={0.7} >
                            {/* <View style={styles.badge}></View> */}
                            <ShimmerPlaceholder style={[styles.NameNot]} />

                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <ShimmerPlaceholder style={[styles.CompText]} />
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'children' })}>
                            <ShimmerPlaceholder style={[styles.CompText]} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={[1, 2, 3]}
                            horizontal
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.flatListContainer}
                        />
                    </View>

                    {/* <ShimmerPlaceholder style={{ width: 150, height: 20 }} /> */}


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
        </SafeAreaView>
    )
}

export default Home

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
    },
    image: {
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
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.textThree,
        borderRadius: 8,
        width: 150,
        height: 25,
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
    },
    DropDown: {
        width: 95,
        height: 35,
    },
    NameNot: {
        height: 30,
        width: 60,
    }
})