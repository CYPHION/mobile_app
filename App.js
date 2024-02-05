import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Provider } from "react-redux";
import CustomButton from "./src/components/base/CustomButton";
import CustomDatePicker from "./src/components/base/CustomDatePicker";
import MyModal from "./src/components/base/MyModal";
import DropdownComponent from "./src/components/base/customDropDown";
import AccordionScreen from "./src/screens/AccordionScreen";
import ButtonsScreen from "./src/screens/ButtonsScreen";
import FontScreen from "./src/screens/FontScreen";
import InputScreen from "./src/screens/InputScreen";
import IntroSlider from "./src/screens/IntroSlider";
import { store } from "./src/store";
import { Color } from "./src/utils/colorPalette";
import { FontFamily } from "./src/utils/fontFamilies";
import { FontSizes } from "./src/utils/fontSizes";

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


const App = () => {
  const [option, setOption] = useState("");
  const [opneDatePicker, setOpneDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const [showApp, setShowapp] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDone = () => {
    toggleModal()
    alert("log out");
  };

  const renderItem = () => {
    if (showApp) {
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
      );
    } else {
      return <IntroSlider setShowapp={setShowapp} />
    }
  }

  return (
    <Provider store={store}>
      {renderItem()}
    </Provider>
  )

};

export default App;

const styles = StyleSheet.create({
  dateText: { fontSize: FontSizes.xl, fontFamily: FontFamily.light }
});
