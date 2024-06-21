import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DatePicker from "react-native-date-picker";
import { Color } from "../../utils/color";
import { FontFamily, FontSizes } from "../../utils/font";
import { formattedDate, screenDimensions } from "../../utils/functions";
import { GlobalStyles } from "../../utils/globalStyles";
import CustomButton from "./CustomButton";

const DatePickerSingle = (props) => {

    const { isVisible, onToggle, Children, onDone, required, value } = props;
    const [startDate, setStartDate] = useState(new Date());

    const handleDateChange = (selectedDate) => {
        setStartDate(selectedDate)
    };

    const renderDateSelector = () => (
        <TouchableOpacity
            activeOpacity={0.7}
            // onPress={() => setSelectedDateType(type)}
            style={[
                styles.datePicker,
                { backgroundColor: Color.primary }

            ]}
        >
            <Text
                style={[
                    styles.date,
                    { color: Color.pureWhite }
                ]}
            >
                {"Date"}
            </Text>
            <Text
                style={[
                    styles.date,
                    { color: Color.pureWhite }
                ]}
            >
                {formattedDate(
                    startDate,
                    "dd-MM-yyyy"
                )}
            </Text>
        </TouchableOpacity>
    );

    // useEffect(() => {
    //     setSelectedDate({
    //         startDate: formattedDate(startDate, "MMM dd yyyy"),
    //         endDate: formattedDate(endDate, "MMM dd yyyy"),
    //     });
    // }, []);

    return (
        <>
            <View style={styles.container}>
                <Modal
                    transparent={true}
                    animationType="fade"
                    visible={isVisible}
                    onRequestClose={onToggle}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <View style={styles.dateSelectors}>
                                {renderDateSelector()}
                            </View>
                            <View style={{ transform: [{ scale: 0.8 }] }}>
                                <DatePicker
                                    style={{ height: 120, marginVertical: 10 }}
                                    textColor={Color.textThree}
                                    mode="date"
                                    date={startDate}
                                    onDateChange={(date) => handleDateChange(date)}
                                />
                            </View>
                            <View style={[styles.btnView, GlobalStyles.p_10]}>
                                <CustomButton
                                    textStyle={{ fontSize: FontSizes.md }}
                                    color={Color.primary}
                                    title={"Cancel"}
                                    btnstyle={{
                                        paddingVertical: 2,
                                        backgroundColor: Color.white,
                                        color: Color.primary,
                                    }}
                                    onPress={onToggle}
                                />
                                <CustomButton
                                    textStyle={{ fontSize: FontSizes.md }}
                                    title={"Select"}
                                    variant={'fill'}
                                    btnstyle={{ paddingVertical: 2 }}
                                    onPress={() => {
                                        onDone(
                                            startDate
                                        )
                                        onToggle();
                                    }}
                                />
                            </View>
                        </View>
                        {/* Backdrop */}
                        <TouchableOpacity style={styles.backdrop} onPress={onToggle} />
                    </View>
                </Modal>
            </View>
        </>
    );
};

export default DatePickerSingle;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        width: screenDimensions.width * 0.9,
        alignItems: "center",
        backgroundColor: Color.pureWhite,
        borderRadius: 4,
        elevation: 5, // Shadow on Android
        zIndex: 1000,
    },
    backdrop: {
        position: "absolute",
        flex: 1,
        height: screenDimensions.height,
        width: screenDimensions.width,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    text: {
        fontSize: FontSizes.md,
        fontFamily: FontFamily.medium,
    },
    btnView: {
        width: "100%",
        justifyContent: "space-between",
        flexDirection: "row",
    },
    dateSelectors: {
        // backgroundColor: 'red',
        width: "100%",
    },
    datePicker: {
        paddingHorizontal: 15,
        paddingVertical: 6,
        backgroundColor: Color.primary,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    date: {
        fontFamily: FontFamily.semiBold,
        fontSize: FontSizes.md
    },

});
