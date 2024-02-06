import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useSelector } from "react-redux";
import CustomButton from "../components/base/CustomButton";
import CustomDatePicker from "../components/base/CustomDatePicker";
import MyModal from "../components/base/MyModal";
import DropdownComponent from "../components/base/customDropDown";
import { API } from "../network/API";
import { Color } from "../utils/colorPalette";
import { FontFamily } from "../utils/fontFamilies";
import { FontSizes } from "../utils/fontSizes";
import { customToast } from "../utils/functions";
import AccordionScreen from "./AccordionScreen";
import ButtonsScreen from "./ButtonsScreen";
import FontScreen from "./FontScreen";
import InputScreen from "./InputScreen";


const data = [
    { name: "Item 1", value: "1" },
    { name: "Item 2", value: "2" },
    { name: "Item 3", value: "3" },
    { name: "Item 4", value: "4" },
    { name: "Item 5", value: "5" },
    { name: "Item 6", value: "6" },
    { name: "Item 7", value: "7" },
    { name: "Item 8", value: "8" },
];


const Main = () => {
    const [option, setOption] = useState("");
    const [opneDatePicker, setOpneDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    console.log('hello')
    const globalData = useSelector(state => state?.global?.data)
    console.log('data--->', globalData)
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleDone = () => {
        toggleModal()
        alert("log out");
    };

    useEffect(() => {
        API.getGlobalData()
            .then(res => console.log(res))
            .catch(err => customToast('error', err))
    }, [])
    return (
        <SafeAreaView>
            <ScrollView>
                <CustomDatePicker onToggle={() => setOpneDatePicker(!opneDatePicker)} isVisible={opneDatePicker} setSelectedDate={setSelectedDate} />
                <MyModal
                    handleDone={handleDone}
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    doneBtnLabel={"Log Out"}
                    heading={"Log Out?"}
                    cancelBtnLabel={"cancel"}
                    label={
                        "Are you sure you want to logout?"
                    }
                />

                <View
                    style={{ backgroundColor: Color.white, flex: 1, paddingHorizontal: 10 }}
                >
                    <Icon name="home" size={30} color={Color.primary} />
                    <DropdownComponent
                        disable={false}
                        data={data}
                        placeHolderText={"Parent"}
                        value={option}
                        setValue={setOption}
                    />
                    <View>
                        <InputScreen />
                    </View>
                    <View>
                        <AccordionScreen />
                    </View>
                    <CustomButton title="Open Modal" btnstyle={{ backgroundColor: Color.white }} textStyle={{ color: Color.primary }} onPress={toggleModal} />
                    <CustomButton title="Open Date Picker" onPress={() => setOpneDatePicker(true)} />
                    <Text style={styles.dateText}>Start date: {selectedDate.startDate}</Text>
                    <Text style={styles.dateText}>End date: {selectedDate.endDate}</Text>
                    <View>
                        <FontScreen />
                    </View>
                    <View>
                        <ButtonsScreen />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Main


const styles = StyleSheet.create({
    dateText: { fontSize: FontSizes.xl, fontFamily: FontFamily.light }
});
