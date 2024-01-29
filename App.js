import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from './src/components/base/CustomButton';
import FlaotingTextInput from './src/components/base/FlaotingTextInput';
import { Color } from './src/utils/colorPalette';
import { FontFamily } from './src/utils/fontFamilies';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [userName, setUserName] = useState('');
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  return (
    <ScrollView>
      <View style={{ backgroundColor: Color.black, flex: 1 }}>
        <Icon name="home" size={30} color="#900" onPress={() => console.log('icon')} />
        <Text style={{ fontSize: 14, color: Color.white, fontFamily: FontFamily.black }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.blackItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.bold }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.boldItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.extarBold }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.extraBoldItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.extraLight }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.extraLightItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.italic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.light }}>Hello My light</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.lightItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.medium }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.mediumItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.regular }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.semiBold }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.semiBoldItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.thin }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.thinItalic }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interBlack }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interBold }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interExtraBold }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interExtraLight }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interLight }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interMedium }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interRegular }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interSemiBold }}>Hello My app</Text>
        <Text style={{ fontSize: 24, color: Color.white, fontFamily: FontFamily.interThin }}>Hello My app</Text>

        <FlaotingTextInput onChangeText={handleInputChange}
          value={inputValue} password={true} label={'Password'} />
        <FlaotingTextInput value={userName} onChangeText={(e) => setUserName(e)} type={'text'} label={'username/email'} />
        <CustomButton disabled={true} title={'click me'} onPress={() => console.log('cliked')} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <CustomButton variant={'filled'} disabled={false} title={'click me'} onPress={() => console.log('cliked')} />
          </View>
          <View style={{ width: '50%' }}>
            <CustomButton disabled={false} title={'click me'} onPress={() => console.log('cliked')} />
          </View>
        </View>
        <CustomButton variant={'filled'} disabled={true} title={'click me'} onPress={() => console.log('cliked')} />
        <CustomButton variant={'filled'} width={150} padding={5} disabled={true} title={'click me'} onPress={() => console.log('cliked')} />
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({})