import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Icon from "react-native-vector-icons/Ionicons";
import CustomIcon from '../../components/base/CustumIcon'
import DropdownComponent from '../../components/base/CustomDropDown';
import { screenDimensions } from '../../utils/functions';
import { FontFamily, FontSizes } from '../../utils/font';
import { Color } from '../../utils/color';

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
        <Image source={item.image} style={styles.image} />
        <Text style={styles.nameText} >{item.name}</Text>
        <Text style={styles.dateText} >{item.date}</Text>
    </View>
);

const Profile = () => {
    const [option, setOption] = useState("");
    return (
        <>
            <View style={styles.profileContainer}>
                <View style={styles.ChilderRow}>
                    <View>
                        <Text style={styles.NameText}>Hi, Hamza</Text>
                        <Text style={styles.CompText}>Welcome to Prime Tuition</Text>
                    </View>

                    <View>
                        <Icon name="notifications-outline" size={FontSizes.xxxl} />
                    </View>
                </View>

                <View style={styles.ChilderRow}>
                    <View>
                        <Text>Enrolled Children (3)</Text>
                    </View>
                    <TouchableOpacity>
                        <Text>see all</Text>
                    </TouchableOpacity>

                </View>



                <FlatList
                    data={Data}
                    horizontal
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.flatListContainer}
                />


                <View style={styles.feesContainers}>
                    <View style={styles.profileRowContainer}>
                        <View>
                            <Text style={styles.fessYears}>Fee Paid Per Month</Text>
                        </View>

                        <View>
                            <DropdownComponent
                                dropdownStyle={{ width: screenDimensions.width * 0.2 }}
                                disable={false}
                                data={data}
                                placeHolderText={"2024"}
                                value={option}
                                setValue={setOption}
                            />
                        </View>
                    </View>

                </View>


                <View style={{ backgroundColor: 'red', width: 370, height: 250 }}>
                    <Text style={{ color: 'white' }}>Map Area</Text>
                </View>
            </View>
        </>
    )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer: {
        paddingHorizontal: 10,
        paddingVertical: 20
    },
    ChilderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    profileRowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    flatListContainer: {
        paddingHorizontal: 16, // Adjust as needed
    },
    item: {
        marginHorizontal: 8, // Adjust as needed
        textAlign: 'center',
        justifyContent: 'center'
    },
    nameText: {
        textAlign: 'center'
    },
    dateText: {
        textAlign: 'center'
    },
    image: {
        width: 100, // Adjust as needed
        height: 100, // Adjust as needed
        borderRadius: 50, // Assuming it's a circular image
    },
    NameText: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.xxxl,
        color: Color.textThree,
    },
    CompText: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.md,
        color: Color.textThree,
    }
})