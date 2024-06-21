import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Color } from "../../utils/color";
import { FontSizes } from "../../utils/font";
import { screenDimensions } from "../../utils/functions";

const { fontScale } = screenDimensions;
export default function InputField(props) {
    const {
        label = "",
        inputStyle,
        inputMode,
        value = "",
        onChangeText,
        secureTextEntry,
        multiline,
        editable,
        error,
        required,
        labelStyle
    } = props;
    const [isPasswordVisible, setPasswordVisible] = useState(secureTextEntry);
    const [isFocus, setIsFocus] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };
    return (
        <>
            <View style={styles.container}>
                {label ? <Text
                    style={[

                        styles.label,
                        error
                            ? { color: Color.error }
                            : { color: Color.text },
                        { ...labelStyle },
                    ]}
                >
                    {`${label} ${required ? "(Required)" : ""}`}
                </Text> : null}
                <View style={styles.iconView}>
                    <TextInput
                        {...props}
                        editable={editable}
                        secureTextEntry={isPasswordVisible}
                        multiline={multiline}
                        value={value}
                        onChangeText={onChangeText}
                        inputMode={inputMode}
                        onFocus={() => setIsFocus(!isFocus)}
                        onBlur={() => setIsFocus(!isFocus)}
                        style={[
                            styles.inputField,
                            error
                                ? { borderColor: Color.error }
                                : { borderColor: Color.borderColor },
                            secureTextEntry && { paddingRight: 40 },
                            multiline && { height: screenDimensions.height * 0.2, textAlignVertical: "top" },
                            { ...inputStyle },
                        ]}
                    />
                    {secureTextEntry ? (
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={togglePasswordVisibility}
                        >
                            <Icon
                                name={isPasswordVisible ? "eye-off" : "eye"}
                                color={Color.black}
                                size={18}
                            />
                        </TouchableOpacity>
                    ) : (
                        ""
                    )}
                </View>
                {error && <Text style={[styles.error]}>{error}</Text>}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        // gap: 10,
    },
    inputField: {
        marginTop: 10,
        color: Color.text,
        height: fontScale * 40,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: fontScale * 8,
        paddingHorizontal: fontScale * 15,
        fontSize: FontSizes.md,
        lineHeight: fontScale * 20,
    },
    label: {
        fontSize: FontSizes.md,
        color: Color.text,
    },
    iconView: {
        position: "relative",
    },
    icon: {
        height: fontScale * 40,
        justifyContent: "center",
        position: "absolute",
        right: 10,
        bottom: 0,
        padding: 5,
        borderRadius: 4,
    },
    error: {
        marginTop: 4,
        color: Color.error,
    },
});
