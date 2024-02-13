import { StyleSheet } from "react-native";
import { Color } from "../color";
import { FontSizes } from "../font";

export const GlobalStyles = StyleSheet.create({
    contentView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentItem: {
        fontSize: FontSizes.sm,
        color: Color.textThree,
    },
})