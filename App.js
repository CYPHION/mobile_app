import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AccordionItem from "./src/components/base/Accordion";
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


  const [activeItem, setActiveItem] = useState(null); // Track the currently open item

  const toggleItem = (index) => {
    setActiveItem(activeItem === index ? null : index); // Toggle state based on click
  };



  const handleDone = () => {
    console.log("log out");
  };

  const items = [
    {
      date: "18 Jan - 20 Jan ",
      studentName: "Abdullah Khan (Weekly)",
      title: "£120",
      data: [
        { name: "Previous Dues", value: "£0" },
        { name: "Book dues", value: "£78" },
        { name: "Discount", value: "£10" },
        { name: "Paid Amount", value: "£89" },
      ],
    },
    {
      date: "17 feb - 23 Mar ",
      studentName: "Asad (Monthly)",
      title: "£250",
      data: [
        { name: "Previous Dues", value: "£8" },
        { name: "Book dues", value: "£158" },
        { name: "Discount", value: "£152" },
        { name: "Paid Amount", value: "£158" },
      ],
    },
    {
      date: "28 Mar - 30 Apr ",
      studentName: "Hammad  (Weekly)",
      title: "£1000",
      data: [
        { name: "Previous Dues", value: "£19" },
        { name: "Book dues", value: "£952" },
        { name: "Discount", value: "£185" },
        { name: "Paid Amount", value: "£78" },
      ],
    },
  ];

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
          inputStyle={{ paddingRight: 40 }}
        />
        <Text>{option && option}</Text>
        <View >
          {items.map((item, index) => (
            <AccordionItem
              key={index}
              date={item.date}
              studentName={item.studentName}
              total={item.title}
              data={item.data}
              expanded={activeItem === index}
              onToggle={() => toggleItem(index)} // Pass toggle function to each item
            />
          ))}
        </View>
        <InputField
          label={"Username"}
          inputMode={"numeric"}
        />
        <InputField
          multiline
          required
          onChangeText={(text) => setValue(text)}
          value={value}
          label={"Password"}
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
