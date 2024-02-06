import React, { useState } from "react";
import {
  StyleSheet
} from "react-native";
import IntroSlider from "./src/screens/IntroSlider";
import Main from "./src/screens/Main";
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
  const [showApp, setShowapp] = useState(false);
  return showApp ? <Main /> : <IntroSlider setShowapp={setShowapp} />

};

export default App;

const styles = StyleSheet.create({
  dateText: { fontSize: FontSizes.xl, fontFamily: FontFamily.light }
});
