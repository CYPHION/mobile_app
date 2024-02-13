import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Color } from "../../utils/color";
import { FontSizes } from "../../utils/font";
import { screenDimensions } from "../../utils/functions";

const DropdownComponent = (props) => {
    const {
        data,
        placeHolderText,
        label,
        value,
        setValue,
        disable,
        dropdownStyle,
        search = false
    } = props;
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text
                    style={[
                        styles.label,
                        isFocus || value ? { color: Color.primary } : { color: Color.text },
                    ]}
                >
                    {label}
                </Text>
            );
        }
        return null;
    };

    return (
        <View style={styles.container}>
            {/* {renderLabel()} */}
            <Dropdown
                {...props}
                disable={disable}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.itemsContainer}
                style={[
                    styles.dropdown,
                    { ...dropdownStyle },
                    isFocus || value
                        ? { borderColor: Color.primary }
                        : { borderColor: Color.borderColor },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[styles.selectedTextStyle]}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search={search}
                maxHeight={screenDimensions.height * 0.3}
                labelField="name"
                valueField="value"
                placeholder={!isFocus ? placeHolderText : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                }}
            // renderLeftIcon={() => (
            //     <Icon
            //         style={styles.icon}
            //         color={isFocus ? 'blue' : 'black'}
            //         name="Safety"
            //         size={20}
            //     />
            // )}
            />
        </View>
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    dropdown: {
        height: screenDimensions.fontScale * 40,
        borderColor: Color.borderColor,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        backgroundColor: Color.white,
        color: Color.textThree,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: "absolute",
        backgroundColor: "white",
        left: 10,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: FontSizes.sm,
    },
    placeholderStyle: {
        fontSize: FontSizes.md,
        color: Color.textThree,
    },
    selectedTextStyle: {
        fontSize: FontSizes.md,
        color: Color.textThree,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: screenDimensions.fontScale * 40,
        fontSize: FontSizes.md,
    },
    itemsContainer: {
        borderRadius: 8,
        marginTop: 5,
    },
    itemTextStyle: {
        fontSize: FontSizes.sm,
        color: Color.textThree,
    },
});
