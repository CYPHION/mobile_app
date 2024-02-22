import React from "react";
import {
    StyleSheet,
    View
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { Color } from "../../utils/color";
import { FontFamily, FontSizes } from "../../utils/font";
import { GlobalStyles } from "../../utils/globalStyles";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)


const AccordionSkeleton = () => {


    return (
        <View style={styles.accordionItem}>

            <View
                style={[styles.accordionHeader, GlobalStyles.p_10,]}
            >
                <View>
                    <ShimmerPlaceholder style={styles.accordionTitle} />
                    <ShimmerPlaceholder style={styles.accordionTitleHeading} />
                    <ShimmerPlaceholder style={styles.accordionTitle} />
                </View>

                <ShimmerPlaceholder style={styles.Iconwidth} />
            </View>
        </View>
    );
};

export default AccordionSkeleton;

const styles = StyleSheet.create({
    accordionItem: {
        borderRadius: 10,
        backgroundColor: Color.grayBackground,
        marginVertical: 5,
    },
    Iconwidth: {
        width: 40
    },
    accordionHeader: {
        borderColor: Color.borderColorTwo,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    accordionTitle: {
        color: Color.primary,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.sm,
        marginBottom: 3,
        width: 120
    },
    rotateIcon: {
        paddingEnd: 4,
        transform: [{ rotate: "0deg" }] /* Initial icon rotation */,
        transition: "transform 0.4s ease-in-out" /* Smooth animation */,
    },
    accordionContent: {
        gap: 5,
    },
    accordionTitleHeading: {
        color: Color.textThree,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.xxl,
        marginBottom: 5,
        width: 120
    },
    contentView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    contentItem: {
        fontSize: FontSizes.sm,
        color: Color.textThree,
    },
});
