import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import DropdownComponent from '../../components/base/CustomDropDown';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';

const data = [
    { name: "2024", value: "1" },
    { name: "2023", value: "2" },
    { name: " 2022", value: "3" },
    { name: "2021", value: "4" },
    { name: "2020", value: "5" },
    { name: "2019 ", value: "6" },
    { name: "2018 ", value: "7" },
    { name: "2017 ", value: "8" },
];

const Data = [
    {
        image: require("../../images/hamza.png"),
        name: "Abdullah",
        date: "Year 2 - Weekly"
    },
    {
        image: require("../../images/hamza.png"),
        name: "Abdullah",
        date: "Year 2 - Weekly"
    },
    {
        image: require("../../images/hamza.png"),
        name: "Abdullah",
        date: "Year 2 - Weekly"
    },
    {
        image: require("../../images/hamza.png"),
        name: "Abdullah",
        date: "Year 2 - Weekly"
    },
    {
        image: require("../../images/hamza.png"),
        name: "Abdullah",
        date: "Year 2 - Weekly"
    },

]


const renderItem = ({ item }) => (
    <View style={styles.item}>
        <Image resizeMode='contain' source={item.image} style={styles.image} />
        <Text style={[styles.nameText, { fontFamily: FontFamily.interSemiBold }]} >{item.name}</Text>
        <Text style={[styles.nameText, { fontFamily: FontFamily.interRegular, fontSize: FontSizes.sm }]} >{item.date}</Text>
    </View>
);

const Home = ({ navigation }) => {
    const [option, setOption] = useState("");
    return (
        <ScrollView>
            <View style={styles.profileContainer}>
                <View style={[styles.profileRowContainer]}>
                    <View>
                        <Text style={[styles.NameText, styles.textFontFamily]}>Hi, Hamza</Text>
                        <Text style={[styles.CompText, styles.textFontFamily]}>Welcome to Prime Tuition</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                        <View style={styles.badge}></View>
                        <Icon name="notifications-outline" size={FontSizes.xxxl} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.profileRowContainer]}>
                    <View>
                        <Text style={[styles.CompText]}>Enrolled Children (3)</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={[styles.CompText]}>see all</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    data={Data}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                />
                <View style={styles.profileRowContainer}>
                    <Text style={[styles.CompText]}>Fee Paid Per Month</Text>
                    <DropdownComponent
                        dropdownStyle={{ width: screenDimensions.width * 0.2 }}
                        disable={false}
                        data={data}
                        placeHolderText={"2024"}
                        value={option}
                        setValue={setOption}
                    />
                </View>
                <View style={{ backgroundColor: 'red', width: 370, height: 250 }}>
                    <Text style={{ color: 'white' }}>Map Area</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Home

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 10,
        backgroundColor: Color.white
    },
    profileRowContainer: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatListContainer: {
        // paddingHorizontal: 16, 
    },
    item: {
        marginHorizontal: 8,
        textAlign: 'center',
        justifyContent: 'center'
    },
    nameText: {
        fontSize: FontSizes.md,
        textAlign: 'center'
    },
    image: {
        backgroundColor: Color.grayBackground,
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
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.textThree,
    },
    badge: {
        height: 10,
        width: 10,
        backgroundColor: Color.black,
        borderRadius: 5,
        position: 'absolute',
        top: 0,
        right: 2
    }
})