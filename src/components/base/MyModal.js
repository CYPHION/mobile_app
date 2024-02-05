import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Color } from "../../utils/colorPalette";
import { FontFamily } from "../../utils/fontFamilies";
import { FontSizes } from "../../utils/fontSizes";
import { screenDimensions } from "../../utils/helperFunctions";
import CustomButton from "./CustomButton";

const MyModal = (props) => {
    const {
        modalVisible,
        setModalVisible,
        heading,
        label,
        cancelBtnLabel,
        doneBtnLabel,
        handleDone,
    } = props;
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                animationType="fade"
                visible={modalVisible}
                onRequestClose={toggleModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text
                            style={[
                                styles.text,
                                {
                                    fontSize: FontSizes.lg,
                                    color: Color.text,
                                    fontFamily: FontFamily.medium,
                                },
                            ]}
                        >
                            {heading}
                        </Text>
                        <Text style={[styles.text]}>{label}</Text>
                        <View style={styles.btnView}>
                            <CustomButton
                                title={cancelBtnLabel}
                                btnstyle={{ paddingVertical: 4, backgroundColor: "#DDD" }}
                                onPress={toggleModal}
                            />
                            <CustomButton
                                title={doneBtnLabel}
                                variant={'fill'}
                                btnstyle={{ paddingVertical: 4 }}
                                onPress={handleDone}
                            />
                        </View>
                    </View>
                    {/* Backdrop */}
                    <TouchableOpacity style={styles.backdrop} onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
};

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
        width: screenDimensions.width * 0.8,
        alignItems: "center",
        backgroundColor: Color.pureWhite,
        padding: 25,
        borderRadius: 10,
        elevation: 5, // Shadow on Android
        zIndex: 1000,
    },
    backdrop: {
        position: "absolute",
        flex: 1,
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent black
    },
    text: {
        fontSize: FontSizes.md,
        color: Color.textTwo,
        fontFamily: FontFamily.medium,
    },
    btnView: {
        width: "100%",
        justifyContent: "space-between",
        // backgroundColor: 'red',
        flexDirection: "row",
    },
});

export default MyModal;
