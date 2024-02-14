import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import { Color } from '../../utils/color';
import { FontSizes } from '../../utils/font';
import { screenDimensions } from '../../utils/functions';




const MultiSelectComponent = (prop) => {
    const {
        list = [],
        dropdownStyle = {},
        values = [],
        search = false,
        placeHolderText,
        label,
        setValues,
        disable,
        maxSelect
    } = prop

    const [isFocus, setIsFocus] = useState(false);


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label ? label : null}</Text>
            <MultiSelect
                disable={disable}
                style={[
                    styles.dropdown,
                    { ...dropdownStyle },
                    isFocus || values?.length > 0
                        ? { borderColor: Color.primary }
                        : { borderColor: Color.borderColor },
                ]}
                // visibleSelectedItem={false}
                maxSelect={maxSelect}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                itemTextStyle={styles.itemTextStyle}
                containerStyle={styles.itemsContainer}
                search={search}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                data={list}
                labelField="name"
                valueField="value"
                placeholder={placeHolderText ? placeHolderText : "Select"}
                searchPlaceholder="Search..."
                value={values}
                onChange={item => {
                    setValues(item);
                }}
                // renderLeftIcon={() => (
                //     <Icon
                //         style={styles.icon}
                //         color="black"
                //         name="Safety"
                //         size={20}
                //     />
                // )}
                selectedStyle={styles.selectedStyle}
            />
        </View>
    );
};

export default MultiSelectComponent;

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
    icon: {
        marginRight: 5,
    },
    selectedStyle: {
        borderRadius: 20,
        backgroundColor: Color.white
    },
    itemsContainer: {
        borderRadius: 8,
        marginTop: 5,
    },
    itemTextStyle: {
        fontSize: FontSizes.sm,
        color: Color.textThree,
    },
    label: {
        fontSize: FontSizes.md,
        color: Color.text
    },
});