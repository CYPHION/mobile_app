import React, { useRef } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Or your preferred icon library
import { Color } from '../../utils/colorPalette';
import { FontFamily } from '../../utils/fontFamilies';
import { FontSizes } from '../../utils/fontSizes';

const AccordionItem = ({ total, data, expanded, onToggle, date, studentName }) => {
    const iconRotation = useRef(new Animated.Value(1)).current; // Initialize icon animation state

    // Handle icon rotation animation on expansion/collapse
    const rotateIcon = () => {
        Animated.timing(iconRotation, {
            toValue: expanded ? 1 : 0, // Use 1 for 180 degrees rotation, 0 for 0 degrees
            duration: 200,
            useNativeDriver: true, // For smoother animations
        }).start();
    };

    return (
        <View style={styles.accordionItem}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => { onToggle(); rotateIcon(); }}>
                <View style={[styles.accordionHeader, expanded && { borderBottomWidth: 1 }]}>
                    <View>
                        <Text style={styles.accordionTitle}>{date}</Text>
                        <Text style={styles.accordionTitleHeading}>{total}</Text>
                        <Text style={styles.accordionTitle}>{studentName}</Text>
                    </View>
                    <Animated.View
                        style={[
                            styles.rotateIcon,
                            {
                                transform: [
                                    {
                                        rotate: iconRotation.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['180deg', '0deg'],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Icon name="angle-down" size={20} color={Color.black} />
                    </Animated.View>
                </View>
            </TouchableOpacity>
            {expanded && (
                <View style={styles.accordionContent}>
                    {data?.map((elem, index) => (
                        <View key={index} style={styles.contentView}>
                            <Text style={[styles.contentItem]}>{elem.name}</Text>
                            <Text style={[styles.contentItem]}>{elem.value}</Text>

                        </View>
                    ))}
                </View>
            )}
        </View>
    );
};

export default AccordionItem;

const styles = StyleSheet.create({
    accordionItem: {
        borderRadius: 10,
        backgroundColor: Color.grayBackground,
        marginVertical: 5,
    },
    accordionHeader: {
        padding: 10,
        borderColor: Color.borderColorTwo,
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    accordionTitle: {
        color: Color.primary,
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.sm,
    },
    rotateIcon: {
        paddingEnd: 4,
        transform: [{ rotate: '0deg' }], /* Initial icon rotation */
        transition: 'transform 0.4s ease-in-out', /* Smooth animation */
    },
    accordionContent: {
        gap: 5,
        padding: 10,

    },
    accordionTitleHeading: {
        color: Color.textThree,
        fontFamily: FontFamily.interMedium,
        fontSize: FontSizes.xl
    },
    contentView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentItem: {
        fontSize: FontSizes.sm,
        color: Color.textThree
    }
});
