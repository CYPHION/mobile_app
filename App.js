import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "./src/components/base/CustomButton";
import FlaotingTextInput from "./src/components/base/FlaotingTextInput";
import InputField from "./src/components/base/InputField";
import MyModal from "./src/components/base/MyModal";
import DropdownComponent from "./src/components/base/customDropDown";
import { Color } from "./src/utils/colorPalette";
import { FontFamily } from "./src/utils/fontFamilies";
import { FontSizes } from "./src/utils/fontSizes";
import { screenDimensions } from "./src/utils/helperFunctions";

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
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("");
  const [userName, setUserName] = useState("");
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDone = () => {
    console.log("log out");
  };

  return (
    <ScrollView>
      <MyModal
        handleDone={handleDone}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        doneBtnLabel={"Log Out"}
        heading={"Log Out?"}
        cancelBtnLabel={"cancel"}
        label={
          "Are fasfasasfsafsaf afastf ag agga hhe yhr aasfgagyhh gdsgasdgsdgasgsg you sure you want to logout?"
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
        <DropdownComponent
          dropdownStyle={{ width: screenDimensions.width * 0.2 }}
          disable={false}
          data={data}
          placeHolderText={"Parent"}
          value={option}
          setValue={setOption}
        />
        <InputField
          secureTextEntry={true}
          onChangeText={(text) => setValue(text)}
          value={value}
          label={"Password"}
          labelStyle={{ color: Color.black }}
          inputStyle={{ paddingRight: 40 }}
          error={"Password is Required"}
        />
        <Text>{option && option}</Text>

        <InputField
          label={"Username"}
          labelStyle={{ color: Color.black }}
          inputMode={"numeric"}
        />
        <InputField
          multiline
          required
          onChangeText={(text) => setValue(text)}
          value={value}
          label={"Password"}
          labelStyle={{ color: Color.black }}
          inputStyle={{
            height: screenDimensions.height * 0.2,
            textAlignVertical: "top",
          }}
          error={"Password is Required"}
        />
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{ color: Color.black }}>Show Modal</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.bold,
          }}
        >
          BOLD
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.light,
          }}
        >
          light
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.medium,
          }}
        >
          medium
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.regular,
          }}
        >
          regular
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.semiBold,
          }}
        >
          semiBold
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.interBold,
          }}
        >
          interBold
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.interLight,
          }}
        >
          interLight
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.interMedium,
          }}
        >
          interMedium
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.interRegular,
          }}
        >
          interRegular
        </Text>
        <Text
          style={{
            fontSize: FontSizes.lg,
            color: Color.text,
            fontFamily: FontFamily.interSemiBold,
          }}
        >
          interSemiBold
        </Text>

        <FlaotingTextInput
          color={Color.black}
          onChangeText={handleInputChange}
          value={inputValue}
          password={true}
          label={"Password"}
        />
        <FlaotingTextInput
          color={Color.black}
          value={userName}
          onChangeText={(e) => setUserName(e)}
          type={"text"}
          label={"username/email"}
        />
        <CustomButton
          disabled={true}
          title={"click me"}
          onPress={() => console.log("cliked")}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ width: "50%" }}>
            <CustomButton
              disabled={false}
              title={"click me"}
              onPress={() => console.log("cliked")}
            />
          </View>
          <View style={{ width: "50%" }}>
            <CustomButton
              disabled={false}
              title={"click me"}
              onPress={() => console.log("cliked")}
            />
          </View>
        </View>
        <CustomButton
          color={Color.primary}
          btnstyle={{ backgroundColor: Color.white }}
          title={"click me"}
          onPress={() => console.log("cliked")}
        />
        <CustomButton
          disabled={true}
          btnstyle={{ width: 150, padding: 5 }}
          title={"click me"}
          onPress={() => console.log("cliked")}
        />
      </View>
    </ScrollView>
  );
};

export default App;

const styles = StyleSheet.create({});
