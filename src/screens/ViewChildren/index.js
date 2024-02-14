import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSizes } from '../../utils/font'
import { Color } from '../../utils/color'
import StackIcon from "react-native-vector-icons/MaterialCommunityIcons";
import DetaiIcon from "react-native-vector-icons/MaterialIcons";
import CalendarIcon from "react-native-vector-icons/MaterialIcons";
import CardIcon from "react-native-vector-icons/AntDesign";
import CreditCardIcon from "react-native-vector-icons/MaterialCommunityIcons";
import BookIcon from "react-native-vector-icons/FontAwesome5";
import { ScrollView } from 'react-native-gesture-handler';

const ViewChildren = () => {


    const items = [
        {
            label: 'View Student Details',
            icon: <DetaiIcon name="insert-chart-outlined" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'View Shedule ',
            icon: <CalendarIcon name="calendar-month" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'View Attendace',
            icon: <CardIcon name="idcard" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'View Fees',
            icon: <CreditCardIcon name="credit-card-multiple-outline" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'Homework',
            icon: <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
        {
            label: 'Progress Report ',
            icon: <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />,
            path: ''
        },
    ]


    return (
        <ScrollView>

            <View style={styles.viewChildrenContainer}>
                <View>
                    <Text style={[styles.NameText, styles.textFontFamily]}>Abdullah Khan</Text>
                    <Text style={[styles.CompText, styles.textFontFamily]}>Year 2 - Weekly</Text>
                </View>

                <View style={{ backgroundColor: Color.primary, marginTop: 20, width: 370, height: 180, justifyContent: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: "black", fontSize: 20, }}>Map Area</Text>
                </View>

                <View style={{ gap: 30, marginTop: 10 }}>

                    {items.map((elem, index) => (
                        <TouchableOpacity key={index} activeOpacity={0.7}>
                            <View style={[styles.viewChildernStaclList, { paddingVertical: 10 }]}>
                                <View style={styles.viewChildernStaclList}>
                                    <View>
                                        {elem.icon}
                                    </View>
                                    <View>
                                        <Text style={styles.stackFont}>{elem.label}</Text>
                                    </View>
                                </View>
                                <View>
                                    <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}

                    {/* <TouchableOpacity>
                        <View style={styles.viewChildernStaclList}>
                            <View style={styles.viewChildernStaclList}>
                                <View>
                                    <CalendarIcon name="calendar-month" size={FontSizes.xl} color={Color.iconColor} />
                                </View>
                                <View>
                                    <Text style={styles.stackFont}>View Schedule</Text>
                                </View>
                            </View>
                            <View>
                                <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.viewChildernStaclList}>
                            <View style={styles.viewChildernStaclList}>
                                <View>
                                    <CardIcon name="idcard" size={FontSizes.xl} color={Color.iconColor} />
                                </View>
                                <View>
                                    <Text style={styles.stackFont}>View Attendance   </Text>
                                </View>
                            </View>
                            <View>
                                <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.viewChildernStaclList}>
                            <View style={styles.viewChildernStaclList}>
                                <View>
                                    <CreditCardIcon name="credit-card-multiple-outline" size={FontSizes.xl} color={Color.iconColor} />
                                </View>
                                <View>
                                    <Text style={styles.stackFont}>View Fees  </Text>
                                </View>
                            </View>
                            <View>
                                <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.viewChildernStaclList}>
                            <View style={styles.viewChildernStaclList}>
                                <View>
                                    <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />
                                </View>
                                <View>
                                    <Text style={styles.stackFont}>Homework  </Text>
                                </View>
                            </View>
                            <View>
                                <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View style={styles.viewChildernStaclList}>
                            <View style={styles.viewChildernStaclList}>
                                <View>
                                    <BookIcon name="book" size={FontSizes.xl} color={Color.iconColor} />
                                </View>
                                <View>
                                    <Text style={styles.stackFont}>Progress Report</Text>
                                </View>
                            </View>
                            <View>
                                <StackIcon name="greater-than" size={FontSizes.lg} color={Color.iconColor} />
                            </View>
                        </View>
                    </TouchableOpacity> */}
                </View>

            </View>

        </ScrollView>

    )
}

export default ViewChildren

const styles = StyleSheet.create({
    viewChildrenContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    textFontFamily: {
        fontFamily: FontFamily.interRegular,
    },
    NameText: {
        fontSize: FontSizes.xxl,
        color: Color.text,
    },
    CompText: {
        fontSize: FontSizes.md,
        color: Color.text,
    },
    viewChildernStaclList: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 20
    },
    stackFont: {
        fontFamily: FontFamily.regular,
        fontSize: FontSizes.lg,
        color: Color.textThree,
    }



})