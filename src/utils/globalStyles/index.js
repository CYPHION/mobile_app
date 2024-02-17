import { StyleSheet } from "react-native";
import { Color } from "../color";
import { FontFamily, FontSizes } from "../font";

export const GlobalStyles = StyleSheet.create({
    contentView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentItem: {
        fontSize: FontSizes.sm,
        color: Color.textThree,
    },
    p_10: {
        padding: 10
    },
    r_10: {
        borderRadius: 10
    },
    headerStyles: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        fontSize: FontSizes.xl,
        color: Color.text,
        fontFamily: FontFamily.medium,
        backgroundColor: Color.grayBackground,
    },
    headerTextStyle: {
        fontSize: FontSizes.md,
        color: Color.text,
        fontFamily: FontFamily.medium
    }
})