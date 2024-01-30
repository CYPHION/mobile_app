import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomButton from './src/components/base/CustomButton';
import FlaotingTextInput from './src/components/base/FlaotingTextInput';
import InputField from './src/components/base/InputField';
import MyModal from './src/components/base/MyModal';
import { Color } from './src/utils/colorPalette';
import { FontFamily } from './src/utils/fontFamilies';
import { FontSizes } from './src/utils/fontSizes';
import { screenDimensions } from './src/utils/helperFunctions';
const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [value, setValue] = useState('')
  const [userName, setUserName] = useState('');
  const handleInputChange = (text) => {
    setInputValue(text);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleDone = () => {
    console.log('log out')
  }

  return (
    <ScrollView>
      <MyModal handleDone={handleDone} setModalVisible={setModalVisible} modalVisible={modalVisible} doneBtnLabel={'Log Out'} heading={'Log Out?'} cancelBtnLabel={'cancel'} label={'Are fasfasasfsafsaf afastf ag agga hhe yhr aasfgagyhh gdsgasdgsdgasgsg you sure you want to logout?'} />

      <View style={{ backgroundColor: Color.white, flex: 1, paddingHorizontal: 10 }}>
        <View style={{ flexDirection: 'row', height: 90, width: '100%' }}>
          <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center' }}>
            <Icon name="home" size={30} color={Color.primary} />
          </View>
          <View style={{ flex: 6 }}>
            <InputField
              value={userName}
              editable={false}
              label={'Password'}
              labelStyle={{ color: Color.black }}
              inputStyle={{ borderColor: Color.black, color: Color.black, width: '70%', borderColor: 'transparent' }}
              inputMode={'tel'}
            />
          </View>
          <View style={{ flex: 1, backgroundColor: 'green' }}>
            <Text>
              Edit
            </Text>
          </View>
        </View>
        <Icon name="home" size={30} color={Color.primary} />
        <InputField
          secureTextEntry={true}
          onChangeText={(text) => setValue(text)}
          value={value}
          label={'Password'}
          labelStyle={{ color: Color.black }}
          inputStyle={{ borderColor: Color.black, color: Color.black, paddingRight: 40, }}
        />
        <InputField
          label={'Username'}
          labelStyle={{ color: Color.black }}
          inputStyle={{ borderColor: Color.black, color: Color.black }}
          inputMode={'tel'}
        />
        <InputField
          multiline
          onChangeText={(text) => setValue(text)}
          value={value}
          label={'Password'}
          labelStyle={{ color: Color.black }}
          inputStyle={{ borderColor: Color.black, color: Color.black, height: screenDimensions.height * 0.2, textAlignVertical: 'top', }}
        />
        <TouchableOpacity onPress={toggleModal}>
          <Text style={{ color: Color.black }}>Show Modal</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.black }}>black</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.blackItalic }}>blackItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.bold }}>bold</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.boldItalic }}>boldItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.extarBold }}>extarBold</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.extraBoldItalic }}>extraBoldItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.extraLight }}>extraLight</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.extraLightItalic }}>extraLightItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.italic }}>italic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.light }}>light</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.lightItalic }}>lightItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.medium }}>medium</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.mediumItalic }}>mediumItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.regular }}>regular</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.semiBold }}>semiBold</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.semiBoldItalic }}>semiBoldItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.thin }}>thin</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.thinItalic }}>thinItalic</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interBlack }}>interBlack</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interBold }}>interBold</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interExtraBold }}>interExtraBold</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interExtraLight }}>interExtraLight</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interLight }}>interLight</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interMedium }}>interMedium</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interRegular }}>interRegular</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interSemiBold }}>interSemiBold</Text>
        <Text style={{ fontSize: FontSizes.lg, color: Color.text, fontFamily: FontFamily.interThin }}>interThin</Text>

        <FlaotingTextInput color={Color.black} onChangeText={handleInputChange}
          value={inputValue} password={true} label={'Password'} />
        <FlaotingTextInput color={Color.black} value={userName} onChangeText={(e) => setUserName(e)} type={'text'} label={'username/email'} />
        <CustomButton disabled={true} title={'click me'} onPress={() => console.log('cliked')} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
            <CustomButton disabled={false} title={'click me'} onPress={() => console.log('cliked')} />
          </View>
          <View style={{ width: '50%' }}>
            <CustomButton disabled={false} title={'click me'} onPress={() => console.log('cliked')} />
          </View>
        </View>
        <CustomButton color={Color.primary} btnstyle={{ backgroundColor: Color.white }} title={'click me'} onPress={() => console.log('cliked')} />
        <CustomButton disabled={true} btnstyle={{ width: 150, padding: 5 }} title={'click me'} onPress={() => console.log('cliked')} />
      </View>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({})