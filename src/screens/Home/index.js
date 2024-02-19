import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from 'react-redux';
import DropdownComponent from '../../components/base/CustomDropDown';
import Graph from '../../components/base/GraphComponent';
import LoadingScreen from '../../components/base/LoadingScreen';
import { API } from '../../network/API';
import { Color } from '../../utils/color';
import { FontFamily, FontSizes } from '../../utils/font';
import { getImage, screenDimensions } from '../../utils/functions';
import { GlobalStyles } from '../../utils/globalStyles';

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
    const src = item?.picture ? { uri: getImage(item?.picture) } : require("../../images/profile.png");

    return (<View style={styles.item}>
        <Image resizeMode='contain' source={src} style={styles.image} />
        <Text style={[styles.nameText, { fontFamily: FontFamily.interSemiBold }]} >{item.fullName}</Text>
        <Text style={[styles.nameText, { fontFamily: FontFamily.interRegular, fontSize: FontSizes.sm }]} >{item.StudentYear.name} - {item.feeChargedBy}</Text>
    </View>)
};

const Home = ({ navigation }) => {
    const [option, setOption] = useState("");
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const globaldata = useSelector(state => state?.global?.data)
    const user = useSelector(state => state?.user?.data)

    const getStudents = () => {
        API.getStudentByParentId(user?.id)
            .then(res => {
                setData(res?.data);  // Assuming `setData` is a state updating function
            })
            .catch(err => {
                customToast('error', err);
                console.log('cathc', err)
            })
            .finally(() => {
                setLoading(false)
                // Any code you want to run after the promise is settled (either resolved or rejected)
            });

    }

    useEffect(() => {
        getStudents();
    }, []);


    return (
        <>
            <LoadingScreen loading={loading} />
            <ScrollView>
                <View style={styles.profileContainer}>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <Text style={[styles.NameText, styles.textFontFamily]}>Hi, {user.firstName} {user.lastName}</Text>
                            <Text style={[styles.CompText, styles.textFontFamily]}>Welcome to Prime Tuition</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'notifications' })} style={{ position: 'relative' }}>
                            <View style={styles.badge}></View>
                            <Icon name="notifications-outline" size={FontSizes.xxxl} color={Color.black} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <View>
                            <Text style={[styles.CompText]}>Enrolled Children ({data.length})</Text>
                        </View>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('root', { screen: 'children' })}>
                            <Text style={[styles.CompText]}>see all</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={data}
                            horizontal
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            contentContainerStyle={styles.flatListContainer}
                        />
                    </View>
                    <View style={[styles.profileRowContainer, GlobalStyles.p_10]}>
                        <Text style={[styles.CompText]}>Fee Paid Per Month</Text>
                        <DropdownComponent
                            dropdownStyle={{ width: screenDimensions.width * 0.2 }}
                            disable={false}
                            data={dorp}
                            placeHolderText={"2024"}
                            value={option}
                            setValue={setOption}
                        />
                    </View>
                    <Graph labels={labels} dataOne={[12, 48, 56, 86, 98, 26, 89, 7, 36, 48, 10, 9]} dataTwo={[12, 48, 56, 86, 98, 26, 89, 7, 36, 48, 10, 9].reverse()} />
                </View>
            </ScrollView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    profileContainer: {
        // paddingHorizontal: 10,
        backgroundColor: Color.white
    },
    profileRowContainer: {
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
        backgroundColor: Color.disable,
        borderColor: Color.borderColor,
        borderWidth: 0.3,
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
        right: 2,
        zIndex: 100
    }
})