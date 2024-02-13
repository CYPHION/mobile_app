import CheckBox from '@react-native-community/checkbox';
import React from 'react';
import { StyleSheet } from 'react-native';
const MyCheckBox = (props) => {
    const { isChecked, onToggle } = props

    return (
        <>
            <CheckBox
                //android props
                disabled={false}
                value={isChecked}
                onValueChange={onToggle}
                tintColors={{ true: 'gray', false: 'gray' }}

                //ios props
                boxType={'square'}
                onCheckColor='black'  // 	The color of the check mark when it is On. Defaults to '#007aff'
                hideBox={false}  // Control if the box should be hidden or not. Defaults to false
                onTintColor='black'  // The color of the line around the box when it is On. Defaults to '#007aff'
                tintColor='Blue'  //The color of the box when the checkbox is Off. Defaults to '#aaaaaa'
                onAnimationType={'fill'}  //'stroke' or 'fill' or 'bounce' or 'flat' or 'one-stroke' or 'fade'
                offAnimationType={'fill'}  //'stroke' or 'fill' or 'bounce' or 'flat' or 'one-stroke' or 'fade'
                onFillColor='black'  //The color of the inside of the box when it is On. Defaults to transparent
            />
        </>
    )
}

export default MyCheckBox

const styles = StyleSheet.create({})